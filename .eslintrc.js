module.exports = {
  extends: ['next', 'prettier', 'next/core-web-vitals'],
  rules: {
    semi: 'error',
    'import/prefer-default-export': 'off',
    'newline-before-return': 'error',
    'no-console': 'warn',
    'no-var': 'error',
  },
};
