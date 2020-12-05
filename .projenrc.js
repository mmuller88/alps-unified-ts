const { JsiiProject } = require('projen');

const deps = [
  'js-yaml',
];

const project = new JsiiProject({
  name: 'alps-unified-ts',
  authorAddress: 'damadden88@googlemail.com',
  authorName: 'Martin Mueller',
  defaultReleaseBranch: 'master',
  repository: 'https://github.com/mmuller88/alps-unified-ts.git',
  deps: deps,
  bundledDeps: deps,
  // java: {
  //   javaPackage: 'com.github.mmuller88.alpsUnifiedTs',
  //   mavenGroupId: 'com.github.mmuller88',
  //   mavenArtifactId: 'alps-unified-ts',
  // },
  dotnet: {
    // dotNetNamespace: 'Acme.HelloNamespace',
    // packageId: 'Acme.HelloPackage',
    dotNetNamespace: 'com.github.mmuller88',
    packageId: 'com.github.mmuller88.AlpsUnifiedTs',
  },
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
