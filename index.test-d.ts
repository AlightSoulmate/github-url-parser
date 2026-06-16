import { expectError, expectType } from "tsd";
import {
  parseGitHubUrl,
  type GitHubIssueInfo,
  type ParsedGitHubUrl,
} from ".";

const parsed = parseGitHubUrl("https://github.com/user/repo/issues/123");

expectType<ParsedGitHubUrl | null>(parsed);

if (parsed?.kind === "issue") {
  expectType<GitHubIssueInfo>(parsed);
  expectType<number>(parsed.number);
  expectType<null>(parsed.committish);
  expectType<string>(parsed.apiUrl);
  expectError(parsed.sha);
}

const blob = parseGitHubUrl("https://github.com/user/repo/blob/main/src/index.js");

if (blob?.kind === "blob") {
  expectType<string>(blob.ref);
  expectType<string>(blob.path);
  expectType<string>(blob.rawUrl);
  expectType<string>(blob.committish);
  expectError(blob.number);
}

const tree = parseGitHubUrl("https://github.com/user/repo/tree/main/src");

if (tree?.kind === "tree") {
  expectType<string>(tree.ref);
  expectType<string>(tree.path);
  expectType<null>(tree.rawUrl);
}

const compare = parseGitHubUrl("https://github.com/user/repo/compare/main...dev");

if (compare?.kind === "compare") {
  expectType<string>(compare.range);
  expectType<string>(compare.baseRef);
  expectType<string>(compare.headRef);
}

const workflowRun = parseGitHubUrl(
  "https://github.com/user/repo/actions/runs/123456789"
);

if (workflowRun?.kind === "workflow-run") {
  expectType<number>(workflowRun.runId);
  expectType<string>(workflowRun.apiUrl);
  expectError(workflowRun.number);
}

expectType<ParsedGitHubUrl | null>(parseGitHubUrl("not a github url"));
