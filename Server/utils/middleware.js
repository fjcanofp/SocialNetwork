const addRequestId = require('express-request-id')();
const logger = require('../utils/LoggerService');
const cors = require('cors');
let middleware = {};

middleware.indentifyRequest = addRequestId;

middleware.interceptorLog = function(request, response, next){
    logger('info','REQUEST',request.id,`${request.method} ${request.url}`);
    next()
}

middleware.interceptorCORS = cors();

exports.middleware = middleware;