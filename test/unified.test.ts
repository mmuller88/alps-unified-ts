import { Alps } from '../src';

test('unified alps empty', () => {
  expect(() => {
    Alps.unified(JSON.parse('{}'));
  }).toThrowError();
});

test('unified alps from yaml file', () => {
  expect(Alps.unified(Alps.loadYaml('test/todo-alps.yaml'))).toContain('Simple Todo list example');
});

test('unified alps from spec', () => {
  expect(Alps.unified(Alps.spec({
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
  }))).toContain('Simple Todo list example');
});