import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { AuthReducer } from '../reducers/AuthReducer';
import { baseUrl, LOCAL_STORAGE_TOKEN_NAME, SET_AUTH } from './constants';
import { setAuthToken } from '../utils/setAuthToken';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null
  });
  // Authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(`${baseUrl}/auth`)
      if (response.data.success) {
        dispatch({
          type: SET_AUTH, 
          payload: {
            isAuthenticated: true,
            user: response.data.user
          }
        })
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: SET_AUTH,
        payload: {
          isAuthenticated: false,
          user: null
        }
      })
    }
  }
  // register User
  const registerUser = async signupUser => {
    try {
      const response = await axios.post(`${baseUrl}/auth/signup`, signupUser);
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data
      }
      return {
        success: false,
        message: error.message
      }
    }
  }
  // lifecyfle
  useEffect(() => {
    loadUser();
  }, [])

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, userForm);
      const { data: {success, accessToken} } = response;
      if (success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, accessToken);
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      }
      return { success: false, error: error.message };
    }
  }

  // logout user
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    dispatch({
      type: SET_AUTH,
      payload: {
        isAuthenticated: false,
        user: null
      }
    })
  }
  // context data
  const authContextData = { loginUser, authState, registerUser, logoutUser };

  // return
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
}
