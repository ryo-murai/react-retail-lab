import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";
import { ErrorAlert } from "../../widgets/ErrorAlert";
import { fallbackMessage } from "@/shared/errors/lib/fallback-error-info";

const toHomeLabel = "Back to Home";

export default function AppErrorPage({ message = fallbackMessage }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        paddingBlock: 4,
        gap: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        ERROR
      </Typography>
      <ErrorAlert error={message} />

      <Button variant="outlined" color="primary" component={Link} to="/">
        {toHomeLabel}
      </Button>
    </Box>
  );
}
