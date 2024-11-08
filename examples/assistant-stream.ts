#!/usr/bin/env -S npm run tsn -T

import GigaChat from 'gigachat';

/**
 * Example of streaming a response from an assistant
 */

const gigachat = new GigaChat();

async function main() {
  const assistant = await gigachat.beta.assistants.create({
    model: 'gpt-4-1106-preview',
    name: 'Math Tutor',
    instructions: 'You are a personal math tutor. Write and run code to answer math questions.',
  });

  let assistantId = assistant.id;
  console.log('Created Assistant with Id: ' + assistantId);

  const thread = await gigachat.beta.threads.create({
    messages: [
      {
        role: 'user',
        content: '"I need to solve the equation `3x + 11 = 14`. Can you help me?"',
      },
    ],
  });

  let threadId = thread.id;
  console.log('Created thread with Id: ' + threadId);

  const run = gigachat.beta.threads.runs
    .stream(threadId, {
      assistant_id: assistantId,
    })
    //Subscribe to streaming events and log them
    .on('event', (event) => console.log(event))
    .on('textDelta', (delta, snapshot) => console.log(snapshot))
    .on('messageDelta', (delta, snapshot) => console.log(snapshot))
    .on('run', (run) => console.log(run))
    .on('connect', () => console.log());
  const result = await run.finalRun();
  console.log('Run Result' + result);
}

main();
