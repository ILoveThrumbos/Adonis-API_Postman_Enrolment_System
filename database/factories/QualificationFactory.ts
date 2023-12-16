import QualificationFactory from 'App/Models/Qualification'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(QualificationFactory, ({ faker }) => {
  return {
    QualCode: faker.lorem.word(),
    NationalQualCode: faker.lorem.word(),
    TafeQualCode: faker.lorem.word(),
    QualName: faker.lorem.words(4),
    TotalUnits: 20,
    CoreUnits: 10,
    ElectedUnits: 7,
    ReqListedElectedUnits: 3



  }
}).build()
