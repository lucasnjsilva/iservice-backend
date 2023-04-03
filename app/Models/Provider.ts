import { DateTime } from 'luxon';
import { BaseModel, beforeCreate, beforeSave, column } from '@ioc:Adonis/Lucid/Orm';
import Hash from '@ioc:Adonis/Core/Hash';
import { v4 as uuidv4 } from 'uuid';

export default class Provider extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public name: string;

  @column()
  public phone: string;

  @column()
  public rememberMeToken: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime()
  public deletedAt: DateTime;

  @beforeCreate()
  public static async createUUID(provider: Provider) {
    provider.id = uuidv4();
  }

  @beforeSave()
  public static async hashPassword(customer: Provider) {
    if (customer.$dirty.password) {
      customer.password = await Hash.make(customer.password);
    }
  }
}
