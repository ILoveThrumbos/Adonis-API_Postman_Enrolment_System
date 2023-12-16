/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

//import Student from 'App/Models/Student'
//import QualificationsController from 'App/Controllers/Http/QualificationsController'
//import StudentController from 'App/Controllers/Http/StudentsController'
import Route from '@ioc:Adonis/Core/Route'
import QualificationFactory from 'Database/factories/QualificationFactory'



/*
Methods to GET Qualifications and Students.
Route.get('/', 'StudentsController.index')
Route.get('/api/v1/qualifications', 'QualificationsController.index')
*/


/*
Postman:
Group action with API and middleware.
Routes handling user login, registration, and CRUD operations on students and qualifications.
*/
Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('register', 'AuthController.register')

  Route.group(() => {
    Route.get('student', 'StudentsController.index');
    Route.get('student/:id', 'StudentsController.show')
    Route.post('student', 'StudentsController.store')
    Route.put('student/:id', 'StudentsController.update')
    Route.patch('student/:id', 'StudentsController.update')
    Route.delete('student/:id', 'StudentsController.destroy')

    Route.get('create-quals', async () => {
      await QualificationFactory.createMany(10)
    })

    Route.resource('qualifications', 'QualificationsController').apiOnly()
  }).middleware('auth:api')
}).prefix('/api/v1')



/*
Find student method with try and catch:
Route.get('/api/v1/students/:id', async ({ params, response }) => {
    const { id } = params;

    try {
      const student = await Student.findOrFail(id);
      return student;
    } catch (error) {
      return response.status(404).json({ error: 'Student not found' });
    }
  });
*/

/*
Student methods:
1)GET Method index
Route.get('/', 'StudentsController.index')
http://127.0.0.1:3333
2) GET method
Route.get('/students/:id', 'StudentsController.show')
http://127.0.0.1:3333/students/2
3) POST method
Route.post('/students', 'StudentsController.store');
http://127.0.0.1:3333/students/1
4) PUT method
Route.put('/students/:id', 'StudentsController.update')
http://127.0.0.1:3333/students/1
5) DELETE method
Route.delete('/students/:id', 'StudentsController.destroy')
http://127.0.0.1:3333/students/1
*/

/*
Delete Student method:
Route.delete('/students/:id', 'StudentsController.destroy')
*/
