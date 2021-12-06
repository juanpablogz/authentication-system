import * as appConstants from '@constants/appConstants';

import { EnvConfig } from '@config/config';

const localConfig: EnvConfig = {
  baseUrl: appConstants.LOCAL_BASE_DOMAIN,
  debug: true,
  cache: {
    enable: false,
  },
};

export default localConfig;
