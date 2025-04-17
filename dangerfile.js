/* eslint-disable */
const { danger, markdown } = require('danger');
const { Octokit } = require('@octokit/core');
const fs = require('fs');
const AdmZip = require('adm-zip');
const glob = require('glob');
const gzipSize = require('gzip-size');

(async function() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_API_TOKEN,
  });

  // 获取基线的构建文件
  const { data } = await octokit.request('GET /repos/{owner}/{repo}/actions/artifacts', {
    owner: 'antvis',
    repo: 'F2',
    name: 'build',
  });

  const { artifacts } = data;
  // base artifact
  const artifact =
    artifacts.find((item) => {
      return item.workflow_run.head_sha === danger.github.pr.base.sha;
    }) || artifacts[0]; // 用最新的一个兜底

  if (!artifact) return;

  const fileResponse = await octokit.request(
    'GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}',
    {
      owner: 'antvis',
      repo: 'F2',
      artifact_id: artifact.id,
      archive_format: 'zip',
    }
  );

  const zip = new AdmZip(Buffer.from(fileResponse.data));
  zip.extractAllTo('base-build');

  const BASE_DIR = 'base-build';
  const HEAD_DIR = 'packages';

  const CRITICAL_THRESHOLD = 0.02;
  const SIGNIFICANCE_THRESHOLD = 0.002;
  const CRITICAL_ARTIFACT_PATHS = new Set([
    // We always report changes to these bundles, even if the change is
    // insignificant or non-existent.
    'f2/dist/index.js',
    'f2/dist/index.min.js',
  ]);

  const kilobyteFormatter = new Intl.NumberFormat('en', {
    style: 'unit',
    unit: 'kilobyte',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function kbs(bytes) {
    return kilobyteFormatter.format(bytes / 1000);
  }

  const percentFormatter = new Intl.NumberFormat('en', {
    style: 'percent',
    signDisplay: 'exceptZero',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function change(decimal) {
    if (Number === Infinity) {
      return 'New file';
    }
    if (decimal === -1) {
      return 'Deleted';
    }
    if (decimal < 0.0001) {
      return '=';
    }
    return percentFormatter.format(decimal);
  }

  const header = `
  | Name | +/- | Base | Current | +/- gzip | Base gzip | Current gzip |
  | ---- | --- | ---- | ------- | -------- | --------- | ------------ |`;

  function row(result) {
    // const diffViewUrl = `https://react-builds.vercel.app/commits/${headSha}/files/${result.path}?compare=${baseSha}`;
    const rowArr = [
      `| ${result.path}`,
      `**${change(result.change)}**`,
      `${kbs(result.baseSize)}`,
      `${kbs(result.headSize)}`,
      `${change(result.changeGzip)}`,
      `${kbs(result.baseSizeGzip)}`,
      `${kbs(result.headSizeGzip)}`,
    ];
    return rowArr.join(' | ');
  }

  const resultsMap = new Map();
  const headArtifactPaths = glob.sync('*/dist/*.js', { cwd: 'packages' });

  for (const artifactPath of headArtifactPaths) {
    try {
      // This will throw if there's no matching base artifact
      const baseSize = fs.statSync(BASE_DIR + '/' + artifactPath).size;
      const baseSizeGzip = gzipSize.fileSync(BASE_DIR + '/' + artifactPath);

      const headSize = fs.statSync(HEAD_DIR + '/' + artifactPath).size;
      const headSizeGzip = gzipSize.fileSync(HEAD_DIR + '/' + artifactPath);
      resultsMap.set(artifactPath, {
        path: artifactPath,
        headSize,
        headSizeGzip,
        baseSize,
        baseSizeGzip,
        change: (headSize - baseSize) / baseSize,
        changeGzip: (headSizeGzip - baseSizeGzip) / baseSizeGzip,
      });
    } catch {
      // There's no matching base artifact. This is a new file.
      const baseSize = 0;
      const baseSizeGzip = 0;
      const headSize = fs.statSync(HEAD_DIR + '/' + artifactPath).size;
      const headSizeGzip = gzipSize.fileSync(HEAD_DIR + '/' + artifactPath);
      resultsMap.set(artifactPath, {
        path: artifactPath,
        headSize,
        headSizeGzip,
        baseSize,
        baseSizeGzip,
        change: Infinity,
        changeGzip: Infinity,
      });
    }
  }

  const results = Array.from(resultsMap.values());
  results.sort((a, b) => b.change - a.change);

  let criticalResults = [];
  for (const artifactPath of CRITICAL_ARTIFACT_PATHS) {
    const result = resultsMap.get(artifactPath);
    if (result === undefined) {
      throw new Error(
        'Missing expected bundle. If this was an intentional change to the ' +
          'build configuration, update Dangerfile.js accordingly: ' +
          artifactPath
      );
    }
    criticalResults.push(row(result));
  }

  let significantResults = [];
  for (const result of results) {
    // If result exceeds critical threshold, add to top section.
    if (
      (result.change > CRITICAL_THRESHOLD ||
        0 - result.change > CRITICAL_THRESHOLD ||
        // New file
        result.change === Infinity ||
        // Deleted file
        result.change === -1) &&
      // Skip critical artifacts. We added those earlier, in a fixed order.
      !CRITICAL_ARTIFACT_PATHS.has(result.path)
    ) {
      criticalResults.push(row(result));
    }

    // Do the same for results that exceed the significant threshold. These
    // will go into the bottom, collapsed section. Intentionally including
    // critical artifacts in this section, too.
    if (
      result.change > SIGNIFICANCE_THRESHOLD ||
      0 - result.change > SIGNIFICANCE_THRESHOLD ||
      result.change === Infinity ||
      result.change === -1
    ) {
      significantResults.push(row(result));
    }
  }

  markdown(`
## Critical size changes
Includes critical production bundles, as well as any change greater than ${CRITICAL_THRESHOLD *
    100}%:
${header}
${criticalResults.join('\n')}
## Significant size changes
Includes any change greater than ${SIGNIFICANCE_THRESHOLD * 100}%:
${
  significantResults.length > 0
    ? `
<details>
<summary>Expand to show</summary>
${header}
${significantResults.join('\n')}
</details>
`
    : '(No significant changes)'
}
`);
})();
