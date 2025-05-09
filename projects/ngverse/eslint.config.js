// @ts-check
const tseslint = require('typescript-eslint');
const rootConfig = require('../../eslint.config.js');

module.exports = tseslint.config(
  ...rootConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/prefer-on-push-component-change-detection': ['error'],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '**/dist/**',
            '../../dist/**',
            '../popover/**',
            '../font-icon',
            '../../font-icon',
            '../button',
            '../../button',
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: {},
  }
);
