import type { AuthConfig } from '@ioc:Adonis/Addons/Auth';

const authConfig: AuthConfig = {
  guard: 'customer',
  guards: {
    customer: {
      driver: 'basic',
      realm: 'Login',
      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: async () => await import('App/Models/Customer'),
      },
    },

    provider: {
      driver: 'basic',
      realm: 'Login',
      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: async () => await import('App/Models/Provider'),
      },
    },
  },
};

export default authConfig;
