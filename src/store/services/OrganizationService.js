import BaseService from './BaseService';

class OrganizationService extends BaseService {
  constructor() {
    super('/org');
  }

  getContractors({ orgId }) {
    return this.request({
      method: 'GET',
      url: `${this.url}/${orgId}/contractors`,
    }).then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  getOrgInfo({ orgId }) {
    return this.request({
      method: 'GET',
      url: `${this.url}/${orgId}`,
    }).then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  addAContractor(orgId, data) {
    const {
      name,
      username,
      email,
    } = data;

    return this.request({
      method: 'POST',
      url: `${this.url}/${orgId}/contractors`,
      data: {
        name,
        username,
        email,
      },
    }).then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }
}

const organizationService = new OrganizationService();
export default organizationService;
