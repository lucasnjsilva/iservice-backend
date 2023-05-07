import { DateTime } from 'luxon';
import { BaseModel, beforeCreate, beforeSave, column } from '@ioc:Adonis/Lucid/Orm';
import Hash from '@ioc:Adonis/Core/Hash';
import { v4 as uuidv4 } from 'uuid';

export default class Admin extends BaseModel {
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

  @column({ serializeAs: null })
  public rememberMeToken: string | null;

  @column.dateTime({ serializeAs: null, autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ serializeAs: null, autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null;

  @beforeCreate()
  public static async createUUID(admin: Admin) {
    admin.id = uuidv4();
  }

  @beforeSave()
  public static async hashPassword(admin: Admin) {
    if (admin.$dirty.password) {
      admin.password = await Hash.make(admin.password);
    }
  }

  @beforeSave()
  public static async cleanData(admin: Admin) {
    admin.phone = admin.phone.trim().replace(/[^0-9 ]|\s/g, '');
  }
}
