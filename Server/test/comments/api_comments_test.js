let { db , url , authHeader} = require('../index');

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let mongoose = require('mongoose');
chai.use(chaiHttp);

let post = {
    _id:mongoose.Types.ObjectId("5ea871d77011282504dd0100"),
	title:"SuperTestsPost"
}

let comment = {
    _id:'5ea871d77011282504dc0100',
    text:'Super Test Comment'
}

let comment2 = {
    _id:'5ea871d77011282504dcd000',
    text:'Super Test Comment on Comment'
}

describe('Probamos la API de Comentarios',()=>{
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

    it('Creamos un comentario en una publicacion :', (done)=>{
      chai.request(url)
        .post('/posts/'+post._id+'/comment/')
        .set(authHeader)
        .send(comment)
        .end(function (err, res) {
        expect(res).to.have.status(201); // 201 (Created)
            done();
        });
    });

    it('Creamos un comentario en una en un comentario :', (done)=>{
        chai.request(url)
        .post('/posts/'+comment2._id+'/comment/')
        .set(authHeader)
        .send(comment2)
        .end(function (err, res) {
        expect(res).to.have.status(201); // 201 (Created)
            done();
        });
    });

    it('Modificamos un comentario :', (done)=>{

        comment2.text = comment2.text+" M ";

        chai.request(url)
        .put('/comments/'+comment2._id)
        .set(authHeader)
        .send(comment2)
        .end(function (err, res) {
            expect(res).to.have.status(200); // 200 (Ok)
            done();
        });
    });

    it('Eliminamos un comentario del post :', (done)=>{
      chai.request(url)
        .delete('/comments/'+comment._id)
        .set(authHeader)
        .send()
        .end(function (err, res) {
        expect(res).to.have.status(200); // 200 (Ok)
            done();
        });
    });

    it('Eliminamos un comentario de un commentario :', (done)=>{
        chai.request(url)
          .delete('/comments/'+comment2._id)
          .set(authHeader)
          .send()
          .end(function (err, res) {
          expect(res).to.have.status(200); // 200 (OK)
              done();
          });
    });
})
