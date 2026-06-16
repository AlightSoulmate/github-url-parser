import hostedGitInfo from "hosted-git-info";

const GITHUB_DOMAIN = "github.com";

const toInteger = (value) => {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  return Number(value);
};

const normalizePath = (parts) => parts.filter(Boolean).join("/");

const createRepoInfo = (owner, repo, committish = null) => ({
  owner,
  repo,
  domain: GITHUB_DOMAIN,
  type: "github",
  kind: "repo",
  committish,
  repoUrl: `https://${GITHUB_DOMAIN}/${owner}/${repo}`,
  browseUrl: `https://${GITHUB_DOMAIN}/${owner}/${repo}`,
  apiUrl: `https://api.github.com/repos/${owner}/${repo}`,
  httpsUrl: `https://${GITHUB_DOMAIN}/${owner}/${repo}.git`,
  sshUrl: `git@${GITHUB_DOMAIN}:${owner}/${repo}.git`,
});

const parseGitHubWebUrl = (url) => {
  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    return null;
  }

  if (parsedUrl.hostname !== GITHUB_DOMAIN) {
    return null;
  }

  const [owner, repoWithSuffix, section, ...rest] = parsedUrl.pathname
    .split("/")
    .filter(Boolean);

  if (!owner || !repoWithSuffix) {
    return null;
  }

  const repo = repoWithSuffix.endsWith(".git")
    ? repoWithSuffix.slice(0, -4)
    : repoWithSuffix;

  if (!repo) {
    return null;
  }

  const base = createRepoInfo(owner, repo);

  if (!section) {
    return base;
  }

  if (section === "tree" || section === "blob") {
    const [ref, ...pathParts] = rest;

    if (!ref) {
      return null;
    }

    const path = normalizePath(pathParts);

    return {
      ...base,
      kind: section,
      ref,
      committish: ref,
      path,
      browseUrl: `${base.repoUrl}/${section}/${ref}${path ? `/${path}` : ""}`,
      apiUrl: path
        ? `${base.apiUrl}/contents/${path}?ref=${encodeURIComponent(ref)}`
        : `${base.apiUrl}/git/trees/${encodeURIComponent(ref)}`,
      rawUrl:
        section === "blob"
          ? `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`
          : null,
    };
  }

  if (section === "issues" || section === "pull") {
    const number = toInteger(rest[0] || "");

    if (!number) {
      return null;
    }

    return {
      ...base,
      kind: section === "issues" ? "issue" : "pull",
      number,
      browseUrl: `${base.repoUrl}/${section}/${number}`,
      apiUrl: `${base.apiUrl}/${section === "issues" ? "issues" : "pulls"}/${number}`,
    };
  }

  if (section === "commit") {
    const sha = rest[0] || null;

    if (!sha) {
      return null;
    }

    return {
      ...base,
      kind: "commit",
      sha,
      committish: sha,
      browseUrl: `${base.repoUrl}/commit/${sha}`,
      apiUrl: `${base.apiUrl}/commits/${sha}`,
    };
  }

  if (section === "releases" && rest[0] === "tag") {
    const tag = normalizePath(rest.slice(1)) || null;

    if (!tag) {
      return null;
    }

    return {
      ...base,
      kind: "release",
      tag,
      committish: tag,
      browseUrl: `${base.repoUrl}/releases/tag/${tag}`,
      apiUrl: `${base.apiUrl}/releases/tags/${encodeURIComponent(tag)}`,
    };
  }

  if (section === "releases") {
    if (!rest[0]) {
      return {
        ...base,
        kind: "releases",
        collection: "releases",
        browseUrl: `${base.repoUrl}/releases`,
        apiUrl: `${base.apiUrl}/releases`,
      };
    }

    if (rest[0] === "latest") {
      return {
        ...base,
        kind: "latest-release",
        selector: "latest",
        browseUrl: `${base.repoUrl}/releases/latest`,
        apiUrl: `${base.apiUrl}/releases/latest`,
      };
    }
  }

  if (section === "compare") {
    const range = normalizePath(rest) || null;

    if (!range) {
      return null;
    }

    const [baseRef, headRef] = range.split("...");

    if (!baseRef || !headRef) {
      return null;
    }

    return {
      ...base,
      kind: "compare",
      range,
      baseRef,
      headRef,
      browseUrl: `${base.repoUrl}/compare/${range}`,
      apiUrl: `${base.apiUrl}/compare/${range}`,
    };
  }

  if (section === "tags" || section === "branches") {
    return {
      ...base,
      kind: section,
      collection: section,
      browseUrl: `${base.repoUrl}/${section}`,
      apiUrl: `${base.apiUrl}/${section}`,
    };
  }

  if (section === "discussions") {
    const number = rest[0] ? toInteger(rest[0]) : null;

    if (!rest[0]) {
      return {
        ...base,
        kind: "discussions",
        collection: "discussions",
        browseUrl: `${base.repoUrl}/discussions`,
      };
    }

    if (!number) {
      return null;
    }

    return {
      ...base,
      kind: "discussion",
      number,
      browseUrl: `${base.repoUrl}/discussions/${number}`,
    };
  }

  if (section === "actions") {
    if (!rest[0]) {
      return {
        ...base,
        kind: "actions",
        collection: "actions",
        browseUrl: `${base.repoUrl}/actions`,
        apiUrl: `${base.apiUrl}/actions`,
      };
    }

    if (rest[0] === "runs") {
      const runId = toInteger(rest[1] || "");

      if (!runId) {
        return null;
      }

      return {
        ...base,
        kind: "workflow-run",
        runId,
        browseUrl: `${base.repoUrl}/actions/runs/${runId}`,
        apiUrl: `${base.apiUrl}/actions/runs/${runId}`,
      };
    }
  }

  return null;
};

export const parseGitHubUrl = (url) => {
  const webInfo = parseGitHubWebUrl(url);

  if (webInfo) {
    return webInfo;
  }

  const info = hostedGitInfo.fromUrl(url);

  if (!info || info.type !== "github") {
    return null;
  }

  return {
    owner: info.user,
    repo: info.project,
    domain: info.domain,
    type: info.type,
    kind: "repo",
    committish: info.committish || null,
    repoUrl: info.browse({ noCommittish: true }),
    browseUrl: info.browse(),
    apiUrl: `https://api.github.com/repos/${info.user}/${info.project}`,
    httpsUrl: info.https({ noGitPlus: true }),
    sshUrl: info.ssh(),
  };
};
