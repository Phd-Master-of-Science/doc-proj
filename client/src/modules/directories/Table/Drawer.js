import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

export const Drawer = ({ resTime, toggleDrawer }) => {
  return (
    <Box
      role="presentation"
      onClick={toggleDrawer("bottom", false)}
      onKeyDown={toggleDrawer("bottom", false)}
    >
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        <p>
          The response time is <strong>{resTime} ms</strong>
        </p>
      </Alert>
    </Box>
  );
};
