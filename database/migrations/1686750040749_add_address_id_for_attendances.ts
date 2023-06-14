import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'attendances';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('address_id').notNullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('address_id');
    });
  }
}
