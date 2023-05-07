import { DateTime } from 'luxon';
import {
  BaseModel,
  BelongsTo,
  beforeCreate,
  belongsTo,
  column,
} from '@ioc:Adonis/Lucid/Orm';
import Provider from './Provider';
import { v4 as uuidv4 } from 'uuid';
import Category from './Category';

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public categoryId: string;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;

  @column()
  public cost: number;

  @column()
  public providerId: string;

  @belongsTo(() => Provider)
  public provider: BelongsTo<typeof Provider>;

  @column.dateTime({ serializeAs: null, autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ serializeAs: null, autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime | null;

  @beforeCreate()
  public static async createUUID(service: Service) {
    service.id = uuidv4();
  }
}
