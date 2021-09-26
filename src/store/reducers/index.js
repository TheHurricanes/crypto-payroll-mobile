import initialState from './initialState';
import session from './sessionReducers';
import events from './eventReducers';
import appSettings from './appSettingsReducers';
import user from './userReducers';
import organizationReducers from './organizationReducers';
import * as types from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case types.LOGOUT:
      return {
        session: initialState.session,
        user: initialState.user,
        appSettings: appSettings(state.appSettings, action),
        events: initialState.events,
        org: initialState.org,
      };

    default:
      return {
        session: session(state.session, action),
        user: user(state.user, action),
        appSettings: appSettings(state.appSettings, action),
        events: events(state.events, action),
        org: organizationReducers(state.org, action),
      };
  }
};

export { initialState };
