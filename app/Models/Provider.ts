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
  public cnpj: string;

  @column()
  public phone: string;

  @column()
  public profileImage: string;

  @column()
  public rememberMeToken: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime()
  public deletedAt: DateTime | null;

  @beforeCreate()
  public static async createUUID(provider: Provider) {
    provider.id = uuidv4();
  }

  @beforeSave()
  public static async hashPassword(provider: Provider) {
    if (provider.$dirty.password) {
      provider.password = await Hash.make(provider.password);
    }
  }

  @beforeSave()
  public static async cleanData(provider: Provider) {
    provider.phone = provider.phone.trim().replace(/[^0-9 ]|\s/g, '');
    provider.cnpj = provider.cnpj.trim().replace(/[^0-9 ]/g, '');
  }
}
