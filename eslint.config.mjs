import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

export default defineConfig([
  ...nextVitals,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "node_modules/**",
      "next-env.d.ts",
      "*.config.js",
      "*.config.mjs",
    ],
  },
  {
    files: ["src/__tests__/**/*.{ts,tsx}", "e2e/**/*.ts"],
    rules: {
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["**/*.tsx"],
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "no-unused-vars": "off",
      "no-unused-private-class-members": "warn",
      "no-unreachable": "warn",
      "no-unused-expressions": "warn",
      eqeqeq: ["error", "always"],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
    },
  },
]);
