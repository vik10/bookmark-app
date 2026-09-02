import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, Drawer, IconButton, Typography } from "@mui/material";
import type { ReactNode } from "react";

type CommonDrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const CommonDrawer = ({
  open,
  onClose,
  title,
  children,
}: CommonDrawerProps) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: 420 },
            p: 3,
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h5" component="h2">
          {title}
        </Typography>

        <IconButton onClick={onClose} aria-label="Close drawer">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {children}
      </Box>
    </Drawer>
  );
};

export default CommonDrawer;
