let { db , url , authHeader} = require('../index');

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

let post = {
    _id : "5ea871d77011282504d50000",
    title : "Mocha  & Chai Test"
}

chai.use(chaiHttp);

describe('Pruebas de la API Rest de POSTS: ', ()=>{

    it('[POST /posts] Creamos un posts :', (done)=>{
        chai.request(url)
        .post('/posts')
        .set(authHeader)
        .send(post)
        .end(function (err, res) {
        expect(res).to.have.status(201); // 201 (Created)
        done();
      });
    });

    it('[PUT /posts] Modificamos un posts :', (done)=>{
        chai.request(url)
        .put('/posts/'+post._id)
        .set(authHeader)
        .send(post)
        .end(function (err, res) {
        expect(res).to.have.status(200); // 200 (OK)
        done();
      });
    });
    
    it('[GET /posts/id] Obtenemos un posts :', (done)=>{
        chai.request(url)
        .get('/posts/'+post._id)
        .set(authHeader)
        .send(post)
        .end(function (err, res) {
        expect(res).to.have.status(200); // 200 (OK)
        done();
      });
    });

    it('[GET /posts] Obtenemos todos los posts :', (done)=>{
      chai.request(url)
      .get('/posts')
      .set(authHeader)
      .send(post)
      .end(function (err, res) {
      expect(res).to.have.status(200); // 200 (OK)
      done();
    });
  });

  it('[DELETE /posts] Eliminamos un posts :', (done)=>{
    chai.request(url)
    .delete('/posts/'+post._id)
    .set(authHeader)
    .send(post)
    .end(function (err, res) {
    expect(res).to.have.status(200); // 200 (OK)
    done();
  });
});

});