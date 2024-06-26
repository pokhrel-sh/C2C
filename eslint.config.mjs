import globals from "globals";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";


export default [
  {languageOptions: { globals: globals.browser }},
  { files: ["**/*.jsx"], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  ...fixupConfigRules(pluginReactConfig),
];