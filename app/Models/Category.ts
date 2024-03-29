import { DateTime } from 'luxon';
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm';
import { v4 as uuidv4 } from 'uuid';

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column.dateTime({ serializeAs: null, autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ serializeAs: null, autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null;

  @beforeCreate()
  public static async createUUID(category: Category) {
    category.id = uuidv4();
  }
}
