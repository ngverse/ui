module.exports = {
  branches: ['main'],
  repositoryUrl: 'https://github.com/lukonik/ngverse',
  preset: 'conventionalcommits',
  releaseRules: [{ type: 'refactor', release: 'patch' }],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'dist/ngverse',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['projects/ngverse/package.json'],
        message: 'chore(release): update package.json [skip ci]',
      },
    ],
    ['@semantic-release/github'],
  ],
};
