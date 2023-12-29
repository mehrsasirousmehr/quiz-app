import formatData from "./helper.js";

const level = localStorage.getItem("level") || "medium";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const questionNumber = document.getElementById("question-number");

const CORRECT_BONUS = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

// get data from api
const fetchData = async () => {
    const response = await fetch(URL);
    const json = await response.json();
    formattedData = formatData(json.results);
    start();
};

// show or unshow loader
const start = () => {
    showQuestion();
    loader.style.display = "none";
    container.style.display = "block";
};

// show questions
const showQuestion = () => {
    questionNumber.innerText = questionIndex + 1;
    const { question, answers, correctAnswerIndex } = formattedData[questionIndex];
    correctAnswer = correctAnswerIndex;
    console.log(correctAnswer);
    questionText.innerText = question;
    answerList.forEach((button, index) => {
        button.innerText = answers[index];
    });
};

// ckecking whether the question is correct or incorrect
const ckeckAnswer = (event, index) => {
    if (!isAccepted) return;
    isAccepted = false;

    const isCorrect = index === correctAnswer ? true : false;
    if (isCorrect) {
        event.target.classList.add("correct");

        // score
        score += CORRECT_BONUS;
        scoreText.innerText = score;
    } else {
        event.target.classList.add("incorrect");
        answerList[correctAnswer].classList.add("correct");
    }
};

// show next question
const nextHandler = () => {
    questionIndex++;
    if (questionIndex < formattedData.length) {
        isAccepted = true;
        removeClasses();
        showQuestion();
    } else {
        finishHandler();
    }
};

const removeClasses = () => {
    answerList.forEach((button) => (button.className = "answer-text"));
};

// finish game
const finishHandler = () => {
    localStorage.setItem("score", JSON.stringify(score));
    window.location.assign("/end.html");
};

window.addEventListener("load", fetchData);

answerList.forEach((button, index) => {
    button.addEventListener("click", (event) => ckeckAnswer(event, index));
});

nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);
