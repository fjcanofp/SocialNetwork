let { db , url , authHeader} = require('../index');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let mongoose = require('mongoose');
chai.use(chaiHttp);

let post = {
    _id:mongoose.Types.ObjectId("5ea871d77011282504dc0109"),
	title:"SuperTestsPost"
}

let comment = {
    _id:mongoose.Types.ObjectId('5ea871d77011282504dc0100'),
    text:'Super Test Comment'
}

let reaction = {
    '_id':'5ea871d77011282504da0000',
    'reaction' :'fun'
}

describe('Probamos la API de Reacciones',()=>{
    before((done)=>{
        db.collection('comments_collections').insertOne(comment)
        .then(()=>{
            done();
        });
    })
    after((done)=>{
        db.collection('comments_collections').deleteOne({ _id : comment._id })
        .then(()=>{
            done();
        });
    })
    
    before((done)=>{
        db.collection('posts_collections').insertOne(post)
        .then(()=>{
            done();
        });
    })
    after((done)=>{
        db.collection('posts_collections').deleteOne({ _id : post._id })
        .then(()=>{
            done();
        });
    })
    it('Creamos una reaccion en un comentario:', (done)=>{
        chai.request(url)
          .post('/comment/'+comment._id+'/reaction/')
          .set(authHeader)
          .send(reaction)
          .end(function (err, res) {
          expect(res).to.have.status(201); // 201 (Created)
              done();
          });
      });

      it('Eliminamos la reaccion', (done)=>{
        chai.request(url)
          .delete('/reaction/'+reaction._id)
          .set(authHeader)
          .send(reaction)
          .end(function (err, res) {
          expect(res).to.have.status(200); // 200 (OK)
              done();
          });
      });

      it('Creamos una reaccion en un posts:', (done)=>{
        chai.request(url)
          .post('/posts/'+post._id+'/reaction/')
          .set(authHeader)
          .send(reaction)
          .end(function (err, res) {
          expect(res).to.have.status(201); // 201 (Created)
              done();
          });
      });

      it('Eliminamos la reaccion', (done)=>{
        chai.request(url)
          .delete('/reaction/'+reaction._id)
          .set(authHeader)
          .send(reaction)
          .end(function (err, res) {
          expect(res).to.have.status(200); // 200 (OK)
              done();
          });
      });
})