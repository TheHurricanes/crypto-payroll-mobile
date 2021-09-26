import * as types from './types';
import organizationService from '../services/OrganizationService';

export default {
  getContractors({ orgId }) {
    return (dispatch) => organizationService.getContractors({ orgId })
      .then((res) => dispatch({ type: types.GET_ORGANIZATION_CONTRACTORS, contractors: res }))
      .catch((err) => {
        dispatch({ type: types.GET_ORGANIZATION_CONTRACTORS_FAILED });
        throw err;
      });
  },
  getOrgInfo() {
    return (dispatch) => organizationService.getOrgInfo()
      .then((res) => dispatch({ type: types.GET_ORGANIZATION_DETAIL, name: res.name }))
      .catch((err) => {
        dispatch({ type: types.GET_ORGANIZATION_DETAIL_FAILED });
        throw err;
      });
  },
};
