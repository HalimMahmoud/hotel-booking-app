import { TextField } from "@mui/material";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface CustomTextFieldProps {
  label?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  value?: string;
  disabled?: boolean;
}

export default function CustomTextField({
  label = "Field",
  register,
  value,
  error,
  disabled,
}: CustomTextFieldProps) {
  return (
    <TextField
      {...register}
      type="text"
      label={label}
      variant="standard"
      fullWidth
      margin="normal"
      error={Boolean(error)}
      helperText={error?.message}
      value={value}
      disabled={disabled}
    />
  );
}
