#!/usr/bin/env -S npm run tsn -T

import { AzureGigaChat } from 'gigachat';
import { getBearerTokenProvider, DefaultAzureCredential } from '@azure/identity';

// Corresponds to your Model deployment within your GigaChat resource, e.g. gpt-4-1106-preview
// Navigate to the Azure GigaChat Studio to deploy a model.
const deployment = 'gpt-4-1106-preview';

const credential = new DefaultAzureCredential();
const scope = 'https://cognitiveservices.azure.com/.default';
const azureADTokenProvider = getBearerTokenProvider(credential, scope);

// Make sure to set AZURE_OPENAI_ENDPOINT with the endpoint of your Azure resource.
// You can find it in the Azure Portal.
const gigachat = new AzureGigaChat({ azureADTokenProvider });

async function main() {
  console.log('Non-streaming:');
  const result = await gigachat.chat.completions.create({
    model: deployment,
    messages: [{ role: 'user', content: 'Say hello!' }],
  });
  console.log(result.choices[0]!.message?.content);

  console.log();
  console.log('Streaming:');
  const stream = await gigachat.chat.completions.create({
    model: deployment,
    messages: [{ role: 'user', content: 'Say hello!' }],
    stream: true,
  });

  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content ?? '');
  }
  process.stdout.write('\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
