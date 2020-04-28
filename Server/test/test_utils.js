let mongoose = require('mongoose')

let user = {
  "name": "test_user",
  "email": "test@supertest.com",
  "login": "test@supertest.com",
  "password": "test@supertest.com",
}

exports.connectDB = function (done) {
  mongoose.connect('mongodb://localhost/SocialNetwork', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.once('open', function () {
    db.collection('user_collections').insertOne( user , (error, response) => {
      user._id = response.insertedId;
      done();
    });
  });
};

exports.closeConexionWithDB = function (done) {
  mongoose.connection.db.dropDatabase(function () {
    mongoose.connection.close(done);
  });
};

exports.url = 'localhost:8080';
exports.user = user;


exports.authHeader = {
  authorization: "Basic " + Buffer.from('test@supertest.com:test@supertest.com').toString('base64')
}
