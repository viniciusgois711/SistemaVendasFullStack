module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./sistema-de-vendas/tsconfig.app.json", "./sistema-de-vendas/tsconfig.spec.json"],
    tsconfigRootDir: __dirname
  },
  plugins: ["@typescript-eslint", "deprecation", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",

    "airbnb-base",
  ],
  rules: {
    "deprecation/deprecation": "error",

    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "prefer-const": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
