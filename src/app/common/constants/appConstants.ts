/**
 * @desc App constants: Keep centralize every global app constant here
 * (e.g. server urls, domain, google Map Key, accessKeyIdS3, etc.)
 * @type constants
 */

/* Base domain */
export const LOCAL_BASE_DOMAIN = 'http://localhost:3000/';
export const DEV_BASE_DOMAIN = 'https://360-studio-editor-dev.netlify.app/';
export const PROD_BASE_DOMAIN = 'https://showroom.arlene.io/editor/';

/* Showroom script */
export const SHOWROOM_SCRIPT_URL = 'https://showroom.arlene.io/build/scripts.min.js';
// export const SHOWROOM_SCRIPT_URL = 'https://localhost:3000/build/scripts.js';

/* Auth */
export const REFRESH_TOKEN_URL = 'https://us-central1-360-studio-editor.cloudfunctions.net/refreshToken';

/* Environments */
export const LOCAL = 'local';
export const DEV = 'development';
export const PRD = 'production';

/* Server Url */
export const SERVER_URL = process.env.REACT_APP_BACKEND_SERVER_URL || 'http://localhost:3200/api';

/* Firebase Config */
export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
