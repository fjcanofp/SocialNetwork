let nodemailer = require('nodemailer');
let logger = require('./LoggerService')
let fs = require('fs');
let util = require('./utils')

let url = "";

exports.sendMailRecoveryPassword = (receiverEmail, receiverName , recoveryID ) => {
    url = process.env.URL_CLIENT_RECOVERY_PASSWORD+"/"+util.randomString(7);
    logger('info', 'NODE', __filename, 'Recovery password mail to ' + receiverName)
    var transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    var mailOptions = {
        from: `${process.env.EMAIL_FRIENDLY} <${process.env.EMAIL}>`,
        to: receiverEmail,
        subject: 'Request to recover password',
        html: renderEmail(receiverName, url ,recoveryID )
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            logger('error', 'NODE', __filename, error)
        } else {
            logger('info', 'NODE', __filename, 'Recovery password mail seended to ' + receiverName)
        }
    });

}

const renderEmail = (username, url , recoveryID ) => {
    let email = fs.readFileSync('templates/recoveryPassword/recoveryPassword.html', (err, data) => {
        console.log(data)
        return data.toString();
    }).toString();
    email = email.replace('{{URL}}', url);
    email = email.replace('{{USERNAME}}', username);
    email = email.replace('{{RECOVERYID}}', recoveryID);
    return email;
}
