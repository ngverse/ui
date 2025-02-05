module.exports = {
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
        'schematics',
        'icon',
        'badge',
        'checkbox',
        'card',
        'skeleton',
        'divider',
        'loader',
        'progress-bar',
        'switch',
        'input',
        'textarea',
        'radio-button',
        'tooltip',
        'alert',
        'dialog',
        'select',
        'accordion',
        'toast',
        'form-field',
        'context-menu',
        'otp-input',
        'listbox',
        'drawer',
        'roving-listbox',
        'desc-listbox',
        'local-storage',
        'session-storage',
      ],
    ],
  },
};
