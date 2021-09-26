import BaseService from './BaseService';

class UserService extends BaseService {
  constructor() {
    super('/user');
  }

  getUserDetails() {
    return this.request({
      method: 'GET',
      url: `${this.url}/info`,
    })
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  getUserPayoutMethod() {
    return this.request({
      method: 'GET',
      url: `${this.url}/payout`,
    })
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  updateUserPayout({ payoutMethod, payoutUsername }) {
    return this.request({
      method: 'POST',
      url: `${this.url}/payout`,
      data: { name: payoutMethod, payoutUsername },
    })
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  addOrg({ orgName }) {
    return this.request({
      method: 'POST',
      url: `${this.url}/organization`,
      data: { orgName },
    })
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  getUserEvents() {
    return this.request({
      method: 'GET',
      url: `${this.url}/events`,
    })
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  registerEvent({ eventId }) {
    return this.request({
      method: 'POST',
      url: `${this.url}/events/register`,
      data: { eventId },
    })
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  uploadAvatar({ fromData, mock }) {
    return this.request({
      method: 'POST',
      mock: mock, // TODO: remove this
      url: `${this.url}/upload-avatar`,
      data: fromData,
    })
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }
}

const userService = new UserService();
export default userService;
