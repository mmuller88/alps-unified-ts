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
  // projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  java: {
    javaPackage: 'com.github.mmuller88.alpsUnifiedTs',
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

project.github.addMergifyRules({
  name: 'Label core contributions',
  actions: {
    label: {
      add: ['contribution/core'],
    },
  },
  conditions: [
    'author~=^(mmuller88)$',
    'label!=contribution/core',
  ],
});

project.github.addMergifyRules({
  name: 'Label auto-merge for core',
  actions: {
    label: {
      add: ['auto-merge'],
    },
  },
  conditions: [
    'label=contribution/core',
    'label!=auto-merge',
  ],
});

project.synth();
