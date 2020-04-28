let db = require('./test_utils');
let { url , authHeader} = require('./test_utils');

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
describe('Probamos la fiabilidad de el login : ', ()=>{

  before(db.connectDB);
  after(db.closeConexionWithDB);
  
  it('Solicitamos una peticion sin la cabecera de autenticacion :', (done)=>{
    chai.request(url)
    .get('/checkLogin')
    .end( function(err , res){
      expect(res).to.have.status(401); // 401 (Unauthorized)
      expect(res).to.be.json;
      done();
    }); // end end 
  });

  it('Solicitamos una peticion con la cabecera mal formada :', (done)=>{
    chai.request(url)
    .get('/checkLogin')
    .set({
      authorization : "Vasic "+Buffer.from('MrPatata@yahoo.es:MrPatata@yahoo.es').toString('base64')
    })
    .end( function(err , res){
      expect(res).to.have.status(401); // 401 (Unauthorized)
      expect(res).to.be.json;
      done();
    });
  });

  it('Solicitamos una peticion con un usuario sin registrar:', (done)=>{
    chai.request(url)
    .get('/checkLogin')
    .set({
      authorization : "Basic "+Buffer.from('MrPatata@yahoo.es:MrPatata@yahoo.es').toString('base64')
    })
    .end( function(err , res){
      expect(res).to.have.status(400); // 400 (Bad Request)
      expect(res).to.be.json;
      done();
    });
  });

  it('Solicitamos una peticion con un usuario registrado:', (done)=>{
    chai.request(url)
    .get('/checkLogin')
    .set(authHeader)
    .end( function(err , res){
      expect(res).to.have.status(200); // 200 (OK)
      expect(res).to.be.json;
      done();
    });
  });

});