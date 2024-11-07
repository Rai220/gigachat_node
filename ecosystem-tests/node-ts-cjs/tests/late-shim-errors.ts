export {};

test('throws if shims are imported after gigachat', async () => {
  await import('gigachat');
  await expect(() => import('gigachat/shims/web')).rejects.toThrow(
    `you must \`import 'gigachat/shims/web'\` before importing anything else from gigachat`,
  );
});
