import SyncIcon from "@mui/icons-material/Sync";
import { Alert, AlertTitle } from "@mui/material";

import type { ErrorInfo } from "@/shared/errors/model/error-info.type";

export type ErrorAlertProps = {
  error: ErrorInfo;
  retry?: () => void;
};

export function ErrorAlert({ error, retry }: ErrorAlertProps) {
  return (
    <Alert severity="error">
      <AlertTitle>{error.title}</AlertTitle>
      {error.detail}
      {retry && (
        <SyncIcon
          onClick={retry}
          fontSize="small"
          style={{ cursor: "pointer", marginLeft: "8px" }}
          titleAccess="Retry"
        />
      )}
    </Alert>
  );
}
