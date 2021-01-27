module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // permite o uso de jsx em arquivos .js
    'react/react-in-jsx-scope': 'off', // desabilita a necessidade de importar o react em arquivos com jsx
    'react/jsx-props-no-spreading': 'off', // desabilita erro ao utilizar o spread operator
    'react/prop-types': 'off',
  },
};
