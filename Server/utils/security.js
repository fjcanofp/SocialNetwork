const jwt = require('jsonwebtoken')
let logger = require('../utils/LoggerService');
let UserBO = require("../managers/Users")

const getTokenFrom = request => {
    logger('debug','AUTH',request.id , "Loking for headers authorization" );
    const authorization = request.headers.authorization;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    logger('debug','AUTH',request.id , "Header Autentication found" );
      return authorization.substring(7);
    }
    logger('debug','AUTH',request.id , "Header Autentication not found" );
    return null
}

exports.interceptorJWT = function(request, response, next){
    
    if(request.url == '/register' || request.url == '/login' || request.url == '/recovery' ){
        logger('debug','AUTH',request.id , request.url+" don't need auth" );
        next();
        return
    }

    const token = getTokenFrom(request)
    
    if (!token ){
        logger('error','AUTH',request.id , "token missing or invalid" );
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        logger('error','AUTH',request.id , "token missing or invalid" );
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    UserBO.findUserById(request.id , decodedToken.id)
    .then( user => {
        request.user = user
        logger('info','AUTH',request.id , "Authenticate user" + user.name );        
        next();
    })
    .catch(error => {
        logger('info','AUTH', request.id , "Authentication failure" + JSON.stringify(error));        
        response.statusCode = error.code
        response.json(error)
    })
}