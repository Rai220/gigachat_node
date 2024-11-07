import GigaChat from 'gigachat';
import { GigaChatStream, StreamingTextResponse } from 'ai';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
  unstable_allowDynamic: [
    // This is currently required because `qs` uses `side-channel` which depends on this.
    '/node_modules/function-bind/**',
  ],
};

export default async (request: NextRequest) => {
  const gigachat = new GigaChat();

  // Extract the `messages` from the body of the request
  const { messages } = await request.json();

  // Ask GigaChat for a streaming chat completion given the prompt
  const streamResponse = await gigachat.chat.completions
    .create({
      model: 'GigaChat-Pro',
      stream: true,
      messages,
    })
    .asResponse();

  const stream = GigaChatStream(streamResponse);

  // Respond with the stream
  return new StreamingTextResponse(stream);
};
