import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useLogoutUserMutation } from "../api/auth-api";

const Header = () => {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    await logoutUser(undefined);
    navigate("/login");
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        {/* App Name on the left */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          My BookMark
        </Typography>

        {/* Logout button on the right */}
        <Button
          color="inherit"
          onClick={handleLogout}
          variant="outlined"
          sx={{ borderColor: "white" }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
