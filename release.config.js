module.exports = {
  branches: ['main'], // Specify the branch to release from
  repositoryUrl: 'https://github.com/lukonik/ng-verse', // Replace with your repo URL
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'projects/ng-verse', // Path to the project's package.json
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
    [
      '@semantic-release/exec',
      {
        prepareCmd:
          'ng build --project=ng-verse && cd projects/ng-verse && npm run build && npm pack',
      },
    ],
  ],
};
