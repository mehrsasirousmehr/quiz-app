import formatData from "./helper.js";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");

const URL = "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";

let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;

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
    const isCorrect = index === correctAnswer ? true : false;
    if (isCorrect) {
        event.target.classList.add("correct");
    } else {
        event.target.classList.add("incorrect");
        answerList[correctAnswer].classList.add("correct");
    }
};

window.addEventListener("load", fetchData);

answerList.forEach((button, index) => {
    button.addEventListener("click", (event) => ckeckAnswer(event, index));
});
