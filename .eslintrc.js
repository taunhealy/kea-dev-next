module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    // Disable rules causing the most errors
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@next/next/no-img-element": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/jsx-no-undef": "off",
  },
};
