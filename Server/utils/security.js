const jwt = require('jsonwebtoken')
let logger = require('../utils/LoggerService');
let UserBO = require("../managers/Users")

const getTokenFrom = request => {
    const authorization = request.headers.authorization;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      return authorization.substring(7)
    }
    return null
}

exports.interceptorJWT = function(request, response, next){

    if(request.url == '/register' || request.url == '/login' ){
        next();
        return
    }

    const token = getTokenFrom(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    UserBO.findUserById(request.id , decodedToken.id)
    .then( user => {
        request.user = user
        logger('info','AUTH',request.id , "Authenticate user" + user.name );        
        next();
    })
    .catch(error => {
        logger('info','AUTH', request.id , "Authentication failure" );        
        response.statusCode = error.code
        response.json(error)
    })
}