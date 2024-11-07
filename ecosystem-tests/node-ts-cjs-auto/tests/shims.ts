import * as shims from 'gigachat/_shims/index';
import * as fd from 'formdata-node';

test('gigachat/shims/node', () => {
  expect(shims.kind).toEqual('node');
  expect(shims.File).toBe(fd.File);
});
