import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Customer from './Customer';

export default class CustomerAddress extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public address: string;

  @column()
  public number: string;

  @column()
  public neighborhood: string;

  @column()
  public complement: string;

  @column()
  public reference: string;

  @column()
  public city: string;

  @column()
  public uf: string;

  @column()
  public cep: string;

  @column()
  public customerId: string;

  @belongsTo(() => Customer)
  public customer: BelongsTo<typeof Customer>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null;
}
