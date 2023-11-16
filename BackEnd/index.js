const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js'); //comentar este cuando quieras editar
//const { Client, LocalAuth } = require('whatsapp-web.js');

const fetch = require('node-fetch');
const client = new Client//({
   // authStrategy: new LocalAuth()
//});

let triviaQuestion = null; 

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
    const userPhoneNumber = message.from;

    switch (message.body.toLowerCase()) {
        case 'jugar':
            triviaQuestion = await getTriviaQuestion();
            if (triviaQuestion) {
                const options = triviaQuestion.options.join('\n');
                const questionText = `Pregunta: ${triviaQuestion.question}\nOpciones:\n${options}`;
                client.sendMessage(message.from, questionText);
            } else {
                client.sendMessage(message.from, 'Lo siento, no se pudo obtener una pregunta en este momento.');
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
                triviaQuestion = null; // Restablecer triviaQuestion para permitir un nuevo juego
            } else {
                client.sendMessage(userPhoneNumber, 'Envía "Jugar" para comenzar una trivia.');
            }
            break;
    }
});

client.initialize();

// Función para obtener una pregunta de trivia desde la API de Open Trivia DB
async function getTriviaQuestion() {
    const apiUrl = 'https://opentdb.com/api.php?amount=1&type=multiple&language=es'; // Puedes ajustar las opciones aquí
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
        const questionData = data.results[0];
        const question = questionData.question;
        const correctAnswer = questionData.correct_answer;
        const incorrectAnswers = questionData.incorrect_answers;
        const options = [...incorrectAnswers, correctAnswer];

        // Mezcla las opciones en un orden aleatorio
        options.sort(() => Math.random() - 0.5);

        return {
            question,
            options,
            correctAnswer,
        };
    } else {
        return null;
    }
}
