/**
 * @jest-environment jsdom
 */

export {};

it(`throws when fetch API types are missing`, async () => {
  await expect(() => import('gigachat')).rejects.toThrow(
    'this environment is missing the following Web Fetch API type',
  );
});
