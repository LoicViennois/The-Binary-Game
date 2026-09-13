const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let gitSha = process.env.RAILWAY_GIT_COMMIT_SHA;

if (!gitSha) {
  try {
    gitSha = execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    gitSha = 'dev';
  }
}

const envProdPath = path.resolve(__dirname, '../src/environments/environment.prod.ts');
const envProdContent = `export const environment = {
  production: true,
  gitSha: '${gitSha}'
};
`;

fs.writeFileSync(envProdPath, envProdContent, 'utf-8');
console.log(`[set-git-sha] Injected gitSha (${gitSha}) into ${envProdPath}`);
