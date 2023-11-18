const qrcode = require('qrcode-terminal');
//const { Client } = require('whatsapp-web.js'); //comentar este cuando quieras editar
const { Client, LocalAuth } = require('whatsapp-web.js');

const initializeWhatsApp = () => {
const client = new Client ()//({
   // authStrategy: new LocalAuth()
//});
let currentQR = ''; // Variable para almacenar el QR actual
let qrCodeGenerated = false; // Variable para controlar si el código QR ya se generó



client.on('qr', qr => {
    if (!qrCodeGenerated) {
    qrcode.generate(qr, { small: true });
     console.log('QR RECEIVED', qr);
     currentQR = qr;
      qrCodeGenerated = true; // Establece la bandera para indicar que el código QR se ha generado
    }
});

client.on('ready', () => {
    console.log('Client is ready!');
    qrCodeGenerated = false;
});
return { client, getQR: () => currentQR  }; // Devuelve el cliente y la función para obtener el QR
};

module.exports = initializeWhatsApp;