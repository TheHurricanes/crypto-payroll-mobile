/* eslint-disable no-console */
import axios from 'axios';
import get from 'lodash/get';
import { API_URLS } from 'react-native-dotenv';
import BaseServiceHelper from './BaseServiceHelper';
import ExtraRequestsService from './ExtraRequestService';
import LocalStorage from '../../utils/localStorage';
import { LOCAL_STORAGE_KEYS } from '../../utils/constants';
import Logger from '../../utils/logger';

const logger = Logger.get("BaseService.js");
const authTokenKey = LOCAL_STORAGE_KEYS.AUTH_TOKEN;
let refreshingAuthToken = false;

export default class BaseService {
  // url = API_URLS;
  url = 'https://popquizapi.hostrivia.com'
  constructor(urlPrefix) {
    this.url += urlPrefix;
  }
  static url() {
    return 'http://192.168.0.24:4000';
  }

  static async deleteSession() {
    try {
      await LocalStorage.removeItem(authTokenKey);
      await LocalStorage.removeSecureUserCredentials();
    } catch (error) {
      throw error;
    }
  }

  static async refreshToken(credentials) {
    try { 
      const res = await ExtraRequestsService.Login(credentials.username, credentials.password);
      const { data } = res;
      try {
        if (!data.token) {
          logger.info(
            'We could not get the user token after successful relogin in BaseService',
          );
          return BaseService._setLogoutState();
        }

        await BaseService.saveSession({ expiration: data.expires, token: data.token, ...credentials });
      } catch (error) {
        logger.error(
          `An error happened saving the auth token in local storage: ${error}`,
        );
      }

      refreshingAuthToken = false;
      return true;
    } catch (error) {      
      BaseService._setLogoutState();
      throw error;
    }
  }

  static async saveSession({ token, expiration = 0, username, password}) {
    if (!token) {
      const error = 'token is undefined';
      logger.error(error);
      return Promise.reject(error);
    }

    const saveSecureUserCredentialsPromise =
      LocalStorage.saveSecureCredentials(username, password);

    try {
      const timeInMiliSec = (+expiration * 1000);
      await Promise.all([
        LocalStorage.setItem(authTokenKey, {
          token,
          expiration: +expiration === 0 ? null : (new Date().getTime() + timeInMiliSec),
        }),
        //we need the save user credentials to relogin the user once auth token expires.
        saveSecureUserCredentialsPromise,
      ]);
    } catch (error) {
      console.warn(`An error happened saving the auth token in local storage: ${error}`);
      throw error;
    }

    return Promise.resolve();
  }

  /**
   * @static request - Base request method for services.
   * @see https://github.com/axios/axios
   * @param  {Object}  options = {} Request options
   * @return {Promise}              Promise
  */
  async request(options = {}, callFromInside = false) {
    if (options && options.mock) {
      return Promise.resolve(options.mock || {});
    }

    const headers = get(options, 'headers', {});
    if (!options.noAuth && !headers.authorization && !headers.Authorization) {
      let authToken;
      let isTokenExpired = false;

      // get token from async storage
      try {
        authToken = await LocalStorage.getItem(authTokenKey);
        isTokenExpired =
        !authToken || (authToken.expiration === null || new Date().getTime() > authToken.expiration);
      } catch (error) {
        logger.error(
        `Error happened trying to get auth token from local storage in BaseService: ${error}`,
        );
        return Promise.reject(error);
      }

      if (!authToken.token) {
        logger.info('AUTH_TOKEN came undefined in service', authToken);
      }

      if (!isTokenExpired) {
        headers['Authorization'] = `Bearer ${authToken.token}`;
      } else {
        // To keep native logged in calling a service to refresh token
        if (!refreshingAuthToken) {
          refreshingAuthToken = true;
          let credentials;

          try {
            credentials = await LocalStorage.getSecureUserCredentials();
          } catch (error) {
            logger.error(
              `Error happened trying to get user credentials from secure storage: ${error}`,
            );
          }

          if (!credentials || (credentials && !credentials.username && !credentials.password)) {
            refreshingAuthToken = false;
            BaseServiceHelper.setLogoutState();
            return Promise.reject(
              'We could not get user credentials from secure storage',
            );
          }

          //trying to get new auth token.
          if (!callFromInside) {
            await BaseService.refreshToken(credentials)
            return this.request(options, true);
          }
        }
      }

      options.headers = headers;
    }

    return axios
      .request(options)
      .then((res) => Promise.resolve(res.data))
      .catch((error) => {
        const responseData = get(error, 'response.data', '');
        const status = get(error, 'response.status', '');
        const resolveOnError =
          options.resolveOnError &&
          options.resolveOnError.find((error) => error.status === status);

        if (resolveOnError) {
          const res =
            resolveOnError.response === void 0
              ? JSON.parse(responseData)
              : resolveOnError.response;
          return Promise.resolve(res);
        }

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          logger.info('static request1', error.response.data);
          logger.info('static request2', error.response.status);
          logger.info('static request3', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          logger.info('static request4', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          logger.info('static request Error5', error.message);
        }
        logger.info('static request6', error.config);

        return Promise.reject(error);
      });
  }

  static _setLogoutState() {
    refreshingAuthToken = false;
    BaseServiceHelper.setLogoutState();
    return false;
  }
}
