const GigaChat = require('gigachat');

const gigachat = new GigaChat();

function assertEqual(actual, expected) {
  if (actual === expected) {
    return;
  }

  console.error('expected', expected);
  console.error('actual  ', actual);
  throw new Error('expected values to be equal');
}

async function main() {
  const completion = await gigachat.chat.completions.create({
    model: 'GigaChat-Pro',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });
  if (!completion.choices[0].message.content) {
    console.dir(completion, { depth: 4 });
    throw new Error('no response content!');
  }

  assertEqual(
    decodeURIComponent(gigachat.stringifyQuery({ foo: { nested: { a: true, b: 'foo' } } })),
    'foo[nested][a]=true&foo[nested][b]=foo',
  );
  assertEqual(
    decodeURIComponent(gigachat.stringifyQuery({ foo: { nested: { a: ['hello', 'world'] } } })),
    'foo[nested][a][]=hello&foo[nested][a][]=world',
  );
}

main();
