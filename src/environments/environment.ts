import { gitInfo } from './git-info';

export const environment = {
  production: false,
  commitSha: gitInfo.commitSha,
  shortSha: gitInfo.shortSha,
};
