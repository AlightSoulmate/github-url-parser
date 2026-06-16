import test from "ava";
import { parseGitHubUrl } from "./index.js";

test("parses GitHub repo URL", (t) => {
  t.deepEqual(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    domain: "github.com",
    type: "github",
    kind: "repo",
    committish: null,
    repoUrl: "https://github.com/AlightSoulmate/parse-github-url",
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url",
    httpsUrl: "https://github.com/AlightSoulmate/parse-github-url.git",
    sshUrl: "git@github.com:AlightSoulmate/parse-github-url.git",
  });
});

test("parses GitHub SSH URL", (t) => {
  t.deepEqual(parseGitHubUrl("git@github.com:AlightSoulmate/parse-github-url.git"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    domain: "github.com",
    type: "github",
    kind: "repo",
    committish: null,
    repoUrl: "https://github.com/AlightSoulmate/parse-github-url",
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url",
    httpsUrl: "https://github.com/AlightSoulmate/parse-github-url.git",
    sshUrl: "git@github.com:AlightSoulmate/parse-github-url.git",
  });
});

test("parses GitHub URL with .git suffix", (t) => {
  t.deepEqual(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url.git"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    domain: "github.com",
    type: "github",
    kind: "repo",
    committish: null,
    repoUrl: "https://github.com/AlightSoulmate/parse-github-url",
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url",
    httpsUrl: "https://github.com/AlightSoulmate/parse-github-url.git",
    sshUrl: "git@github.com:AlightSoulmate/parse-github-url.git",
  });
});

test("parses GitHub shortcut URL", (t) => {
  t.like(parseGitHubUrl("github:AlightSoulmate/parse-github-url#v0.1.0"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    kind: "repo",
    committish: "v0.1.0",
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/tree/v0.1.0",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url",
    httpsUrl: "https://github.com/AlightSoulmate/parse-github-url.git#v0.1.0",
  });
});

test("parses GitHub blob URL", (t) => {
  t.deepEqual(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url/blob/main/package.json"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    domain: "github.com",
    type: "github",
    kind: "blob",
    committish: "main",
    repoUrl: "https://github.com/AlightSoulmate/parse-github-url",
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/blob/main/package.json",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url/contents/package.json?ref=main",
    httpsUrl: "https://github.com/AlightSoulmate/parse-github-url.git",
    sshUrl: "git@github.com:AlightSoulmate/parse-github-url.git",
    ref: "main",
    path: "package.json",
    rawUrl: "https://raw.githubusercontent.com/AlightSoulmate/parse-github-url/main/package.json",
  });
});

test("parses GitHub tree URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url/tree/main/src"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    kind: "tree",
    ref: "main",
    path: "src",
    rawUrl: null,
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/tree/main/src",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url/contents/src?ref=main",
  });
});

test("parses GitHub issue URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url/issues/123"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    kind: "issue",
    number: 123,
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/issues/123",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url/issues/123",
  });
});

test("parses GitHub pull request URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url/pull/456"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    kind: "pull",
    number: 456,
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/pull/456",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url/pulls/456",
  });
});

test("parses GitHub commit URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url/commit/abc123"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    kind: "commit",
    sha: "abc123",
    committish: "abc123",
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/commit/abc123",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url/commits/abc123",
  });
});

test("parses GitHub release tag URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url/releases/tag/v0.1.0"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    kind: "release",
    tag: "v0.1.0",
    committish: "v0.1.0",
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/releases/tag/v0.1.0",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url/releases/tags/v0.1.0",
  });
});

test("parses GitHub releases URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url/releases"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    kind: "releases",
    collection: "releases",
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/releases",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url/releases",
  });
});

test("parses GitHub latest release URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url/releases/latest"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    kind: "latest-release",
    selector: "latest",
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/releases/latest",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url/releases/latest",
  });
});

test("parses GitHub compare URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url/compare/main...dev"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    kind: "compare",
    range: "main...dev",
    baseRef: "main",
    headRef: "dev",
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/compare/main...dev",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url/compare/main...dev",
  });
});

test("parses GitHub tags URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url/tags"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    kind: "tags",
    collection: "tags",
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/tags",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url/tags",
  });
});

test("parses GitHub branches URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url/branches"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    kind: "branches",
    collection: "branches",
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/branches",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url/branches",
  });
});

test("parses GitHub discussions URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url/discussions"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    kind: "discussions",
    collection: "discussions",
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/discussions",
  });
});

test("parses GitHub discussion URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url/discussions/789"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    kind: "discussion",
    number: 789,
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/discussions/789",
  });
});

test("parses GitHub actions URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url/actions"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    kind: "actions",
    collection: "actions",
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/actions",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url/actions",
  });
});

test("parses GitHub workflow run URL", (t) => {
  t.like(parseGitHubUrl("https://github.com/AlightSoulmate/parse-github-url/actions/runs/123456789"), {
    owner: "AlightSoulmate",
    repo: "parse-github-url",
    kind: "workflow-run",
    runId: 123456789,
    browseUrl: "https://github.com/AlightSoulmate/parse-github-url/actions/runs/123456789",
    apiUrl: "https://api.github.com/repos/AlightSoulmate/parse-github-url/actions/runs/123456789",
  });
});

test("returns null for non-GitHub URL", (t) => {
  t.is(parseGitHubUrl("https://example.com/foo/bar"), null);
});

test("returns null for non-GitHub hosted git URL", (t) => {
  t.is(parseGitHubUrl("https://gitlab.com/user/repo"), null);
});
