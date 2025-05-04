import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearToken, setToken } from "../../store/tokenSlice";
import { LoginFormData, loginSchema } from "../../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      if (!response.ok) {
        throw await response.json();
      }

      return response.json();
    },
    onSuccess: (response) => {
      const token = response.access_token;
      dispatch(setToken(token));
      setTimeout(() => {
        dispatch(clearToken(token));
        navigate("/");
      }, 3600000); // temporary solution to no logout situation. Token expiration will be handled handled by a status code provided by the backend
      navigate("/invoices");
    },
    onError: () => {
      toast.error("Login failed, credentials might be invalid!");
    },
  });

  const handleLogin = (data: LoginFormData) => {
    login.mutate(data);
  };

  return (
    <>
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleLogin)}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              placeholder="••••••"
              type="password"
              id="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            Sign in
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default Auth;
