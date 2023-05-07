import type { AuthConfig } from '@ioc:Adonis/Addons/Auth';

const authConfig: AuthConfig = {
  guard: 'customer',
  guards: {
    customer: {
      driver: 'oat',
      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'api_tokens',
        foreignKey: 'customer_id',
      },

      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: async () => await import('App/Models/Customer'),
      },
    },

    provider: {
      driver: 'oat',
      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'api_tokens',
        foreignKey: 'provider_id',
      },

      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: async () => await import('App/Models/Provider'),
      },
    },

    admin: {
      driver: 'oat',
      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'api_tokens',
        foreignKey: 'admin_id',
      },

      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['email'],
        model: async () => await import('App/Models/Admin'),
      },
    },
  },
};

export default authConfig;
