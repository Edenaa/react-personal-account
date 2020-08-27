import React from 'react';
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../redux/store';
import { logoutUser } from '../redux/actions/login';

interface IAuthContext {
  state: string,
  isLogoutUser(): void
}

interface IAuthProvider {
  children: React.ReactNode
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({children}: IAuthProvider) => {
  const access = useSelector(({auth}: RootState) => auth.access);
  const state = useSelector(({auth}: RootState) => auth.state);
  const dispatch = useDispatch();

  const isLogoutUser = () => {
    localStorage.clear();
    dispatch(logoutUser({}));
  }

  const currentTime = Math.round(new Date().getTime()/1000.0);
  access.exp <= currentTime && isLogoutUser()
  return (
    <AuthContext.Provider value={{state, isLogoutUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}