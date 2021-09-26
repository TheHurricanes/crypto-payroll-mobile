import { getThemeColors } from '../../styles';

/* TODO: Remove mock data */
import paymentsMock from '../mock/payments';

const defaultTheme = 'light';

export default {
  appSettings: {
    status: {
      socket: false,
    },
    socket: {
      connectionToken: '',
    },
    language: 'en',
    theme: defaultTheme,
    colors: getThemeColors(defaultTheme),
    currency: 'USD',
    isLoading: false,
    payoutMethods: paymentsMock, // [],
    payments: [],
    showLoginPage: false,
  },
  session: {
    isUserLoggedIn: false,
  },
  user: {
    avatar: 'https://api.adorable.io/avatars/random',
    name: '',
    userTypes: '',
    username: 'anonymous',
    phone: '',
    email: '',
    eventsMap: [],
    earnings: [],
    paymentMethods: [],
    payout: null,
  },
  org: {
    name: '',
    contractors: [],
  },
  events: {
    eventsMap: {},
    liveEvents: {},
  },
};
