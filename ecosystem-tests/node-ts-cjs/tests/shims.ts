import 'gigachat/shims/node';
import * as shims from 'gigachat/_shims/index';
import * as fd from 'formdata-node';

function typeTests(x: shims.Request) {
  const url: string = x.url;
}

test('gigachat/shims/node', () => {
  expect(shims.kind).toEqual('node');
  expect(shims.File).toBe(fd.File);
});
