/* --- DEPENDENCIES --- */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { isLocal } from '@config/config';
import { auth, db } from '@config/firebase/firebaseConfig';
import { UserData } from '@interfaces/data';
/* -------------------- */

export enum ErrorCode {
  notFound = 'NOT-FOUND',
  wrongPassword = 'WRONG-PASSWORD',
}

/*----------------------*/
/*  PROVIDER INTERFACE  */
/*----------------------*/
export interface AuthContext {
  authState: AuthState;
  login: (email: string, password: string) => Promise<firebase.User | null | ErrorCode>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | undefined>;
}

interface AuthState {
  currentUser?: UserData;
  authenticated: boolean;
  loading: boolean;
}

/*----------------------*/
/*  CONTEXT DEFINITION  */
/*----------------------*/
const AuthContext = createContext<AuthContext>({} as AuthContext);

/*-----------------------*/
/*  PROVIDER DEFINITION  */
/*-----------------------*/
export const AuthProvider = ({ children }): JSX.Element => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const [authState, setAuthState] = useState<AuthState>({
    authenticated: false,
    loading: true,
  });

  const getCurrentUser = async (uid: string): Promise<UserData> => {
    const usersRef = db.ref(`users/${uid}`);
    const snapshot = await usersRef.once('value');
    return snapshot.val();
  };

  const getToken = async (): Promise<string | undefined> => {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken(true);
      return token;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        setAuthState((values) => ({ ...values, authenticated: false, loading: false }));
        return;
      }

      const currentUser = await getCurrentUser(firebaseUser.uid);
      setAuthState({ currentUser, authenticated: true, loading: false });
    });
    // Cleanup subscription on unmount
    return (): void => unsubscribe();
  }, []);

  /* METHODS DEFINITIONS */
  const login = async (email: string, password: string): Promise<firebase.User | null | ErrorCode> => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      if (!response.user) return null;
      const currentUser = await getCurrentUser(response.user.uid);
      setAuthState((values) => ({ ...values, currentUser }));
      return response.user;
    } catch (error) {
      isLocal() && console.log('Error login catch: ', error);
      if (error.code === 'auth/user-not-found') return ErrorCode.notFound;
      if (error.code === 'auth/wrong-password') return ErrorCode.wrongPassword;
      return null;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setAuthState((values) => ({ ...values, authenticated: true, loading: true }));
      await auth.signOut();
      setAuthState((values) => ({ ...values, authenticated: false, loading: false }));
    } catch (error) {
      isLocal() && console.log('Error logout catch: ', error);
    }
  };

  /* GROUP VALUES */
  const authProviderValue = {
    authState,
    login,
    logout,
    getToken,
  };

  /* RENDER PROVIDER */
  return <AuthContext.Provider value={authProviderValue}>{children}</AuthContext.Provider>;
};

/*-----------------------*/
/*   EXPORT USE METHOD   */
/*-----------------------*/
export const useAuth = (): AuthContext => {
  return useContext(AuthContext);
};
