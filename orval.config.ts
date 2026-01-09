import { defineConfig } from "orval";
import { faker } from "@faker-js/faker";

export default defineConfig({
  reactRetailLabBackend: {
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
        mutator: {
          path: "src/shared/webclient/lib/custom-fetch.ts",
          name: "customFetch",
        },
        mock: {
          properties: {
            "/name/": () =>
              `${faker.commerce.productName()}`,
            "/imageUrl/": () =>
              faker.image.url({ width: 250, height: 250 }),
            "/description/": () =>
              faker.commerce.productDescription(),
            "/category/": () =>
              faker.commerce.department(),
            "/price/": () =>
              parseFloat(faker.commerce.price({ min: 1, max: 1000 })),
          },
        },
      },
      mock: {
        type: "msw",
        indexMockFiles: true,
        useExamples: true,
        locale: "en",
      },
      prettier: true,
    },
  },
});
