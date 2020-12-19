const { JsiiProject } = require('projen');

const deps = [
  'js-yaml',
];

const project = new JsiiProject({
  name: 'alps-unified-ts',
  authorAddress: 'damadden88@googlemail.com',
  authorName: 'Martin Mueller',
  repository: 'https://github.com/mmuller88/alps-unified-ts.git',
  deps: deps,
  // devDeps: [
  //   'jsii-release',
  // ],
  bundledDeps: deps,
  java: {
    javaPackage: 'a.c',
    mavenGroupId: 'b',
    mavenArtifactId: 'd',
  },
  // dotnet: {
  //   dotNetNamespace: 'com.github.mmuller88',
  //   packageId: 'com.github.mmuller88.AlpsUnifiedTs',
  // },
  python: {
    distName: 'alps-unified-ts',
    module: 'alps_unified_ts',
  },
  // releaseBranches: ['master'],
  keywords: [
    'alps',
    'oas',
    'openapi',
    'graphql',
    'mqtt',
    'soap',
  ],

});

project.synth();
