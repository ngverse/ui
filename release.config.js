module.exports = {
  branches: ['main'],
  repositoryUrl: 'https://github.com/lukonik/ng-verse',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'projects/ng-verse',
      },
    ],
    '@semantic-release/git',
    ['@semantic-release/github'],
  ],
};
