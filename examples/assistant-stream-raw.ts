#!/usr/bin/env -S npm run tsn -T

import GigaChat from 'gigachat';

const gigachat = new GigaChat();

async function main() {
  const assistant = await gigachat.beta.assistants.create({
    model: 'gpt-4-1106-preview',
    name: 'Math Tutor',
    instructions: 'You are a personal math tutor. Write and run code to answer math questions.',
  });

  const thread = await gigachat.beta.threads.create({
    messages: [
      {
        role: 'user',
        content: '"I need to solve the equation `3x + 11 = 14`. Can you help me?"',
      },
    ],
  });

  const stream = await gigachat.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    additional_instructions: 'Please address the user as Jane Doe. The user has a premium account.',
    stream: true,
  });

  for await (const event of stream) {
    if (event.event === 'thread.message.delta') {
      const chunk = event.data.delta.content?.[0];
      if (chunk && 'text' in chunk && chunk.text.value) {
        process.stdout.write(chunk.text.value);
      }
    }
  }

  console.log();
}

main();
