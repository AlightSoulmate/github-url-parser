# github-url-parser

[![npm version](https://img.shields.io/npm/v/github-url-parser.svg)](https://www.npmjs.com/package/github-url-parser)
[![license](https://img.shields.io/npm/l/github-url-parser.svg)](https://github.com/AlightSoulmate/github-url-parser/blob/master/LICENSE)
[![types](https://img.shields.io/npm/types/github-url-parser.svg)](https://www.npmjs.com/package/github-url-parser)
[![publish](https://github.com/AlightSoulmate/github-url-parser/actions/workflows/publish.yml/badge.svg)](https://github.com/AlightSoulmate/github-url-parser/actions/workflows/publish.yml)
[![package size](https://img.shields.io/npm/unpacked-size/github-url-parser.svg)](https://www.npmjs.com/package/github-url-parser)

Parse GitHub repository URLs and common GitHub page URLs into a predictable metadata object.

`github-url-parser` normalizes GitHub remotes, shorthand repository specifiers, and browser URLs for files, directories, issues, pull requests, commits, releases, comparisons, discussions, and workflow runs. It includes TypeScript declarations, makes no network requests, and returns `null` for unsupported or non-GitHub input.

## Installation

```sh
npm install github-url-parser
```

## Usage

```js
import { parseGitHubUrl } from "github-url-parser";

const result = parseGitHubUrl(
  "https://github.com/AlightSoulmate/github-url-parser/blob/main/package.json"
);

console.log(result);
```

```js
{
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
  rawUrl: "https://raw.githubusercontent.com/AlightSoulmate/github-url-parser/main/package.json"
}
```

Invalid URLs, unsupported GitHub pages, and non-GitHub hosted Git URLs return `null`.

```js
parseGitHubUrl("https://example.com/foo/bar");
// null

parseGitHubUrl("https://gitlab.com/user/repo");
// null
```

## API

### `parseGitHubUrl(url)`

Parses `url` and returns a metadata object for supported GitHub URLs. Returns `null` when the input cannot be parsed as a supported GitHub resource.

The package exports `parseGitHubUrl` as a named ESM export.

TypeScript declarations are included.

## Supported Inputs

Repository and remote specifiers are parsed through `hosted-git-info`:

```txt
https://github.com/user/repo
https://github.com/user/repo.git
git@github.com:user/repo.git
github:user/repo
user/repo
```

GitHub browser URLs are parsed directly:

```txt
https://github.com/user/repo
https://github.com/user/repo/tree/main/src
https://github.com/user/repo/blob/main/src/index.js
https://github.com/user/repo/issues/123
https://github.com/user/repo/pull/456
https://github.com/user/repo/commit/abc123
https://github.com/user/repo/compare/main...dev
https://github.com/user/repo/releases
https://github.com/user/repo/releases/tag/v1.0.0
https://github.com/user/repo/releases/latest
https://github.com/user/repo/tags
https://github.com/user/repo/branches
https://github.com/user/repo/discussions
https://github.com/user/repo/discussions/123
https://github.com/user/repo/actions
https://github.com/user/repo/actions/runs/123456789
```

## Result Object

Every successful parse includes the base repository fields:

```js
{
  owner: "user",
  repo: "repo",
  domain: "github.com",
  type: "github",
  kind: "repo",
  committish: null,
  repoUrl: "https://github.com/user/repo",
  browseUrl: "https://github.com/user/repo",
  apiUrl: "https://api.github.com/repos/user/repo",
  httpsUrl: "https://github.com/user/repo.git",
  sshUrl: "git@github.com:user/repo.git"
}
```

Field notes:

- `owner` and `repo` identify the repository.
- `kind` identifies the parsed resource type.
- `committish` is `null` unless the URL carries a branch, tag, commit, or other ref-like value.
- `repoUrl` always points to the repository page.
- `browseUrl` points to the parsed GitHub page or repository browser URL.
- `apiUrl` is the closest related GitHub REST API endpoint generated from the URL. For resources without a dedicated REST endpoint, it falls back to the repository API URL. The package does not call the GitHub API.
- `httpsUrl` and `sshUrl` are normalized Git remote URLs.

Additional fields are included for specific resource types:

| `kind` | URL type | Additional fields |
| --- | --- | --- |
| `repo` | Repository or remote | None |
| `blob` | File browser URL | `ref`, `path`, `rawUrl` |
| `tree` | Directory browser URL | `ref`, `path`, `rawUrl: null` |
| `issue` | Issue URL | `number` |
| `pull` | Pull request URL | `number` |
| `commit` | Commit URL | `sha` |
| `release` | Release tag URL | `tag` |
| `releases` | Releases collection | `collection` |
| `latest-release` | Latest release URL | `selector` |
| `compare` | Compare URL | `range`, `baseRef`, `headRef` |
| `tags` | Tags collection | `collection` |
| `branches` | Branches collection | `collection` |
| `discussions` | Discussions collection | `collection` |
| `discussion` | Discussion URL | `number` |
| `actions` | Actions collection | `collection` |
| `workflow-run` | Workflow run URL | `runId` |

## Examples

### Repository shorthand

```js
parseGitHubUrl("github:AlightSoulmate/github-url-parser#v0.1.0");
// {
//   owner: "AlightSoulmate",
//   repo: "github-url-parser",
//   domain: "github.com",
//   type: "github",
//   kind: "repo",
//   committish: "v0.1.0",
//   repoUrl: "https://github.com/AlightSoulmate/github-url-parser",
//   browseUrl: "https://github.com/AlightSoulmate/github-url-parser/tree/v0.1.0",
//   apiUrl: "https://api.github.com/repos/AlightSoulmate/github-url-parser",
//   httpsUrl: "https://github.com/AlightSoulmate/github-url-parser.git#v0.1.0",
//   sshUrl: "git@github.com:AlightSoulmate/github-url-parser.git#v0.1.0"
// }
```

### Issue

```js
parseGitHubUrl("https://github.com/user/repo/issues/123");
// {
//   owner: "user",
//   repo: "repo",
//   domain: "github.com",
//   type: "github",
//   kind: "issue",
//   committish: null,
//   repoUrl: "https://github.com/user/repo",
//   browseUrl: "https://github.com/user/repo/issues/123",
//   apiUrl: "https://api.github.com/repos/user/repo/issues/123",
//   httpsUrl: "https://github.com/user/repo.git",
//   sshUrl: "git@github.com:user/repo.git",
//   number: 123
// }
```

### Compare

```js
parseGitHubUrl("https://github.com/user/repo/compare/main...dev");
// {
//   owner: "user",
//   repo: "repo",
//   domain: "github.com",
//   type: "github",
//   kind: "compare",
//   committish: null,
//   repoUrl: "https://github.com/user/repo",
//   browseUrl: "https://github.com/user/repo/compare/main...dev",
//   apiUrl: "https://api.github.com/repos/user/repo/compare/main...dev",
//   httpsUrl: "https://github.com/user/repo.git",
//   sshUrl: "git@github.com:user/repo.git",
//   range: "main...dev",
//   baseRef: "main",
//   headRef: "dev"
// }
```

## Behavior Notes

- Only `github.com` URLs are supported.
- API URLs and raw file URLs are generated strings; they are not validated with the GitHub API.
- Unsupported GitHub pages, malformed issue or pull request numbers, and invalid compare ranges return `null`.

## Development

```sh
npm test
```

Runs both AVA and TSD test.

## License

MIT
