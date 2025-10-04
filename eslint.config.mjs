import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next", "next/typescript", "prettier"),
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "next-env.d.ts",
        ],
        "rules": {
            "no-restricted-imports": [
                "error",
                {
                    "patterns": [{ "regex": "^@mui/[^/]+$" }]
                }
            ]
        }
    },
];

export default eslintConfig;
