import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import Home from "@mui/icons-material/Home";

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton component={Link} to="/home" size="large" edge="start" color="inherit" aria-label="logo">
          <Home />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Documents Collection App
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/documents" color="inherit">
            Documents
          </Button>
          <Button component={Link} to="/directories" color="inherit">Directories</Button>
          <Button component={Link} to="/users" color="inherit">Users</Button>
          <Button component={Link} to="/files" color="inherit">Files</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
