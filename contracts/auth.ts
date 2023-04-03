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
      implementation: OATGuardContract<'customer', 'customer'>;
      config: OATGuardConfig<'customer'>;
      client: OATClientContract<'customer'>;
    };

    provider: {
      implementation: OATGuardContract<'provider', 'provider'>;
      config: OATGuardConfig<'provider'>;
      client: OATClientContract<'provider'>;
    };
  }
}
