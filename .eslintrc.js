module.exports = {
  extends: ["airbnb", "plugin:prettier/recommended"], // eslint扩展规则
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  parser: "babel-eslint", // 解决ES6 improt会报错
  env: {
    // eg如果不配置browser，window就会被eslint报undefined的错
    es6: true,
    browser: true,
    node: true,
  },
  plugins: ["react", "jsx-a11y", "import"],
  rules: {
    "class-methods-use-this": 0,
    "import/no-named-as-default": 0,
    "react/prop-types": 0,
    "no-shadow": 0,
    "react/jsx-no-duplicate-props": 0,
    "import/prefer-default-export": 0,
    "no-underscore-dangle": 0,
    "func-names": 0,
    "no-param-reassign": 0,
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx"],
      },
    ],
  },
};
