import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Customer from 'App/Models/Customer';

export default class extends BaseSeeder {
  public async run() {
    await Customer.createMany([
      {
        name: 'Lucas Nathan',
        email: 'lucasnathanj@gmail.com',
        password: 'senha123',
        cpf: '833.148.580-78',
        phone: '(95) 98789-4887',
      },
    ]);
  }
}
