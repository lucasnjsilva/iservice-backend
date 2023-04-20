import Customer from 'App/Models/Customer';
import Provider from 'App/Models/Provider';

export default class AccessControllService {
  static async customerPermission(user: Customer | Provider) {
    try {
      if (user instanceof Customer) {
        return true;
      }

      if (user instanceof Provider) {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  static async providerPermission(user: Customer | Provider) {
    try {
      if (user instanceof Customer) {
        return false;
      }

      if (user instanceof Provider) {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }
}
