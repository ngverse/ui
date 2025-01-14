export default {
  extends: ['@commitlint/config-angular'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'button',
        'popover',
        'select',
        'theme',
        'tab',
        'progress-bar',
        'progress-spinner',
      ],
    ],
  },
};
