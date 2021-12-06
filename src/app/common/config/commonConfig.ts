import { CommonConfig } from '@config/config';
// import * as appConstants from '@constants/appConstants';

const commonConfig: CommonConfig = {
  server: {
    port: 3000,
  },
  api: {
    uri360: (process.env.REACT_APP_BACKEND_SERVER_URL || 'http://localhost:3200/api') as string,
    uriMedia: (process.env.REACT_APP_BACKEND_SERVER_URL || 'http://localhost:3201/api') as string,
  },
  languages: {
    default: 'es',
    list: ['es', 'en'],
  },
};

export default commonConfig;
