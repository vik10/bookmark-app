import globals from "globals";
import tseslint from "typescript-eslint";
import { commonEslintConfig } from "../eslint.config.js";

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
  },
);
