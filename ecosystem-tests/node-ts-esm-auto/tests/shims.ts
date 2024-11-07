import * as shims from 'gigachat/_shims/index';

test('gigachat/shims/node', () => {
  expect(shims.kind).toEqual('node');
});
