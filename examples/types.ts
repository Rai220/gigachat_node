#!/usr/bin/env -S npm run tsn -T

import GigaChat from 'gigachat';

// gets API Key from environment variable OPENAI_API_KEY
const gigachat = new GigaChat();

async function main() {
  // Explicit non streaming params type:
  const params: GigaChat.Chat.CompletionCreateParams = {
    model: 'GigaChat-Pro',
    messages: [{ role: 'user', content: 'Say this is a test!' }],
  };
  const completion = await gigachat.chat.completions.create(params);
  console.log(completion.choices[0]?.message?.content);

  // Explicit streaming params type:
  const streaming_params: GigaChat.Chat.CompletionCreateParams = {
    model: 'GigaChat-Pro',
    messages: [{ role: 'user', content: 'Say this is a test!' }],
    stream: true,
  };

  const stream = await gigachat.chat.completions.create(streaming_params);
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n');
}

main();
