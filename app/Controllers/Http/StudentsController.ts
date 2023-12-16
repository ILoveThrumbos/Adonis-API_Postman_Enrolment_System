import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import StudentValidator from 'App/Validators/StudentValidator'

export default class StudentsController {
public async index({}: HttpContextContract) {
const students = await Student.all()

return students
}

public async store({ request, response }: HttpContextContract) {
    const newStudentSchema = schema.create({
      firstName: schema.string({}, [rules.maxLength(32)]),
      lastName: schema.string({}, [rules.maxLength(32)]),
      email: schema.string({}, [rules.email()]),
    })

    try {
      const payload = await request.validate({
        schema: newStudentSchema,
      })

      const existingStudent = await Student.findBy('email', payload.email)

      if (existingStudent) {
        return response.badRequest({ error: 'Student already exists' })
      }

      const student = new Student()
      student.first_name = payload.firstName
      student.last_name = payload.lastName
      student.email = payload.email

      await student.save()

      return response.created(student)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }



public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    try {
      const student = await Student.findOrFail(id);
      return response.ok(student);
    } catch (error) {
      return response.notFound({message: 'Student ID does not exist'})
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const id = params.id
    const student = await Student.find(id)

    if (!student) {
      return response.notFound({ message: 'Student not found!' })
    }

    if (request.method() === 'PATCH') {
      student.first_name = request.input('firstName')
      student.last_name = request.input('lastName')
      student.email = request.input('email')

      await student.save()
      return response.ok(student)
    }

    if (request.method() === 'PUT') {
      try {
        const payload = await request.validate(StudentValidator)
        student.merge(payload)
        await student.save()
        return response.ok(student)
      } catch (error) {
        return response.badRequest(error.messages)
      }
    }
  }

public async destroy({params, response}: HttpContextContract) {
const id = params.id;
const student = await Student.find(id);

if (!student) {
  return response.notFound({message: 'Student not found!'});
}

await student.delete();

return response.ok({
  message: `Student ${id}:${student.first_name} ${student.last_name} was deleted successfully.`
});
}

}