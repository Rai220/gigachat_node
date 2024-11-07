// shouldn't need extension, but Jest's ESM module resolution is broken
import 'gigachat/shims/web.mjs';
import * as shims from 'gigachat/_shims/index';

function typeTests(x: shims.Request) {
  const url: string = x.url;
}

test('gigachat/shims/node', () => {
  expect(shims.kind).toEqual('web');
  expect(shims.File).toEqual(File);
});
