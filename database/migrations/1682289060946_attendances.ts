import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'attendances';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index().primary();
      table.string('service_id').notNullable();
      table.string('customer_id').notNullable();
      table.date('solicitation_date').notNullable();
      table.date('attendance_date').notNullable();
      table.string('status').notNullable();

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
