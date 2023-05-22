import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Category from 'App/Models/Category';

export default class extends BaseSeeder {
  public async run() {
    await Category.createMany([
      { name: 'Pedreiro' },
      { name: 'Eletricista' },
      { name: 'Encanador' },
      { name: 'Pintor' },
      { name: 'Técnico de Informática' },
      { name: 'Diarista' },
      { name: 'Massagista' },
      { name: 'Personal Trainer' },
      { name: 'Nutricionista' },
      { name: 'Fotógrafo' },
      { name: 'Cozinheiro' },
    ]);
  }
}
