//import { Response } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Qualification from 'App/Models/Qualification'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import QualificationValidator from 'App/Validators/QualificationValidator'

export default class QualificationsController {
  public async index({}: HttpContextContract) {
    //return { hello: "Minh says Hello"}
    const quals = await Qualification.all()

    return quals
  }
  

  public async store({request, response}: HttpContextContract) {
    const newQualSchema = schema.create({
      QualCode: schema.string({}, [rules.maxLength(32)]),
      NationalQualCode: schema.string({}, [rules.maxLength(32)]),
      TafeQualCode: schema.string({}, [rules.maxLength(32)]),
      QualName: schema.string({}, [rules.maxLength(32)]),
      TotalUnits: schema.number(),
      CoreUnits: schema.number(),
      ElectedUnits: schema.number(),
      ReqListedElectedUnits: schema.number(),  

  })
  try{
    const payload = await request.validate({
      schema: newQualSchema
    })
    const qual: Qualification = await Qualification.create(payload)
    return response.ok(qual)
  }catch(error){
    response.badRequest(error.messages)
  }
}

  public async show({params, response}: HttpContextContract) {
    const qual = await Qualification.find(params.id)

    return response.ok(qual)
  }

  public async update({params, request, response}: HttpContextContract) {
    const id = params.id
    const qual = await Qualification.find(id)

    if (!qual){
      return response.notFound({message: 'Qualification not found!'})
    }

    if(request.method() == 'PATCH'){
      qual.QualCode = request.input('QualCode')
      qual.NationalQualCode = request.input('NationalQualCode')
      qual.TafeQualCode = request.input('TafeQualCode')
      qual.TotalUnits = request.input('TotalUnits')
      qual.CoreUnits = request.input('CoreUnits')
      qual.ElectedUnits = request.input('ElectedUnits')
      qual.ReqListedElectedUnits = request.input('ReqListedElectedUnits')

      await qual.save()
      return response.ok(qual)
      
    }

    if(request.method() == 'PUT'){
      const payload = await request.validate(QualificationValidator)
      qual.merge(payload)
      await qual.save()
      return response.ok(qual)
    }

    
  }

  public async destroy({params, response}: HttpContextContract) {
    const id = params.id;
    const qual = await Qualification.find(id);
  
    if (!qual) {
      return response.notFound({message: 'Qualification not found!'});
    }
  
    await qual.delete();
  
    return response.ok({
      message: `Qualification ${id}:${qual.QualName} was deleted successfully.`
    });
  }
  
}
