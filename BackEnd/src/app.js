// BackEnd/src/app.js
const { getTriviaQuestion } = require('./trivia');

module.exports = (client) => {

let triviaQuestion;

client.on('message', async (message) => {
    const userPhoneNumber = message.from;
    console.log('Received message:', message.body);

    if (!userPhoneNumber || typeof client.sendMessage !== 'function') {
        console.error('Error: Parámetros no válidos para enviar el mensaje.');
        return;
    }


    switch (message.body.toLowerCase()) {
        case 'jugar':
            triviaQuestion = await getTriviaQuestion();
            if (triviaQuestion) {
                const options = triviaQuestion.options.join('\n');
                const questionText = `Pregunta: ${triviaQuestion.question}\nOpciones:\n${options}`;
                client.sendMessage(userPhoneNumber, questionText);
            } else {
                client.sendMessage(userPhoneNumber, 'Lo siento, no se pudo obtener una pregunta en este momento.');
            }
            break;
        default:
            if (triviaQuestion) {
                // Asumiendo que el mensaje del usuario es la opción elegida
                if (message.body === triviaQuestion.correctAnswer) {
                    client.sendMessage(userPhoneNumber, '¡Correcto! Esa es la respuesta correcta.');
                } else {
                    client.sendMessage(userPhoneNumber, 'Incorrecto. La respuesta correcta es: ' + triviaQuestion.correctAnswer);
                }
                triviaQuestion = null;
            } else {
                client.sendMessage(userPhoneNumber, 'Envía "Jugar" para comenzar una trivia.');
            }
            break;
    }

    client.on('disconnected', (reason) => {
        console.log('Client disconnected:', reason);
    });
    
    client.on('auth_failure', (msg) => {
        console.error('Authentication failed:', msg);
    });
    
    client.on('qr', (qrCode) => {
        console.log('QR Code received:', qrCode);
    });
});

client.initialize();
}