let mongoose = require("mongoose")

let logger = require('../utils/LoggerService')

exports.conectar = function(){
    
    return new Promise(function(resolve, reject){
        logger('info','SERVER','DB_CONNECTION','Establishing a connection to databases');
        mongoose.connect(
            "mongodb://localhost:27017/"+process.env.DB_SQUEMA, 
            { useNewUrlParser  : true,
                useFindAndModify : false,
                useCreateIndex   : true,
                useUnifiedTopology: true })
                .then( () => {
                    logger('info','SERVER','DB_CONNECTION','Established connection');
                    resolve();
                } )
                .catch( error => {
                    logger('error','SERVER','DB_CONNECTION','Error :' + error );
                    reject({ code :500, message :'Failed to connect to the database'})
        })
    })

}