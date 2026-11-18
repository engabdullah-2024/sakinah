// Content checks: every dua must be complete, sourced and correctly categorised.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const duas = JSON.parse(readFileSync(new URL('../src/data/duas.json', import.meta.url), 'utf8'));
const CATS = ['morning', 'evening', 'sleep', 'waking', 'home', 'toilet', 'eating', 'mosque', 'travel', 'worry', 'forgiveness', 'quran'];
const ARABIC = /[؀-ۿ]/;
const HARAKAT = /[ً-ْ]/;

test('ids are unique', () => {
  const ids = duas.map((d) => d.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('every dua has all required fields', () => {
  for (const d of duas) {
    assert.ok(ARABIC.test(d.arabic), `${d.id}: arabic`);
    assert.ok(HARAKAT.test(d.arabic), `${d.id}: arabic should carry vowel marks`);
    assert.ok(d.english.length > 2, `${d.id}: english`);
    assert.ok(d.somali.length > 2, `${d.id}: somali`);
    assert.ok(d.transliteration.length > 2, `${d.id}: transliteration`);
    assert.ok(d.title.en && d.title.so, `${d.id}: titles`);
    assert.ok(d.reference.length > 3, `${d.id}: reference`);
    assert.ok(Number.isInteger(d.repeat) && d.repeat >= 1, `${d.id}: repeat`);
    assert.equal(typeof d.somaliReviewed, 'boolean', `${d.id}: somaliReviewed`);
  }
});

test('categories are valid and every category has duas', () => {
  for (const d of duas) for (const c of d.categories) assert.ok(CATS.includes(c), `${d.id}: bad category ${c}`);
  for (const c of CATS) assert.ok(duas.some((d) => d.categories.includes(c)), `empty category ${c}`);
});

test('known corrections are in place', () => {
  const d = duas.find((x) => x.id === 'me-20');
  assert.ok(d.english.includes('All-Hearing'));
  assert.ok(!d.english.includes('All-Seeing'));
});
