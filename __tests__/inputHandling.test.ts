import * as process from 'process';
import * as cp from 'child_process';
import * as path from 'path';
import { expect, test } from '@jest/globals';
import { parseInputIdentifiers, parseInputStateMap } from '../src/input-handling';

describe('parseInputIdentifiers', () => {
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
});

describe('parseInputStateMap', () => {
  test('Empty string', async () => {
    expect(parseInputStateMap('')).toEqual({});
  });

  test('empty map', async () => {
    expect(parseInputStateMap('{}')).toEqual({});
  });

  test('map with single identifier', async () => {
    expect(parseInputStateMap('{"PLAT": "123-456"}')).toEqual({ PLAT: '123-456' });
  });

  test('map with two identifiers', async () => {
    expect(parseInputStateMap('{"PLAT": "123-456", "ENG": "456-123"}')).toEqual({ PLAT: '123-456', ENG: '456-123' });
  });

  test('invalid JSON', async () => {
    expect(() => parseInputStateMap('[[]}')).toThrow('Error parsing state map input');
  });
});
