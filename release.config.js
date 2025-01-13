module.exports = {
  branches: ['main', 'semantic-release'], // Specify the branch to release from
  repositoryUrl: 'https://github.com/lukonik/ng-verse', // Replace with your repo URL
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'projects/ng-verse', // Path to the project's package.json
      },
    ],
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
          'npm run build --project=ng-verse && cd projects/ng-verse && npm pack',
      },
    ],
  ],
};
