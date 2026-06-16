import test from "ava";
import { parseGitHubUrl } from "./index.js";

test("parses GitHub repo URL", (t) => {
  t.deepEqual(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    domain: "github.com",
    type: "github",
    kind: "repo",
    committish: null,
    repoUrl: "https://github.com/AlightSoulmate/github-url-parser",
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser",
    httpsUrl: "https://github.com/AlightSoulmate/github-url-parser.git",
    sshUrl: "git@github.com:AlightSoulmate/github-url-parser.git",
  });
});

test("parses GitHub SSH URL", (t) => {
  t.deepEqual(parseGitHubUrl("git@github.com:AlightSoulmate/github-url-parser.git"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    domain: "github.com",
    type: "github",
    kind: "repo",
    committish: null,
    repoUrl: "https://github.com/AlightSoulmate/github-url-parser",
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser",
    httpsUrl: "https://github.com/AlightSoulmate/github-url-parser.git",
    sshUrl: "git@github.com:AlightSoulmate/github-url-parser.git",
  });
});

test("parses GitHub URL with .git suffix", (t) => {
  t.deepEqual(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser.git"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    domain: "github.com",
    type: "github",
    kind: "repo",
    committish: null,
    repoUrl: "https://github.com/AlightSoulmate/github-url-parser",
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser",
    httpsUrl: "https://github.com/AlightSoulmate/github-url-parser.git",
    sshUrl: "git@github.com:AlightSoulmate/github-url-parser.git",
  });
});

test("parses GitHub shortcut URL", (t) => {
  t.like(parseGitHubUrl("github:AlightSoulmate/github-url-parser#v0.1.0"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    kind: "repo",
    committish: "v0.1.0",
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/tree/v0.1.0",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser",
    httpsUrl: "https://github.com/AlightSoulmate/github-url-parser.git#v0.1.0",
  });
});

test("parses GitHub blob URL", (t) => {
  t.deepEqual(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser/blob/main/package.json"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    domain: "github.com",
    type: "github",
    kind: "blob",
    committish: "main",
    repoUrl: "https://github.com/AlightSoulmate/github-url-parser",
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/blob/main/package.json",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser/contents/package.json?ref=main",
    httpsUrl: "https://github.com/AlightSoulmate/github-url-parser.git",
    sshUrl: "git@github.com:AlightSoulmate/github-url-parser.git",
    ref: "main",
    path: "package.json",
    rawUrl: "https://raw.githubusercontent.com/AlightSoulmate/github-url-parser/main/package.json",
  });
});

test("parses GitHub tree URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser/tree/main/src"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    kind: "tree",
    ref: "main",
    path: "src",
    rawUrl: null,
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/tree/main/src",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser/contents/src?ref=main",
  });
});

test("parses GitHub issue URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser/issues/123"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    kind: "issue",
    number: 123,
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/issues/123",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser/issues/123",
  });
});

test("parses GitHub pull request URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser/pull/456"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    kind: "pull",
    number: 456,
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/pull/456",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser/pulls/456",
  });
});

test("parses GitHub commit URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser/commit/abc123"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    kind: "commit",
    sha: "abc123",
    committish: "abc123",
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/commit/abc123",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser/commits/abc123",
  });
});

test("parses GitHub release tag URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser/releases/tag/v0.1.0"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    kind: "release",
    tag: "v0.1.0",
    committish: "v0.1.0",
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/releases/tag/v0.1.0",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser/releases/tags/v0.1.0",
  });
});

test("parses GitHub releases URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser/releases"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    kind: "releases",
    collection: "releases",
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/releases",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser/releases",
  });
});

test("parses GitHub latest release URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser/releases/latest"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    kind: "latest-release",
    selector: "latest",
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/releases/latest",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser/releases/latest",
  });
});

test("parses GitHub compare URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser/compare/main...dev"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    kind: "compare",
    range: "main...dev",
    baseRef: "main",
    headRef: "dev",
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/compare/main...dev",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser/compare/main...dev",
  });
});

test("parses GitHub tags URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser/tags"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    kind: "tags",
    collection: "tags",
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/tags",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser/tags",
  });
});

test("parses GitHub branches URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser/branches"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    kind: "branches",
    collection: "branches",
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/branches",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser/branches",
  });
});

test("parses GitHub discussions URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser/discussions"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    kind: "discussions",
    collection: "discussions",
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/discussions",
  });
});

test("parses GitHub discussion URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser/discussions/789"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    kind: "discussion",
    number: 789,
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/discussions/789",
  });
});

test("parses GitHub actions URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser/actions"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    kind: "actions",
    collection: "actions",
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/actions",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser/actions",
  });
});

test("parses GitHub workflow run URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/github-url-parser/actions/runs/123456789"), {
    owner: "AlightSoulmate",
    repo: "github-url-parser",
    kind: "workflow-run",
    runId: 123456789,
    browseUrl: "https://github.com/AlightSoulmate/github-url-parser/actions/runs/123456789",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser/actions/runs/123456789",
  });
});

test("returns null for non-GitHub URL", (t) => {
  t.is(parseGitHubUrl("https://example.com/foo/bar"), null);
});

test("returns null for non-GitHub hosted git URL", (t) => {
  t.is(parseGitHubUrl("https://gitlab.com/user/repo"), null);
});
