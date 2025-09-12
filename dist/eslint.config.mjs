"use strict";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
        },
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            // run prettier as an ESLint rule
            "prettier/prettier": "error",
        },
    },
    tseslint.configs.recommended,
    prettier, // turn off ESLint rules that conflict with Prettier
]);
//# sourceMappingURL=eslint.config.mjs.map