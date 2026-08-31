import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSignupUserMutation } from "../../api/auth-api";
import { AppSnackbar } from "../../components";
import { signupSchema, type SignupData } from "../../../../shared";
import "./SignUp.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = useState(false);
  const [signupUser] = useSignupUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupData) => {
    try {
      await signupUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      setToastOpen(true);
      navigate("/login");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Signup failed";

      console.error("Signup failed:", error);
      alert(message);
    }
  };

  return (
    <form
      className="signup-container"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Typography variant="h2">Bookmark Web Sign Up</Typography>

      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("firstName")}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />

      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("lastName")}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>

      <Typography variant="body1">
        Already have an account? <a href="/login">Login</a>
      </Typography>

      <AppSnackbar
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message="Signup successful! Login now..."
        severity="success"
      />
    </form>
  );
};

export default SignUp;
