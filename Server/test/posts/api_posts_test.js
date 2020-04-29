let { db , url , authHeader} = require('../index');

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

let post = {
    title : "Mocha  & Chai Test"
}

chai.use(chaiHttp);

describe('Pruebas de la API Rest de POSTS: ', ()=>{

});