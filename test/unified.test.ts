import { Alps } from '../src';

test('unified alps empty', () => {
  expect(() => {
    Alps.unified(JSON.parse('{}'));
  }).toThrowError();
});

test('unified alps ok', () => {
  expect(Alps.unified(loadYaml('test/todo-alps.yaml'))).toContain('Simple Todo list example');
});

function loadYaml(path: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require('fs');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const yaml = require('js-yaml');

  try {
    let fileContents = fs.readFileSync(path, 'utf8');
    let data = yaml.safeLoad(fileContents);
    console.log(JSON.stringify(data));
    return data;
  } catch (e) {
    console.log(e);
  }
}