import { useState } from 'react';
import { createContext } from 'react';
import { localStorageHelper } from '../utils/localStorageHelper';

export const ROLE = {
  ADMIN: 'Admin',
  CLIEN: 'Client',
  EMPLOYEE: 'Employee',
  DELIVER: 'Deliver',
  COLABORATOR: 'Collatorabor'
};

const initValue = {
  name: '',
  email: '',
  google_id: '',
  role: ROLE.CLIEN
};

export const userContext = createContext({
  user: initValue,
  isLogin: false,
  loadUserInfo: () => {},
  resetUserInfo: () => {},
  setUserInfor: () => {}
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorageHelper.load('user-info') ?? initValue
  );

  const loadUserInfo = () => {
    const user = localStorageHelper.load('user-info');
    setUser(user);
  };

  const resetUserInfo = () => {
    setUser(initValue);
    localStorage.clear();
  };

  const setUserInfor = (user, token) => {
    setUser(user);
    localStorageHelper.store('user-info', user);
    localStorageHelper.store('accessToken', token);
  };

  return (
    <userContext.Provider
      value={{
        user,
        loadUserInfo,
        resetUserInfo,
        setUserInfor,
        isLogin: !!user.email
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
