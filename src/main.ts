import * as core from '@actions/core';
import { parseInputIdentifiers, parseInputStateMap } from './input-handling';
import { lookupTicketsByPR } from './pr-lookup';
import github from '@actions/github';
import { splitLinearIdentifiersByTeam, updateStatusOfLinearTickets } from './linear-status-update';

async function run(): Promise<void> {
  try {
    const identifiersAsString: string = core.getInput('pr-ids');
    const stateMapString: string = core.getInput('state-id-by-team');
    const isDryRun = core.getBooleanInput('dry-run');

    const { owner, repo } = github.context.repo;
    const identifiers = parseInputIdentifiers(identifiersAsString);
    const stateMap = parseInputStateMap(stateMapString);

    core.info(`Executing action with identifiers ${identifiers} and state maps ${stateMap}`);

    // Look up each PR and get all the Linear tickets associated with each PR
    const allLinearTicketIdentifiers = await lookupTicketsByPR(identifiers, owner, repo);
    core.info(`Found tickets ${allLinearTicketIdentifiers}`);

    // Split all linear ticket identifiers into teams
    const linearTicketIdentifiersByTeam = splitLinearIdentifiersByTeam(allLinearTicketIdentifiers);

    // Iterate over each team, and use the state ID for each team to update the tickets.
    for (const [team, linearIdentifiers] of Object.entries(linearTicketIdentifiersByTeam)) {
      // Change the status of each ticket
      const stateId = stateMap[team];
      if (!stateId) {
        core.error(`Unable to find a stateId for team ${team}. Skipping the team`);
        continue;
      }

      await updateStatusOfLinearTickets(linearIdentifiers, stateId, isDryRun);
    }

    core.info('Action finshed executing');
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
