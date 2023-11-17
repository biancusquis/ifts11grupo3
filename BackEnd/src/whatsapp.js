const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js'); //comentar este cuando quieras editar
//const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client ()//({
   // authStrategy: new LocalAuth()
//});


client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

module.exports = client;
