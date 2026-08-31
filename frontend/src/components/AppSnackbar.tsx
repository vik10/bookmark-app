import { Alert, Snackbar } from "@mui/material";

type AppSnackbarProps = {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  autoHideDuration?: number;
};

const AppSnackbar = ({
  open,
  onClose,
  message,
  severity = "success",
  autoHideDuration = 4000,
}: AppSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
