import globals from "globals";
import tseslint from "typescript-eslint";
import { commonEslintConfig } from "../eslint.config.js";
import { restApiRules } from "../eslint-rest-api-rules.js";

export default tseslint.config(
  {
    ignores: ["dist/**"],
  },
  ...commonEslintConfig,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      globals: globals.nodeBuiltin,
    },
    plugins: {
      rest: {
        rules: restApiRules,
      },
    },
    rules: {
      "rest/route-resource-naming": "error",
      "rest/query-parameter-names": "error",
      "rest/identifier-naming": "error",
      "rest/file-naming": "error",
    },
  },
);
