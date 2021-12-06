// App constants
import * as appConstants from '@constants/appConstants';

// Configuration
import commonConfig from './commonConfig';
import localConfig from './localConfig';
import productionConfig from './productionConfig';

// Export Types
export type CommonConfig = {
  api: {
    uriMedia: string;
    uri360: string;
  };
  server: {
    port: number;
  };
  languages: {
    default: string;
    list: string[];
  };
};

export type EnvConfig = {
  baseUrl: string;
  debug: boolean;
  cache: {
    enable: boolean;
  };
};

// Private Type
type Config = CommonConfig & EnvConfig;

// development => local
let env = appConstants.LOCAL;

if (process.env.NODE_ENV && process.env.NODE_ENV !== appConstants.DEV) {
  env = process.env.NODE_ENV;
}

// Configurations by environment
const config: Config = {
  ...commonConfig,
  ...(env === appConstants.LOCAL ? localConfig : productionConfig),
};

// Environments validations
export const isLocal = (): boolean => env === appConstants.LOCAL;
export const isProduction = (): boolean => env === appConstants.PRD;

// Configuration
export default config;
