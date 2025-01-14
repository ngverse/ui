module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['button', 'popover', 'select', 'theme', 'tab'],
    ],
  },
};
