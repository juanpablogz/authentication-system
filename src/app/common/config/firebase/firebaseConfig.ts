import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import * as appConstants from '@constants/appConstants';

// Initialize Firebase
firebase.initializeApp(appConstants.FIREBASE_CONFIG);

export const db = firebase.database();

export const auth = firebase.auth();
