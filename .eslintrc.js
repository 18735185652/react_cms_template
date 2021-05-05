module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    semi: 'error',
    'no-console': 'off',
    'linebreak-style': 'off',
    'eol-last': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'no-shadow': 'off',
    'react/jsx-no-duplicate-props': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    // "indent":["error",2]
  },
  env: {
    browser: true,
    node: true,
  },
};