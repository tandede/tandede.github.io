export const githubStarsCacheDuration = 24 * 60 * 60 * 1000;

// Bump this value when a manual, immediate Star refresh is requested.
const githubStarsCacheVersion = '2026-08-24-1';

export function getGitHubStarsCacheKey(repository: string) {
  return `github-stars:${githubStarsCacheVersion}:${repository}`;
}
