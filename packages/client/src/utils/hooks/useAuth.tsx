import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { IUseAuthType } from '../../types/Auth/useAuthType';

// Add your Firebase credentials
firebase.initializeApp({
  apiKey: 'AIzaSyCHknJhzq6NGTDj-tj5d6qGfQOHD8dyisQ',
  authDomain: 'lcm-system.firebaseapp.com',
  projectId: 'lcm-system',
  storageBucket: 'lcm-system.appspot.com',
  messagingSenderId: '189119636279',
  appId: '1:189119636279:web:f3b13601e8d4315ee970b2',
  measurementId: 'G-3E2XTNMEH0',
});

const authContext = createContext({});

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = (): IUseAuthType => {
  return useContext(authContext) as IUseAuthType;
};

// Provider hook that creates auth object and handles state
function useProvideAuth(): IUseAuthType {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<firebase.User | null>(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signIn = (email: string, password: string) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        setLoading(false);
        return response.user;
      })
      .finally(() => setLoading(false));
  };

  const signUp = (email: string, password: string) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        setLoading(false);
        return response.user;
      })
      .finally(() => setLoading(false));
  };

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setLoading(true);
        setUser(null);
      })
      .finally(() => setLoading(false));
  };

  const sendPasswordResetEmail = (email: string) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      })
      .finally(() => setLoading(false));
  };

  const confirmPasswordReset = (code: string, password: string) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      })
      .finally(() => setLoading(false));
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    loading,
    user,
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
