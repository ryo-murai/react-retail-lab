import { defineConfig } from "orval";

export default defineConfig({
  eCommerceBackend: {
    input: {
      target: "docs/openapi.yaml",
    },
    output: {
      mode: "tags-split",
      target: "src/shared/api/server-api.ts",
      schemas: "src/shared/api/model",
      client: "react-query",
      httpClient: "fetch",
      override: {
        fetch: {
          forceSuccessResponse: true,
        },
      },
      mock: false,
      prettier: true,
    },
  },
});
