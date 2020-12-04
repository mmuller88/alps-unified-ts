import { Alps } from '../src';

test('unified alps empty', () => {
  expect(() => {
    Alps.unified(JSON.parse('{}'));
  }).toThrowError();
});

test('unified alps ok', () => {
  expect(Alps.unified(Alps.loadYaml('test/todo-alps.yaml'))).toContain('Simple Todo list example');
});