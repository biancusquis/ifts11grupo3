// BackEnd/index.js
//const app = require('./src/app');
//const client = require('./src/whatsapp');

//client.initialize();

// index.js



const express = require('express');
const cors = require('cors');
const app = express();
const initializeWhatsApp = require('./src/whatsapp');
const qrcode = require('qrcode');
const appLogic = require('./src/app');

app.use(cors());

const { client, getQR } = initializeWhatsApp();

// No vuelvas a declarar 'client' aquí, ya lo obtuviste de initializeWhatsApp

client.initialize(); // Asegúrate de llamar a initialize en el cliente de WhatsApp

app.get('/iniciar-whatsapp', async (req, res) => {
  try {
    // Obtiene el valor del QR utilizando la función exportada desde whatsapp.js
    const qrCodeUrl = await qrcode.toDataURL(getQR());

    // Envía la URL como respuesta
    res.status(200).json({ qrCodeUrl });
  } catch (err) {
    console.error('Error al generar el código QR:', err);
    res.status(500).send('Error interno del servidor');
  }
});

appLogic(client);

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
