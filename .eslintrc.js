module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./sistema-de-vendas/tsconfig.app.json", "./sistema-de-vendas/tsconfig.spec.json"],
    tsconfigRootDir: __dirname
  },
  plugins: ["@typescript-eslint", "deprecation"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    // ⚠️ Detectar código depreciado
    "deprecation/deprecation": "error",

    // 🚫 Desativar outras regras "chatas"
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "prefer-const": "off"
  }
};
