import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Provider from 'App/Models/Provider';

export default class extends BaseSeeder {
  public async run() {
    await Provider.createMany([
      {
        name: 'Lucas Nathan',
        email: 'lucasnathanj@hotmail.com',
        password: 'senha123',
        cnpj: '30.627.230/0001-46',
        phone: '(95) 98789-4887',
      },
    ]);
  }
}
