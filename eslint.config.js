import js from '@eslint/js'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import securityPlugin from "eslint-plugin-security";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from "eslint-plugin-import";


export default defineConfig([
  globalIgnores(["dist", "public/mockServiceWorker.js", "src/shared/api/**/*"]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      import: importPlugin,
      security: securityPlugin,
    },

    rules: {
      /**
       * important:
       * -  Align sort order with simple-import-sort (do not use with other import ordering rules)
       * - \u0000? is necessary to preserve the handling of side-effect imports (e.g., import "./x.css")
       *   + Reference: https://github.com/lydell/eslint-plugin-simple-import-sort?tab=readme-ov-file#custom-grouping
       */
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1) React
            ["^react$", "^react/"],

            // 2) Third-party (node_modules) excluding @/
            ["^(?!@/)"],

            // 3) Common (@/shared/...)
            ["^@/shared/"],

            // 4) Other domains (not common)
            ["^@/(?!shared/)"],

            // 5) Own domain (relative paths ./ ../) and side-effect imports
            ["^\\.", "^\u0000"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      "unused-imports/no-unused-imports": "error",

      // Move existing no-unused-vars to unused-imports side
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Optional: import-related hygiene (duplicates, etc.)
      "import/no-duplicates": "error",
      "import/first": "error",
      "import/newline-after-import": "error",

      // Security-related
      ...securityPlugin.configs.recommended.rules,

    }

  },
])
