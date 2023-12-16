import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'first_name' })
  public first_name: String

  @column({ columnName: 'last_name' })
  public last_name: String

  @column({ columnName: 'email' })
  public email: String



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
