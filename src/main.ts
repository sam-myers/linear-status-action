import * as core from '@actions/core';
import { parseInputIdentifiers } from './input-handling';

async function run(): Promise<void> {
  try {
    const identifiersAsString: string = core.getInput('pr-ids');
    const identifiers = parseInputIdentifiers(identifiersAsString);

    core.debug(`Executing action with identifiers ${identifiers}`); // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.info('Action executed');
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
