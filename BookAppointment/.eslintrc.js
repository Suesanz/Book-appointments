module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-native"
  ],
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  },
  globals: {
    __DEV__: false,
    jasmine: false,
    beforeAll: false,
    afterAll: false,
    beforeEach: false,
    afterEach: false,
    test: false,
    expect: false,
    describe: false,
    jest: false,
    it: false
  },
  rules: {
    "comma-dangle": 0,
    "brace-style": 0,
    "generator-star-spacing": 0,
    "no-undef": 0,
    "no-unused-vars": "warn",
    "no-empty": 0,
    "curly": 0,
    "semi": "error",
    "no-extra-semi": "error",
    "require-yield": 0,
    "quotes": 0,
    "quote-props": 0,
    "padded-blocks": 0,
    "func-call-spacing": 0,
    "dot-notation": 0,
    "no-unexpected-multiline": 0,
    "react/no-unescaped-entities": 0,
    "react/prop-types": 0,
    "react-native/no-raw-text": 0,
    "react-hooks/exhaustive-deps": 0,
    "react/display-name": 0,
    "react-native/no-inline-styles": 0,
    "react-native/sort-styles": 0,
    "space-before-function-paren": 0,
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/indent": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/member-delimiter-style": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-object-literal-type-assertion": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-empty-function": 0,
  }
}
