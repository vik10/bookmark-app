import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { api } from "../api/api";
import { useLogoutUserMutation } from "../api/auth-api";
import { useAuth } from "../hooks/use-auth";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const { userName } = useAuth();

  const handleLogout = async () => {
    await logoutUser(undefined);
    dispatch(api.util.resetApiState());
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          My BookMark
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {userName && (
            <Typography variant="body2" sx={{ color: "white" }}>
              {userName}
            </Typography>
          )}

          <Button
            color="inherit"
            onClick={handleLogout}
            variant="outlined"
            sx={{ borderColor: "white" }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
