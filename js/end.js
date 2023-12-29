const score = JSON.parse(localStorage.getItem("score"));
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const scoreELe = document.querySelector("p");
const button = document.querySelector("button");
const input = document.querySelector("input");

// show score from localStorage to p tag
scoreELe.innerText = score;

// save the score
const saveHandler = () => {
    if (!input.value || !score) {
        alert("enter something beatch");
    } else {
        const finalScore = {
            name: input.value,
            score,
        };
        highScores.push(finalScore);
        highScores.sort((a, b) => b.score - a.score); // sort from high to low
        highScores.splice(10); // show just 10 of high scores
        localStorage.setItem("highScores", JSON.stringify(highScores));
        localStorage.removeItem("scores");
        window.location.assign("/");
    }
};

button.addEventListener("click", saveHandler);
