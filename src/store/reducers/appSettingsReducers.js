import * as types from '../actions/types';
import initialState from './initialState';

function appSettingsReducer(state = initialState.appSettings, action) {
  switch (action.type) {
    case types.CHANGE_LANGUAGE:
      return { ...state, language: action.language };

    case types.GET_PAYOUT_METHODS:
      return { ...state, payoutMethods: action.payoutMethods };

    case types.SOCKET_CONNECTED: {
      return {
        ...state,
        status: {
          ...state.status,
          socket: true,
        },
      };
    }

    case types.SOCKET_DISCONNECTED: {
      return {
        ...state,
        status: {
          ...state.status,
          socket: false,
        },
      };
    }

    case types.FETCH_SOCKET_CONNECTION_TOKEN: {
      return {
        ...state,
        socket: {
          ...state.socket,
          connectionToken: action.token,
        },
      };
    }

    case types.FETCH_SOCKET_CONNECTION_TOKEN_FAILED: {
      return { ...state, socket: { ...state.socket } };
    }

    case types.THEME_CHANGED: {
      return {
        ...state,
        theme: action.theme,
        colors: action.colors,
      };
    }

    case types.GET_PAYMENTS: {
      return {
        ...state,
        payments: [
          ...action.payments,
        ],
      };
    }

    case types.GET_PAYMENTS_FAILED: {
      return state;
    }

    case types.SHOW_LOGIN_PAGE: {
      return { ...state, showLoginPage: true };
    }

    case types.HIDE_LOGIN_PAGE: {
      return { ...state, showLoginPage: false };
    }

    default:
      return state;
  }
}

export default appSettingsReducer;
