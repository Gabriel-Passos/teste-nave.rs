import { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface AuthState {
  id: string;
  userEmail: string;
  token: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn: (credentials: SignInData) => void;
  signOut: () => void;
  error: boolean;
  token: string;
  email: string;
  id: string;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [error, setError] = useState(false);

  const [data, setData] = useState(() => {
    const id = localStorage.getItem('@Nave.rs:User_id');
    const userEmail = localStorage.getItem('@Nave.rs:User_email');
    const token = localStorage.getItem('@Nave.rs:User_token');

    if ( token && id && userEmail ) {
      return { token, id, userEmail };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    await api.post('users/login', {
      email,
      password
    }).then(response => {
      const { id, email: userEmail, token } = response.data;

      localStorage.setItem('@Nave.rs:User_id', id);
      localStorage.setItem('@Nave.rs:User_email', email);
      localStorage.setItem('@Nave.rs:User_token', token);
  
      setData({ token, userEmail, id });
    }).catch(() => setError(true));
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Nave.rs:User_id');
    localStorage.removeItem('@Nave.rs:User_email');
    localStorage.removeItem('@Nave.rs:User_token');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      error,
      token: data.token,
      email: data.userEmail,
      id: data.id
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within as AuthProvider.');
  }

  return context
}

