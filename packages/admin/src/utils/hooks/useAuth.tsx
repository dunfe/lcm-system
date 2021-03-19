import { message } from 'antd';
import axios from 'axios';
import React, { useState, useEffect, useContext, createContext } from 'react';
import Cookies from 'js-cookie'
interface IUser {
  token: string;
  user: any;
}
interface IUseAuthType {
  loading: boolean;
  user: IUser | null;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const authContext = createContext({});
const instance = axios.create({ baseURL: 'http://localhost:3000' })

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: { children: JSX.Element }) {
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
  const [user, setUser] = useState<IUser | null>(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signIn = (username: string, password: string) => {
    return instance.post('/api/users/login', { username, password }).then((response) => {
      setUser(response.data);
      setLoading(false);
      Cookies.set('user', JSON.stringify(response.data));

      return true;
    }).catch((error) => {
      console.error(error);
      message.error(error.response.data.message);

      return false;
    }).finally(() => setLoading(false));
  };

  const signOut = () => {
    return instance.get('/api/users/logout')
      .then(() => {
        setLoading(true);
        setUser(null);
        Cookies.remove('user');
      })
      .finally(() => setLoading(false));
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = () => {
      const _user = Cookies.get('user');

      if (_user) {
        setUser(JSON.parse(_user));
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    unsubscribe();

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    loading,
    user,
    signIn,
    signOut
  };
}
