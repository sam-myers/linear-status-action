import * as process from 'process';
import * as cp from 'child_process';
import * as path from 'path';
import { expect, test } from '@jest/globals';
import { splitLinearIdentifiersByTeam } from '../src/linear-status-update';

describe('splitLinearIdentifiersByTeam', () => {
  test('Empty array', async () => {
    expect(splitLinearIdentifiersByTeam([])).toEqual({});
  });

  test('Bad input', async () => {
    expect(() => splitLinearIdentifiersByTeam(['NOSPLIT'])).toThrowError('Identifier malformed');
  });

  test('Array with one team', async () => {
    expect(splitLinearIdentifiersByTeam(['ENG-123', 'ENG-456'])).toEqual({ ENG: ['ENG-123', 'ENG-456'] });
  });

  test('array with two teams', async () => {
    expect(splitLinearIdentifiersByTeam(['ENG-123', 'PLAT-456'])).toEqual({ ENG: ['ENG-123'], PLAT: ['PLAT-456'] });
  });

  test('array with two teams and multiple identifiers', async () => {
    expect(splitLinearIdentifiersByTeam(['ENG-123', 'ENG-456', 'PLAT-123', 'PLAT-456'])).toEqual({
      ENG: ['ENG-123', 'ENG-456'],
      PLAT: ['PLAT-123', 'PLAT-456'],
    });
  });
});
