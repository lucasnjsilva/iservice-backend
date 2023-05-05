import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'forgot_passwords';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary();
      table.string('customer_id').nullable();
      table.string('provider_id').nullable();
      table.string('status').notNullable();
      table.string('token', 64).notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('expires_at', { useTz: true });
      table.timestamp('created_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
