import GigaChat from 'gigachat';

const client = new GigaChat();

async function typeTests() {
  const response = await client.audio.transcriptions
    .create({
      file: 'test' as any,
      model: 'whisper-1',
    })
    .asResponse();
  response.body;
}
