module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  plugins: [
    'vue'
  ],
  overrides: [
    {
      files: [
        '**/*.spec.js',
        '**/*.test.js'
      ],
      env: {
        jest: true
      }
    }
  ],
  rules: {}
}
