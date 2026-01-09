import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";

export default function NotFoundPage({ message }: { message?: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">
        {message || "The page you are looking for does not exist."}
      </Typography>
      <Button variant="outlined">
        <Link to="/">Back to Home</Link>
      </Button>
    </Box>
  );
}
