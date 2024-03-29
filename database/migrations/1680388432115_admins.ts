import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'admins';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      /**
       * Default
       */
      table.uuid('id').index().primary();
      table.string('email', 255).notNullable().unique();
      table.string('password', 180).notNullable();
      table.string('remember_me_token').nullable();

      /**
       * Others
       */
      table.string('name').notNullable();
      table.string('phone').nullable();

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
      table.timestamp('deleted_at', { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
