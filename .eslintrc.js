module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: ['airbnb', 'prettier'],
  rules: {
    'linebreak-style': 0,
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'default-param-last': 'off',
    'arrow-body-style': 'off',
    'react/function-component-definition': 'off',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'off',
    camelcase: 'off',
    'prefer-const': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'no-restricted-globals': 'warn',
    'prefer-template': 'warn',
    'react/self-closing-comp': 'warn',
    'no-param-reassign': 'warn',
  },
  parserOptions: {
    exmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
