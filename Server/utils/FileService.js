const mongodb = require('mongodb');
const fs = require('fs');
const fileType = require('file-type')
 const mongoose = require("mongoose")
exports.deleteFile = (file) => {
    return new Promise(function (resolve, reject) {
        mongodb.MongoClient.connect(process.env.DB_URI, function (error, client) {

            const db = client.db(process.env.DB_SQUEMA);
            var bucket = new mongodb.GridFSBucket(db);

            bucket.delete(file._id, (err) => {
                if (err) {
                    reject(err)
                }
            })

            resolve();
        })
    })
}
exports.getFile = ( id , res ) => {
    return new Promise(function (resolve, reject) {
        mongodb.MongoClient.connect(process.env.DB_URI, { useNewUrlParser: true , useUnifiedTopology: true } ,function (error, client) {

            const db = client.db(process.env.DB_SQUEMA);
            var bucket = new mongodb.GridFSBucket(db);
            var data = [];
            let downloadStream  = bucket.openDownloadStream( mongoose.Types.ObjectId( id ))
            downloadStream.on('data', (chunk) => {
                data.push(chunk);
            });
            downloadStream.on('error', async (error) => {
                reject(error);
            });
            downloadStream.on('end', async () => {
                let bufferBase64 = Buffer.concat(data)
                fileType.fromBuffer(bufferBase64)
                .then(mimeobj=>{
                    res.writeHead(200, {'Content-Type': mimeobj.mime });
                    res.end(bufferBase64, 'binary');
                })
            });
        })
    })
}
exports.uploadFile = (file) => {
    return new Promise(function (resolve, reject) {
        mongodb.MongoClient.connect(process.env.DB_URI, function (error, client) {

            const db = client.db(process.env.DB_SQUEMA);
            var bucket = new mongodb.GridFSBucket(db);
            fs.createReadStream(file.path).
                pipe(bucket.openUploadStream(file.
                    originalname)).
                on('error', function (error) {
                    reject(error)
                }).
                on('finish', function (file) {
                    resolve(file)
                })
        })
    })
}