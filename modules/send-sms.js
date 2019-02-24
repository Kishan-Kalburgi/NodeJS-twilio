

const accountSid = '#########################################';
const authToken = '##############################';
const client = require('twilio')(accountSid, authToken);

let callsendSMS = (req, res) => {
    client.messages
        .create({
            body: 'This for is for testing. From uBreakiFix © Kaene Soft, Inc.',
            from: '+17123508797',
            to: '+17123508797'
        })
        .then(message => console.log(message.sid));
}

module.exports.callsendSMS = callsendSMS;