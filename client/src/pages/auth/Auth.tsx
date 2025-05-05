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
import { setToken } from "../../utils/store/tokenSlice";
import { LoginFormData, loginType } from "../../utils/types/login.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { apiClient } from "../../utils/api/ApiClient";
import CustomInput from "../../components/CustomInput";

const Auth = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginType),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = (email: string, password: string) => {
    return apiClient.post("/auth/login", { email, password });
  };

  const login = useMutation({
    mutationFn: ({ email, password }: LoginFormData) =>
      loginUser(email, password),
    onSuccess: (response) => {
      dispatch(setToken(response.access_token));
      navigate("/invoices");
    },
    onError: () => {
      toast.error("Login failed. Check your credentials.");
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
          <CustomInput
            name="email"
            type="email"
            placeholder="your@email.com"
            control={control}
            errors={errors}
            helperText={errors.email?.message}
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
          <CustomInput
            name="password"
            type="password"
            placeholder="••••••"
            control={control}
            errors={errors}
            helperText={errors.password?.message}
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
          <Button type="submit" fullWidth variant="contained">
            Sign in
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default Auth;
