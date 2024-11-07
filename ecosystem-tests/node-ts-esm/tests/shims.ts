// shouldn't need extension, but Jest's ESM module resolution is broken
import 'gigachat/shims/node.mjs';
import * as shims from 'gigachat/_shims/index';

test('gigachat/shims/node', () => {
  expect(shims.kind).toEqual('node');
});
