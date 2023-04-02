import type Customer from 'App/Models/Customer';
import type Provider from 'App/Models/Provider';

declare module '@ioc:Adonis/Addons/Auth' {
  interface ProvidersList {
    customer: {
      implementation: LucidProviderContract<typeof Customer>;
      config: LucidProviderConfig<typeof Customer>;
    };

    provider: {
      implementation: LucidProviderContract<typeof Provider>;
      config: LucidProviderConfig<typeof Provider>;
    };
  }

  interface GuardsList {
    customer: {
      implementation: BasicAuthGuardContract<'customer', 'customer'>;
      config: BasicAuthGuardConfig<'customer'>;
      client: BasicAuthClientContract<'customer'>;
    };

    provider: {
      implementation: BasicAuthGuardContract<'provider', 'provider'>;
      config: BasicAuthGuardConfig<'provider'>;
      client: BasicAuthClientContract<'provider'>;
    };
  }
}
