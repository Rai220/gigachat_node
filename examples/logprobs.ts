#!/usr/bin/env -S npm run tsn -T

import GigaChat from 'gigachat';

// gets API Key from environment variable OPENAI_API_KEY
const gigachat = new GigaChat();

async function main() {
  const stream = await gigachat.beta.chat.completions
    .stream({
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'Say this is a test' }],
      stream: true,
      logprobs: true,
    })
    .on('logprobs.content.delta', (logprob) => {
      console.log(logprob);
    });

  console.dir(await stream.finalChatCompletion(), { depth: null });
}

main();
