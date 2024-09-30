/** @type {import("eslint").Linter.Config} */
const config = {
  
    "extends": "next",
    "rules": {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off"
    }
  
}
module.exports = config;