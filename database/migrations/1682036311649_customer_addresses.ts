import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'customer_addresses';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary();
      table.string('address').notNullable();
      table.string('number').nullable();
      table.string('neighborhood').notNullable();
      table.string('complement').nullable();
      table.string('reference').nullable();
      table.string('city').notNullable();
      table.string('uf').notNullable();
      table.string('cep').notNullable();
      table.string('customer_id').notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
      table.timestamp('deleted_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
