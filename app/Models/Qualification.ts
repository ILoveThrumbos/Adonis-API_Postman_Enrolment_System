import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Qualification extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'QualCode' })
  public QualCode: String

  @column({ columnName: 'NationalQualCode' })
  public NationalQualCode: String

  @column({ columnName: 'TafeQualCode' })
  public TafeQualCode: String

  @column({ columnName: 'QualName' })
  public QualName: String

  @column({ columnName: 'TotalUnits' })
  public TotalUnits: number

  @column({ columnName: 'CoreUnits' })
  public CoreUnits: number

  @column({ columnName: 'ElectedUnits' })
  public ElectedUnits: number

  @column({ columnName: 'ReqListedElectedUnits' })
  public ReqListedElectedUnits: number



  

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}
