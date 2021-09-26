import * as types from '../actions/types';
import initialState from './initialState';

function appSettingsReducer(state = initialState.org, action) {
  switch (action.type) {
    case types.GET_ORGANIZATION_CONTRACTORS:
      return { ...state, contractors: action.contractors };
    case types.GET_ORGANIZATION_DETAIL:
      return { ...state, name: action.name };

    case types.GET_ORGANIZATION_DETAIL_FAILED:
    case types.GET_ORGANIZATION_CONTRACTORS_FAILED:
      return state;

    default:
      return state;
  }
}

export default appSettingsReducer;
