import { unified } from '../src';

test('unified', () => {
  expect(unified(undefined)).toBe(undefined);
});