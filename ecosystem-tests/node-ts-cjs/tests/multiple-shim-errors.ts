export {};

test('throws if multiple shims are imported', async () => {
  await import('gigachat/shims/node');
  await expect(() => import('gigachat/shims/web')).rejects.toThrow(
    `can't \`import 'gigachat/shims/web'\` after \`import 'gigachat/shims/node'\``,
  );
});
