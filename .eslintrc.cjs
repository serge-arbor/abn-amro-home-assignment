/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  plugins: ['simple-import-sort', 'tailwindcss', '@tanstack/eslint-plugin-query', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // ESLint rules
    'no-undef': 'off', // for auto-imports to work
    'no-useless-concat': 'warn',
    'object-shorthand': 'warn',
    // "quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
    'prefer-destructuring': ['warn', { array: false, object: true }],
    'prefer-template': 'warn',
    'require-await': 'warn',
    'spaced-comment': ['warn', 'always', { markers: ['/'] }],
    eqeqeq: ['error', 'smart'],

    // Simple import sort rules
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',

    // Tailwind rules
    'tailwindcss/classnames-order': 'off', // to avoid conflicts with Prettier
    'tailwindcss/no-custom-classname': 'off',

    // Typescript rules
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    // Vue rules
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts'
        },
        style: {
          lang: 'postcss'
        },
        template: {
          lang: 'html'
        }
      }
    ],
    'vue/component-api-style': 'error',
    'vue/component-name-in-template-casing': [
      'warn',
      'PascalCase',
      { registeredComponentsOnly: false, ignores: ['component', 'ge-autocomplete'] }
    ],
    'vue/component-tags-order': [
      'warn',
      {
        order: [
          'script:not([setup])',
          'script[setup]',
          'template',
          'style[scoped]',
          'style:not([scoped])'
        ]
      }
    ],
    'vue/custom-event-name-casing': 'error',
    'vue/define-emits-declaration': 'error',
    'vue/define-macros-order': 'warn',
    'vue/define-props-declaration': 'error',
    'vue/match-component-file-name': ['error', { extensions: ['vue'], shouldMatchCase: true }],
    'vue/next-tick-style': 'warn',
    'vue/no-multiple-objects-in-class': 'warn',
    'vue/no-required-prop-with-default': 'warn',
    'vue/no-undef-components': 'off',
    'vue/no-unused-refs': 'warn',
    'vue/no-useless-mustaches': 'warn',
    'vue/no-useless-v-bind': 'warn',
    'vue/padding-line-between-blocks': 'warn',
    'vue/prefer-separate-static-class': 'warn',
    'vue/prefer-true-attribute-shorthand': 'warn',
    'vue/require-default-prop': 'off',
    'vue/v-for-delimiter-style': 'warn'
  }
}
