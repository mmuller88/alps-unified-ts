const { AwsCdkConstructLibrary } = require('projen');

const deps = [
  'js-yaml',
];

const project = new AwsCdkConstructLibrary({
  cdkVersion: '1.79.0',
  name: 'alps-unified-ts',
  authorAddress: 'damadden88@googlemail.com',
  authorName: 'Martin Mueller',
  repository: 'https://github.com/mmuller88/alps-unified-ts.git',
  deps: deps,
  // devDeps: [
  //   'jsii-release',
  // ],
  bundledDeps: deps,
  // peerDependencyOptions: {
  //   pinnedDevDependency: false,
  // },
  java: {
    javaPackage: 'com.github.mmuller88.alps',
    mavenGroupId: 'com.github.mmuller88',
    mavenArtifactId: 'alps-unified-ts',
  },
  dotnet: {
    dotNetNamespace: 'com.github.mmuller88',
    packageId: 'com.github.mmuller88.AlpsUnifiedTs',
  },
  python: {
    distName: 'alps-unified-ts',
    module: 'alps_unified_ts',
  },
  releaseBranches: ['master'],
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
