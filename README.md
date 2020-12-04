[![NPM version](https://badge.fury.io/js/alps-unified-ts.svg)](https://badge.fury.io/js/alps-unified-ts)
[![PyPI version](https://badge.fury.io/py/alps-unified-ts.svg)](https://badge.fury.io/py/alps-unified-ts)
[![Maven version](https://maven-badges.herokuapp.com/maven-central/com.github.mmuller88.alpsUnifiedTs/alps-unified-ts/badge.svg)](https://maven-badges.herokuapp.com/maven-central/com.github.mmuller88.alpsUnifiedTs/alps-unified-ts)
![Release](https://github.com/mmuller88/alps-unified-ts/workflows/Release/badge.svg)

# alps-unified-ts

That is an enhanced TypeScript library of [alps-unified](https://github.com/mamund/alps-unified). With it you can convert an ALPS API spec to other API spec like openApi, Graph QL Schema.

Very useful to understand the idea of ALPS API is this video on YT: https://www.youtube.com/watch?v=oG6-r3UdenE

Want to know more about ALPS? --> please visit:

- http://alps.io/
- https://github.com/alps-io/
- https://github.com/mamund/alps-unified

# Features

- generating als unified libraries for JavaScript, TypeScript, Python and Java
- releasing to NPM, Pypi and Maven Central (see top of Readme)
- Type support for ALPS specs (see example 'Create from Spec' down below)

# Examples

## Load from YAML file

You can load the ALPS spec directly from a YAML file. JSON ist atm not supported.

### Convert to OpenApi

```ts
Alps.unified(Alps.loadYaml('test/todo-alps.yaml'), {
  formatType: FormatType.OPENAPI,
});
```

### Convert to GraphQL Schema

```ts
Alps.unified(Alps.loadYaml('test/todo-alps.yaml'), {
  formatType: FormatType.SDL,
});
```

## Create from Spec

Creating the API specification from the spec is very powerful. As it gives you much support in an idea like VS as it is typed and documented. So you alway produce valid API specs.

```ts
Alps.unified(
  Alps.spec({
    alps: {
      version: '1.0',
      doc: {
        value: 'Simple Todo list example',
      },
      ext: [
        {
          type: 'metadata',
          name: 'title',
          value: 'simpleTodo',
          tags: 'oas',
        },
        {
          type: 'metadata',
          name: 'root',
          value: 'http://api.example.org/todo',
          tags: 'oas',
        },
      ],
      descriptor: [
        {
          id: 'id',
          type: 'semantic',
          text: 'storage id of todo item',
        },
      ],
    },
  }),
);
```

# Thanks to

- The AWS CDK Community for the repo tool [projen](https://github.com/projen/projen) which I use for this repo.
