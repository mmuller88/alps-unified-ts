const { TypeScriptProject } = require('projen');

const deps = [
  'editorconfig',
  'boxen',
  'chalk',
  'yamljs',
  'yargs@16.1.1',
];

const project = new TypeScriptProject({
  name: 'alps-unified-ts',
  authorAddress: 'damadden88@googlemail.com',
  authorName: 'Martin Mueller',
  defaultReleaseBranch: 'master',
  repository: 'https://github.com/mmuller88/alps-unified-ts.git',
  deps: deps,
  // peerDeps: deps,
  //bundledDeps: deps,
  python: {
    distName: 'alps-unified-ts',
    module: 'alps_unified_ts',
  },
  releaseBranches: ['master'],
  // releaseToNpm: true,
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
