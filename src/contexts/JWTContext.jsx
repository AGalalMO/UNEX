import { APIS } from '../utils/ServiceUrls';
import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
// @types
import axiosInstance from '../utils/axios/axiosInstance';
import { isValidToken, setSession } from '../utils/jwt'
// ----------------------------------------------------------------------





const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user
        ,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };

    default:
      return state;
  }
};

const AuthContext = createContext(null);

// ----------------------------------------------------------------------


function AuthProvider ({ children }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const user = localStorage.getItem('user');
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: JSON.parse(user)

            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (values) => {
    const response = await axiosInstance.post(APIS.AUTH.SIGNIN, values);
    const { access_token, user } = response.data;
    setSession(access_token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: 'LOGIN',
      payload: {
        user: user,
      },
    });
  };

  const register = async (values) => {
    console.log("valueeees",values)
    const response = await axiosInstance.post(APIS.AUTH.REGISTER, values);
    const { access_token, user } = response.data;

    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('user', JSON.stringify(user));

    dispatch({
      type: 'REGISTER',
      payload: user,
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
