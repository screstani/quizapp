const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What was the first capital of Italy?",
        choice1: "Roma",
        choice2: "Torino",
        choice3: "Milano",
        choice4: "Venezia",
        answer: 2    
    },
    {
        question: "Where the famous pizza flavour 'Margherita' was created?",
        choice1: "Roma",
        choice2: "Genoa",
        choice3: "Palermo",
        choice4: "Napoli",
        answer: 4  
    },
    {
        question: "Where Gioachino Rossini, the author of the opera 'The Barber of Sevilia' was born?",
        choice1: "Verona",
        choice2: "Bologna",
        choice3: "Pesaro",
        choice4: "Firenze",
        answer: 3
    },
    {
        question: "According to tradition, in what year Rome was found?",
        choice1: "753 BC",
        choice2: "0",
        choice3: "476 AC",
        choice4: "8 BC",
        answer: 1
    },
    {
        question: "In what italian city the famous story of 'Romeu and Juliet' took place?",
        choice1: "Venezia",
        choice2: "Siena",
        choice3: "Padova",
        choice4: "Verona",
        answer: 4
    }
];

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    // spread operator, the 3 dots, spread each of the itens in the questions into a new array
    // we copy so we don't change the original array
    availableQuestions = [ ... questions];
    getNewQuestion();
};

getNewQuestion = () => {

if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // go to the end page
    return window.location.assign("end.html");
}
    questionCounter ++;
    questionCounterText.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach (choice => {
        //that's the way we retrieve that data-number set on each choice in game.html
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    //tira a questão já usada para evitar repetições
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
       
        //ternary sintax that compares the answers
        //a comparação é entre string e number, entào double equals
        const classToApply = selectedAnswer==currentQuestion.answer ? "correct" : "incorrect";
        
        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();