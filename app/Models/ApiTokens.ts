import { DateTime } from 'luxon';
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm';

export default class ApiTokens extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public token: string;

  @column()
  public name: string;

  @column()
  public type: string;

  @column()
  public customer_id: string;

  @column()
  public provider_id: string;

  @column()
  public admin_id: string;

  @column.dateTime()
  public expiresAt: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;
}
