let {createLogger , transports , format } = require('winston');

let logger = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info => {
            info.timestamp = new Date(info.timestamp).toISOString().replace('T',' ').replace('Z','');
            return `${info.timestamp} [${info.level}] ${info.message}`;
        })),
    transports:[
        new transports.Console({
            level: 'debug'
        }),
        new transports.File({
            maxFiles: 5,
            maxsize: 5120000,
            filename: `${__dirname}/../logs/default${new Date().getFullYear()}${new Date().getMonth()+1}${new Date().getDate().toString().padStart(2,0)}.log`,
        })
    ]
})

module.exports = function( level , request_id , file , messages ){
    
    if(!request_id){
        request_id = 'UNKNOWN';
    }

    file = file.split('\\').pop()
    switch (level) {
        case 'info':
            logger.info( request_id + ' ' + file + ' ' + messages);
            break;
        case 'warn':
            logger.warn( request_id + ' ' + file + ' ' + messages);
            break;
        case 'error':
            logger.error( request_id + ' ' + file + ' ' + messages);
            break;
        case 'debug':
            logger.debug( request_id + ' ' + file + ' ' + messages);
            break;
        default:
            logger.info( request_id + ' ' + file + ' ' + messages);
            break;
    }
}   