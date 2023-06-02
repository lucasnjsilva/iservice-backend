import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'providers';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('about_me').nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('about_me');
    });
  }
}
