/**
 * Importamos utilidades
 */
let db = require('./test_utils');
let { url , authHeader , user } = require('./test_utils');

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

  before(db.connectDB); // Se ejecuta una vez antes de empezar las test
  after(db.closeConexionWithDB); // Se ejecuta una vez despues de empezar los test

  /**
   * La función it, que es donde vamos a explicar lo que queremos que haga el test.
   */
  it('[POST /user] Registramos un usuario :', (done) => {

    /* Definimos la peticion http */
    chai.request(url)
      .post('/security/register')
      .set(authHeader) //Colocamos los datos en la cabecera de la peticion
      .send({
        name: "test_user",
        email: "test@supertest.com",
        login: "test@supertest.com",
        password: "test@supertest.com"
      })
      .end(function (err, res) {

        expect(res).to.have.status(201); // 201 (Created)
        done();

      }); // end end 

  }); //end it

  it("[POST /user] Registramos sin nada en el body :", (done) => {
    chai.request(url)
      .post('/security/register')
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
  
  it("[PUT /USER/:ID ] Modificamos un usuario :", (done) => {
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
        expect(res).to.have.status(200) // 200 ok
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

}); //end describe