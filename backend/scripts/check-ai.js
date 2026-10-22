/**
 * Verifies your Gemini setup against the live API:
 *   1. lists the models your key can call for text generation
 *   2. test-calls the model configured in GEMINI_MODEL
 *
 * Local:   npm run check:ai
 * Docker:  docker compose exec backend node scripts/check-ai.js
 *
 * Model names change often. If step 2 fails with 404, pick a name from the
 * list printed in step 1 and set it as GEMINI_MODEL.
 */
import { env } from '../src/config/env.js';

const BASE = 'https://generativelanguage.googleapis.com/v1beta';
const key = env.ai.gemini.apiKey;
const model = env.ai.gemini.model;

if (env.ai.provider !== 'gemini') {
  console.log(`AI_PROVIDER is "${env.ai.provider}", so this Gemini check does not apply.`);
  process.exit(0);
}
if (!key) {
  console.error('GEMINI_API_KEY is not set.');
  process.exit(1);
}

const headers = { 'x-goog-api-key': key, 'Content-Type': 'application/json' };

// 1) List usable models
const names = [];
let pageToken = '';
for (let page = 0; page < 5; page += 1) {
  const res = await fetch(`${BASE}/models?pageSize=200${pageToken ? `&pageToken=${pageToken}` : ''}`, { headers });
  if (!res.ok) {
    console.error(`Could not list models (HTTP ${res.status}): ${(await res.text()).slice(0, 300)}`);
    console.error('This usually means the API key is invalid or not enabled for the Gemini API.');
    process.exit(1);
  }
  const data = await res.json();
  for (const m of data.models || []) {
    if (m.supportedGenerationMethods?.includes('generateContent') && m.name.startsWith('models/gemini')) {
      names.push(m.name.replace('models/', ''));
    }
  }
  if (!data.nextPageToken) break;
  pageToken = data.nextPageToken;
}
console.log('Gemini text models available to this key:');
names.sort().forEach((n) => console.log(`  - ${n}`));

// 2) Test the configured model
console.log(`\nTesting configured model: ${model}`);
const res = await fetch(`${BASE}/models/${model}:generateContent`, {
  method: 'POST',
  headers,
  body: JSON.stringify({ contents: [{ parts: [{ text: 'Reply with the single word: ok' }] }] }),
});

if (res.ok) {
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '(empty reply)';
  console.log(`OK — model replied: ${text.trim()}`);
  process.exit(0);
}

const body = (await res.text()).slice(0, 400);
console.error(`FAILED (HTTP ${res.status}): ${body}`);
if (res.status === 404) console.error('The model name is retired or unavailable. Set GEMINI_MODEL to one from the list above.');
if (res.status === 429) console.error('Rate/quota limit hit on the free tier. Wait a minute and retry, or pick a lighter model.');
process.exit(1);
