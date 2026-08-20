import { Button, TextField, Typography } from "@mui/material";
import "./Login.scss";

const Login = () => {
  return (
    <div className="login-container">
      <Typography variant="h2">Login Page</Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
      />
      <Button variant="contained" color="primary">
        Login
      </Button>
      <Typography variant="body1">
        Don't have an account? <a href="/signup">Sign Up</a>
      </Typography>
    </div>
  );
};

export default Login;
