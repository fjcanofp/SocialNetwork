/**
 * Importamos utilidades
 */
let db = require('..');
let { url , authHeader } = require('../index');

let user = {
  "_id": "5ea871d77011282504d50000",
  "name": "sujeto de pruebas",
  "email": "sujeto@supertest.com",
  "login": "sujeto@supertest.com",
  "password": "sujeto@supertest.com",
}

let user_token = { 
  "Authorization": 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InN1amV0b0BzdXBlcnRlc3QuY29tIiwiaWQiOiI1ZWE4NzFkNzcwMTEyODI1MDRkNTAwMDAiLCJpYXQiOjE1ODgxODAyNDd9.aS4vsS4sAIBUICpUijMHcKzO-xbSpjlp8GmwR7GWY9Y'
}
/* Primero requerimos los paquetes necesarios: */
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

/*  Tenemos que decirle a Chai que utilice la librería de Chai HTTP
 y definimos la url donde vamos a lanz0ar las llamadas a la API. */
chai.use(chaiHttp);

/*  Describe: Se usa para encapsular tests y dar una descripcion general 
 de este grupo de tests */
describe('Prueba la api rest de usuarios: ', () => {

  /**
   * La función it, que es donde vamos a explicar lo que queremos que haga el test.
   */
  it('[POST /register] Registramos un usuario :', (done) => {

    /* Definimos la peticion http */
    chai.request(url)
      .post('/register')
      .send(user)
      .end(function (err, res) {

        expect(res).to.have.status(201); // 201 (Created)
        done();

      }); // end end 

  }); //end it

  it("[POST /register] Registramos sin nada en el body :", (done) => {
    chai.request(url)
      .post('/register')
      .send({})
      .end((error, res) => {
        expect(res).to.have.status(400) // 400 Bad Request
        done();
      });
  });

  it("[GET /User/:id] Buscar un usuario :", (done) => {
    chai.request(url)
      .get('/user/' + user._id)
      .set(authHeader)
      .end((error, res) => {
        expect(res).to.have.status(200) // 200 Acepted
        expect(res.body).to.have.property('_id').to.be.equal(user._id.toString());
        done();
      });
  });
  
  it("[PUT /USER/:ID ] Intentamos modificar un usuario distinto al nuestro :", (done) => {
    chai.request(url)
      .put('/user/' + user._id)
      .set(authHeader)
      .send({
        _id: user._id,
        name: user.name + "Modified",
        email: user.email,
        login: user.login,
        password: user.password
      })
      .end((error, res) => {
        expect(res).to.have.status(401) // 401 Unauthorized
        done();
      })
  })

  it("[DELETE /USER/:ID] Eliminar un usuario, debe fallar , solo puede darse de baja a si mismo:", (done) => {
    chai.request(url)
      .delete('/user/' + user._id)
      .set(authHeader)
      .end((error, res) => {
        expect(res).to.have.status(400) // 400 Bad Request
        done();
      })
  })

  it("[DELETE /USER/:ID] Eliminar un usuario :", (done) => {
    chai.request(url)
      .delete('/user/' + user._id)
      .set(user_token)
      .end((error, res) => {
        expect(res).to.have.status(200) // 200 ok
        done();
      })
  })

}); //end describe