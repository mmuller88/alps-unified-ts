const { JsiiProject } = require('projen');

const devDeps = [
  'js-yaml',
];

const project = new JsiiProject({
  name: 'alps-unified-ts',
  authorAddress: 'damadden88@googlemail.com',
  authorName: 'Martin Mueller',
  defaultReleaseBranch: 'master',
  repository: 'https://github.com/mmuller88/alps-unified-ts.git',
  devDeps: devDeps,
  python: {
    distName: 'alps-unified-ts',
    module: 'alps_unified_ts',
  },
  releaseBranches: ['master'],
  keywords: [
    'cdk',
    'aws',
    'alps',
    'oas',
    'openapi',
    'graphql',
    'mqtt',
    'soap',
  ],

});

project.synth();
