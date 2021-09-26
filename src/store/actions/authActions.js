import * as types from './types';
import AuthService from '../services/AuthServices';
import BaseService from '../services/BaseService';

export default {
  login: ({ username, password }) => {
    return async (dispatch) => {
      try {
        console.log(username, password)
        const res = await AuthService.login({ username, password });
        await BaseService.saveSession({ 
          expiration: res.expires, 
          token: res.token, 
          username, 
          password 
        });
        dispatch({ type: types.LOGIN });
        return Promise.resolve(res);
      } catch (error) {
        dispatch({ type: types.LOGIN_FAILED });
        throw error;
      }
    };
  },
  signup: ({ name, username, password }) => {
    return async (dispatch) => {
      try {
        const res = await AuthService.signup({ name, username, password });
        await BaseService.saveSession({ 
          expiration: res.expires, 
          token: res.token, 
          username, 
          password 
        });
        dispatch({ type: types.SIGNUP });
        return Promise.resolve(res);

      } catch (error) {
        dispatch({ type: types.SIGNUP_FAILED });
        throw error;
      }
    };
  },
  logout: () => {
    return async (dispatch) => {
      try {
        const res = await AuthService.logout();
        dispatch({ type: types.LOGOUT });
        await BaseService.deleteSession();
        return Promise.resolve(res);
      } catch (error) {
        dispatch({ type: types.LOGOUT_FAILED });
        throw error
      }
    };
  },
  setUserAsUnauthenticated: () => {
    return (dispatch) => {
      dispatch({ type: types.USER_NO_AUTH });
    }
  },
  setUserAsAuthenticated: () => {
    return (dispatch) => {
      dispatch({ type: types.USER_AUTH });
    }
  },
};
