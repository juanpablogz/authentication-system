import * as appConstants from '@constants/appConstants';

import { EnvConfig } from '@config/config';

const productionConfig: EnvConfig = {
  baseUrl: appConstants.PROD_BASE_DOMAIN,
  debug: false,
  cache: {
    enable: true,
  },
};

export default productionConfig;
