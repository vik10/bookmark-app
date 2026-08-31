import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import "./Login.scss";
import { loginSchema, type LoginData } from "../../../../shared";
import { useLoginUserMutation } from "../../api/auth-api";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit = async (data: LoginData) => {
    try {
      await loginUser(data);
      navigate("/dashboard");
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Login failed",
      });
    }
  };

  return (
    <form
      className="login-container"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Typography variant="h2">Login Page</Typography>
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
      {errors.root?.message && (
        <Typography color="error">{errors.root.message}</Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        loading={isLoading}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
      <Typography variant="body1">
        Don't have an account? <a href="/signup">Sign Up</a>
      </Typography>
    </form>
  );
};

export default Login;
