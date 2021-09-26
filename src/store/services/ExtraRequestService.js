import axios from 'axios';
import {
  API_URL,
} from 'react-native-dotenv';
import BaseServiceHelper from './BaseServiceHelper';
import Logger from '../../utils/logger';

const logger = Logger.get("BaseServiceHelper.js");


export default class ExtraRequestsService {

  static Login(username, password) {

    if (!username || !password) {
      logger.info('Error while trying to Login, some properties where undefined (extra-request-service.js)');
    }

    const options = {
      url: `${API_URL}/auth/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      data: {
        username,
        password,
      },
    };

    return axios.request(options)
      .catch(error => {
        BaseServiceHelper.printToConsoleErrorMessages(error);
        return Promise.reject(error);
      });
  }
}