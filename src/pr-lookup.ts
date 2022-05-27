import * as github from '@actions/github';
import * as core from '@actions/core';

export const lookupTicketsByPR = async (prNumbers: number[], owner: string, repo: string) => {
  const githubToken = core.getInput('githubToken');
  const octokit = github.getOctokit(githubToken);

  const allMatches = [];
  for (const prNumber of prNumbers) {
    try {
      const result = await octokit.rest.issues.listComments({
        owner,
        repo,
        issue_number: prNumber,
      });

      const linearComments = result.data.filter((item) => item.user?.login === 'linear-app[bot]');
      for (const linearComment of linearComments) {
        const matches = findLinearIdentifiersInPRComment(linearComment.body || '');
        allMatches.push(...matches);
      }
    } catch (error) {
      core.error(`PR not found ${error}`);
    }
  }
  return allMatches;
};

// This parses the body of a comment from a Linear bot and extracts the issue identifiers as an array
export const findLinearIdentifiersInPRComment = (body: string) => {
  const regex = /https:\/\/linear\.app\/.*\/issue\/([a-zA-Z]*-\d*)\//gm;

  const identifiers = [];
  let fullMatch;
  while ((fullMatch = regex.exec(body)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (fullMatch.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    for (const [groupIndex, groupValue] of fullMatch.entries()) {
      if (groupIndex === 0) {
        continue;
      }

      identifiers.push(groupValue);
    }
  }
  return identifiers;
};
