#!/usr/bin/env -S npm run tsn -T

import GigaChat from 'gigachat';

const gigachat = new GigaChat();

async function main() {
  const runner = gigachat.beta.chat.completions
    .stream({
      model: 'GigaChat-Pro',
      messages: [{ role: 'user', content: 'Say this is a test' }],
    })
    .on('message', (msg) => console.log(msg))
    .on('content', (diff) => process.stdout.write(diff));

  for await (const chunk of runner) {
    console.log('chunk', chunk);
  }

  const result = await runner.finalChatCompletion();
  console.log(result);
}

main();
