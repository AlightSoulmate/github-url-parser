export type GitHubResourceKind =
  | "repo"
  | "blob"
  | "tree"
  | "issue"
  | "pull"
  | "commit"
  | "release"
  | "releases"
  | "latest-release"
  | "compare"
  | "tags"
  | "branches"
  | "discussions"
  | "discussion"
  | "actions"
  | "workflow-run";

export interface BaseGitHubUrlInfo {
  owner: string;
  repo: string;
  domain: "github.com";
  type: "github";
  kind: GitHubResourceKind;
  committish: string | null;
  repoUrl: string;
  browseUrl: string;
  apiUrl: string;
  httpsUrl: string;
  sshUrl: string;
}

export interface GitHubRepoInfo extends BaseGitHubUrlInfo {
  kind: "repo";
}

export interface GitHubBlobInfo extends BaseGitHubUrlInfo {
  kind: "blob";
  committish: string;
  ref: string;
  path: string;
  rawUrl: string;
}

export interface GitHubTreeInfo extends BaseGitHubUrlInfo {
  kind: "tree";
  committish: string;
  ref: string;
  path: string;
  rawUrl: null;
}

export interface GitHubIssueInfo extends BaseGitHubUrlInfo {
  kind: "issue";
  committish: null;
  number: number;
}

export interface GitHubPullInfo extends BaseGitHubUrlInfo {
  kind: "pull";
  committish: null;
  number: number;
}

export interface GitHubCommitInfo extends BaseGitHubUrlInfo {
  kind: "commit";
  committish: string;
  sha: string;
}

export interface GitHubReleaseInfo extends BaseGitHubUrlInfo {
  kind: "release";
  committish: string;
  tag: string;
}

export interface GitHubReleasesInfo extends BaseGitHubUrlInfo {
  kind: "releases";
  committish: null;
  collection: "releases";
}

export interface GitHubLatestReleaseInfo extends BaseGitHubUrlInfo {
  kind: "latest-release";
  committish: null;
  selector: "latest";
}

export interface GitHubCompareInfo extends BaseGitHubUrlInfo {
  kind: "compare";
  committish: null;
  range: string;
  baseRef: string;
  headRef: string;
}

export interface GitHubTagsInfo extends BaseGitHubUrlInfo {
  kind: "tags";
  committish: null;
  collection: "tags";
}

export interface GitHubBranchesInfo extends BaseGitHubUrlInfo {
  kind: "branches";
  committish: null;
  collection: "branches";
}

export interface GitHubDiscussionsInfo extends BaseGitHubUrlInfo {
  kind: "discussions";
  committish: null;
  collection: "discussions";
}

export interface GitHubDiscussionInfo extends BaseGitHubUrlInfo {
  kind: "discussion";
  committish: null;
  number: number;
}

export interface GitHubActionsInfo extends BaseGitHubUrlInfo {
  kind: "actions";
  committish: null;
  collection: "actions";
}

export interface GitHubWorkflowRunInfo extends BaseGitHubUrlInfo {
  kind: "workflow-run";
  committish: null;
  runId: number;
}

export type ParsedGitHubUrl =
  | GitHubRepoInfo
  | GitHubBlobInfo
  | GitHubTreeInfo
  | GitHubIssueInfo
  | GitHubPullInfo
  | GitHubCommitInfo
  | GitHubReleaseInfo
  | GitHubReleasesInfo
  | GitHubLatestReleaseInfo
  | GitHubCompareInfo
  | GitHubTagsInfo
  | GitHubBranchesInfo
  | GitHubDiscussionsInfo
  | GitHubDiscussionInfo
  | GitHubActionsInfo
  | GitHubWorkflowRunInfo;

export function parseGitHubUrl(url: string): ParsedGitHubUrl | null;
