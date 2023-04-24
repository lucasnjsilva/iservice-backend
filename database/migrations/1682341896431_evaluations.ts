import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'evaluations';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary();
      table.text('comment').nullable();
      table.integer('vote').notNullable();
      table.string('attendance_id').notNullable();

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
