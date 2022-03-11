import TextField from "@material-ui/core/TextField";
import React, { FC, forwardRef } from "react";

export type InputProps = {
  type: string;
  label: string;
  placeholder?: string;
  error: boolean;
  helperText: string | undefined;
};

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, type, placeholder, helperText, error, ...props }: InputProps,
    ref
  ) => {
    return (
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        inputRef={ref}
        type={type}
        label={label}
        helperText={helperText}
        placeholder={placeholder}
        error={error}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
