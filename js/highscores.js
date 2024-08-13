// Gets and Displays the Highscores from local storage
var highScoresList = document.getElementById("highScoresList");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
    .map(score => {
        return `<li>${score.name} - ${score.highScore}</li>`;
    }).join("");

// Go Back button - returns user to the homepage
var goBackBtn = document.getElementById("goBackBtn");

goBackBtn.onclick = function () {
    document.location.assign(src = "index.html");
}

// 'Clear High Scores' button clears Localstorge and HighScore table
var highScoreBtn = document.getElementById("highScoreBtn");
highScoreBtn.addEventListener('click', clearLocalStorage);

function clearLocalStorage() {
    localStorage.clear();
    window.location.reload();
}