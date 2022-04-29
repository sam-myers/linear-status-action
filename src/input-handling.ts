import * as core from '@actions/core';

export const parseInputIdentifiers = (identifiersAsString: string): number[] => {
  if (identifiersAsString.length === 0) {
    return [];
  }

  try {
    const identifiers = JSON.parse(identifiersAsString);
    return identifiers;
  } catch (error) {
    core.debug(`Error parsing input ${error}`);
    throw new Error('Error parsing input');
  }
};
