const fetch = require('node-fetch');

let triviaQuestion = null;

async function getTriviaQuestion() {
    const apiUrl = 'https://opentdb.com/api.php?amount=1&type=multiple&language=es';
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

        triviaQuestion = {
            question,
            options,
            correctAnswer,
        };
    } else {
        triviaQuestion = null;
    }
    return triviaQuestion;
}

module.exports = {
    getTriviaQuestion,
};
