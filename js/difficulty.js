const button = document.querySelectorAll("button");

// determine the difficulty level or the question
const selectHandler = (event) => {
    const level = event.target.innerText.toLowerCase();
    localStorage.setItem("level", level);
    window.location.assign("/");
};

button.forEach((button) => {
    button.addEventListener("click", selectHandler);
});
