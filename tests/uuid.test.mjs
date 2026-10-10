import test from 'node:test';
import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
import { createUuid } from '../src/uuid.js';
const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
test('native UUIDs have v4 format and do not repeat in a 10,000-value sample', () => {
  const values = Array.from({ length: 10000 }, () => createUuid(webcrypto));
  for (const value of values) assert.match(value, pattern);
  assert.equal(new Set(values).size, values.length);
});
test('fallback sets version and variant bits', () => {
  const cryptoApi = { getRandomValues: bytes => bytes.fill(255) };
  assert.equal(createUuid(cryptoApi), 'ffffffff-ffff-4fff-bfff-ffffffffffff');
  assert.match(createUuid({ getRandomValues: bytes => webcrypto.getRandomValues(bytes) }), pattern);
});
test('unavailable secure randomness fails instead of producing a weak identifier', () => {
  assert.throws(() => createUuid(null), /unavailable/);
});
