import GigaChat from 'gigachat';

const key = `YOUR_TEMPORARY_TOKEN`;

const client = new GigaChat({
  apiKey: key,
});

async function main() {
  const ans = await client.chat.completions.create({
    model: 'GigaChat',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: false,
  });
  console.info(ans);
  console.info(ans.choices);
}

main();
