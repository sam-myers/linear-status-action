import * as process from 'process';
import * as cp from 'child_process';
import * as path from 'path';
import { expect, test } from '@jest/globals';
import { findLinearIdentifiersInPRComment } from '../src/pr-lookup';

test('Empty string', async () => {
  expect(findLinearIdentifiersInPRComment('')).toEqual([]);
});

test('One match', async () => {
  expect(
    findLinearIdentifiersInPRComment(`
  <details>
  <summary><a href="https://linear.app/abcd/issue/ENG-5875/user-has-problem">ENG-5875 User has problem</a></summary>
  <p>
  Some weird text here  
  </p>
  </details>
  `),
  ).toEqual(['ENG-5875']);
});

test('Two matches', async () => {
  expect(
    findLinearIdentifiersInPRComment(`
  <details>
  <summary><a href="https://linear.app/abcd/issue/ENG-5875/user-has-problem">ENG-5875 User has problem</a></summary>
  <p>
  Some weird text here  
  </p>
  </details>
  <details>
  <summary><a href="https://linear.app/abcd/issue/ENG-5834/user-has-another-problem">ENG-5875 User has many problems</a></summary>
  <p>
  Some weird text here also
  </p>
  </details>
  `),
  ).toEqual(['ENG-5875', 'ENG-5834']);
});
