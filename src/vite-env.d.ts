/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_LOGLEVEL:
    | "trace"
    | "debug"
    | "info"
    | "warn"
    | "error"
    | "silent";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
