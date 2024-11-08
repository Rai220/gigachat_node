#!/usr/bin/env -S npm run tsn -T

/**
 * Fine-tuning allows you to train models on your own data.
 *
 * See this guide for more information:
 * - https://platform.gigachat.com/docs/guides/fine-tuning
 */

import fs from 'fs';
import GigaChat from 'gigachat';
import { FineTuningJobEvent } from 'gigachat/resources/fine-tuning';

// Gets the API Key from the environment variable `OPENAI_API_KEY`
const client = new GigaChat();

async function main() {
  console.log(`Uploading file`);

  let file = await client.files.create({
    file: fs.createReadStream('./examples/fine-tuning-data.jsonl'),
    purpose: 'fine-tune',
  });
  console.log(`Uploaded file with ID: ${file.id}`);

  console.log('-----');

  console.log(`Waiting for file to be processed`);
  while (true) {
    file = await client.files.retrieve(file.id);
    console.log(`File status: ${file.status}`);

    if (file.status === 'processed') {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log('-----');

  console.log(`Starting fine-tuning`);
  let fineTune = await client.fineTuning.jobs.create({ model: 'GigaChat-Pro', training_file: file.id });
  console.log(`Fine-tuning ID: ${fineTune.id}`);

  console.log('-----');

  console.log(`Track fine-tuning progress:`);

  const events: Record<string, FineTuningJobEvent> = {};

  while (fineTune.status == 'running' || fineTune.status == 'queued') {
    fineTune = await client.fineTuning.jobs.retrieve(fineTune.id);
    console.log(`${fineTune.status}`);

    const { data } = await client.fineTuning.jobs.listEvents(fineTune.id, { limit: 100 });
    for (const event of data.reverse()) {
      if (event.id in events) continue;
      events[event.id] = event;
      const timestamp = new Date(event.created_at * 1000);
      console.log(`- ${timestamp.toLocaleTimeString()}: ${event.message}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
