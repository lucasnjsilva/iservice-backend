import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Admin from 'App/Models/Admin';

export default class extends BaseSeeder {
  public async run() {
    await Admin.createMany([
      {
        name: 'Lucas Nathan',
        email: 'lucasnathanj@gmail.com',
        password: 'senha123',
        phone: '(95) 98789-4887',
      },
    ]);
  }
}
