let db = require('..');
let { url , authHeader} = require('../index');

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
describe('Probamos la fiabilidad de el login : ', ()=>{
  
  it('Solicitamos una peticion sin la cabecera de autenticacion :', (done)=>{
    chai.request(url)
    .get('/Login')
    .end( function(err , res){
      expect(res).to.have.status(401); // 401 (Unauthorized)
      expect(res).to.be.json;
      done();
    }); // end end 
  });

  it('Solicitamos una peticion con la cabecera mal formada :', (done)=>{
    chai.request(url)
    .get('/Login')
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
    .get('/Login')
    .set({
      authorization : "Basic "+Buffer.from('MrPatata@yahoo.es:MrPatata@yahoo.es').toString('base64')
    })
    .end( function(err , res){
      expect(res).to.have.status(401); // 401 (Unauthorized)
      expect(res).to.be.json;
      done();
    });
  });

});