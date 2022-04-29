import * as process from 'process';
import * as cp from 'child_process';
import * as path from 'path';
import { expect, test } from '@jest/globals';
import { parseInputIdentifiers } from '../src/input-handling';

test('Empty string', async () => {
  expect(parseInputIdentifiers('')).toEqual([]);
});

test('empty array', async () => {
  expect(parseInputIdentifiers('[]')).toEqual([]);
});

test('array with identifiers', async () => {
  expect(parseInputIdentifiers('[123, 456]')).toEqual([123, 456]);
});

test('invalid JSON', async () => {
  expect(() => parseInputIdentifiers('[[]}')).toThrow('Error parsing input');
});
