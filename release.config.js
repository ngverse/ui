module.exports = {
  branches: ['main'], // Specify the branch to release from
  repositoryUrl: 'https://github.com/lukonik/ng-verse', // Replace with your repo URL
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/exec',
      {
        prepareCmd:
          'ng build --project=ng-verse && cd projects/ng-verse && npm run build && npm pack',
      },
    ],
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'dist/ng-verse',
      },
    ],
    '@semantic-release/git',
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'projects/ng-verse/dist/*.tgz', label: 'NPM Package' },
        ],
      },
    ],
  ],
};
