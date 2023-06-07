import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';

export interface UserProps {
  email: string,
  photo: {
    url: string,
    id?: string,
  },
  name: string,
  biography: string,
  phone?: string,
}

interface AuthCtxType {
  isAuthenticated: boolean,
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
  user: UserProps | null,
  setUser: Dispatch<SetStateAction<UserProps | null>>,
  fetchUser: () => void,
  loading: boolean,
}

export const AuthCtx = createContext<AuthCtxType>({
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsAuthenticated: () => { },
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => { },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fetchUser: () => { },
  loading: true,
});

export const AuthProvider = (
  { children }: { children: ReactNode },
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/me`, {
        withCredentials: true,
      }).then((response) => {
        return response;
      }).catch((error) => {
        return error;
      });

      if (response?.response?.data?.message === 'Unauthorized') {
        setIsAuthenticated(false);
        setUser(null);
      } else {
        setUser(response?.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Executing AuthProvider, useeffect');
    fetchUser();
  }, []);

  return (
    <AuthCtx.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        fetchUser,
        loading,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}