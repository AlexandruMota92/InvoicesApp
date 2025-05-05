import { TextField, TextFieldProps } from "@mui/material";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

const CustomInput = (
  props: TextFieldProps & {
    control: Control<any, any, any>;
    errors?: FieldErrors<any>;
    rules?: Omit<
      RegisterOptions<FieldValues, string>,
      "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
    >;
  }
) => {
  return (
    <Controller
      rules={props.rules}
      name={props.name || ""}
      control={props.control}
      render={({ field }) => (
        <TextField
          {...props}
          {...field}
          error={!!props.errors?.[props.name || ""]}
          helperText={
            props.errors?.[props.name || ""]?.type === "required"
              ? "Field is required."
              : " "
          }
        />
      )}
    />
  );
};

export default CustomInput;
