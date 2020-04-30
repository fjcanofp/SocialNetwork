let mongoose = require('mongoose')
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);



let user = {
  "_id": mongoose.Types.ObjectId("5ea871d77011282504d58c02"),
  "name": "test_user",
  "email": "test@supertest.com",
  "login": "test@supertest.com",
  "password": "$2b$10$wChgry8o.kSsIe9dc2WbbeEnJN3wr94J9zd16cstTBP.3Y.ts7D5."
}

const connectDB = function (done) {
  mongoose.connect('mongodb://localhost:27017/SocialNetwork', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.once('open', function () {
    db.collection('user_collections').insertOne( user , (error, response) => {
      done();
    });
  });
};

const closeConexionWithDB = function (done) {
  const db = mongoose.connection;
  db.collection('user_collections')
  .deleteOne({ '_id' : user._id })
  .then(()=>{
    mongoose.connection.close(done);
  })
};

exports.url = 'localhost:8080';
exports.user = user;


exports.authHeader = { 
  "Authorization": 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRlc3RAc3VwZXJ0ZXN0LmNvbSIsImlkIjoiNWVhODcxZDc3MDExMjgyNTA0ZDU4YzAyIiwiaWF0IjoxNTg4MTAyODAxfQ.elbL4EnI8xzhIkWByTSIgxyJWxqIDAwqDDLLM2JrmJ4'
}

before(connectDB);
after(closeConexionWithDB);