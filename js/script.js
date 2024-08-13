// Variables of HTML id's
var startBtn = document.getElementById("startBtn");
var highScoreBtn = document.getElementById("highScoreBtn");
var questionDiv = document.getElementById("questionCont");
var answersDiv = document.getElementById("answersCont");
var resultsDiv = document.getElementById("resultsCont");
var refreshButton = document.getElementById("clear-highScores");
var timer = document.getElementById("timer");

// Shuffle Questions variables
var shuffledQuestions, currentQuestionIndex

// Holds score variable
var score = 0;

// Counts total questions answered variable
var totalQuestions = 0;

// onClick button event to start the quiz
startBtn.addEventListener('click', countdown);

// Start quiz function also starts the countdown
function quizStart() {
    // countdown();
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    nextQuestion();
}

// 60 second timer variable
var seconds = 60;

// Countdown timer starts the presentation of questions, answers and a timer
// If the timer runs out the game is anounced as over
function countdown() {
    interval = setInterval(function () {
        if (seconds === 60) {
            quizStart();
        } else if (seconds <= 0) {
            clearInterval(interval);
            resetContainers();
            questionDiv.removeChild(questionDiv.firstChild);
            resultsDiv.removeChild(resultsDiv.firstChild);
            // Displays Game Over! if the timer runs out
            var gameOverMsg = document.createElement("p");
            gameOverMsg.textContent = "Game Over!";
            gameOverMsg.setAttribute("class", "gameOver");
            answersDiv.appendChild(gameOverMsg);
            // Displays the Try Again button if the timer runs out
            var endMsg = document.createElement("p");
            endMsg.setAttribute("class", "gameOver");
            answersDiv.appendChild(endMsg);
            var tryAgainBtn = document.createElement("button");
            tryAgainBtn.innerText = "Try Again";
            tryAgainBtn.onclick = function() {
                document.location.assign(src="index.html");
            }
            endMsg.appendChild(tryAgainBtn);
            tryAgainBtn.setAttribute("class", "btn btn-danger");
        } else {
            score = seconds;
        }
        document.getElementById("timer").textContent = " Time Left: " + seconds + " secs";
        seconds--;    
    }, 1000);
}

// Generates next question, but no more than 10
function nextQuestion() {
    totalQuestions++;
    if (totalQuestions > 10) {
        clearInterval(interval);
        gameComplete();
    } else {
        resetContainers();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }
}

// Displays current question and respective multiple choice answers
function showQuestion(question) {
    // Display question
    questionDiv.innerText = question.question;
    questionDiv.setAttribute("class", "questions");
    // Display answers as butoons
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.textContent = answer.text;
        button.setAttribute("class", "answerBtn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answersDiv.appendChild(button);
    });
}

// Resets answerDiv container before displaying next question and answers
function resetContainers() {
    while (answersDiv.firstChild) {
        answersDiv.removeChild(answersDiv.firstChild);
    }
}

// When an answer is chosen, selectAnswer display either a correct or wrong message
function selectAnswer(answer) {
    resultsDiv.removeChild(resultsDiv.firstChild);
    var selectedAnswer = answer.target;
    var correct = selectedAnswer.dataset.correct;
    if (correct) {
        // Displays Correct! message when a question is answered correclty
        var correctMsg = document.createElement("div");
        correctMsg.textContent = "Correct!";
        correctMsg.setAttribute("class", "result");
        resultsDiv.appendChild(correctMsg);
        shuffledQuestions.length > currentQuestionIndex + 1;
        currentQuestionIndex++;
        nextQuestion();
    } else {
        // Displays Wrong! message when a question is answered incorreclty
        var wrongMsg = document.createElement("div");
        wrongMsg.textContent = "Wrong!";
        wrongMsg.setAttribute("class", "result");
        resultsDiv.appendChild(wrongMsg);
        seconds -= 10;
        shuffledQuestions.length > currentQuestionIndex + 1;
        currentQuestionIndex++;
        nextQuestion();
    }
}

// Localstorage Variable
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// gameComplete function to request name and store name with score in local storage as an array of objects
function gameComplete() {
    if (score >= 1) {
        resetContainers();
        questionDiv.removeChild(questionDiv.firstChild);
        resultsDiv.removeChild(resultsDiv.firstChild);
        // Displays All Done! message
        var wellDoneMsg = document.createElement("div");
        wellDoneMsg.textContent = "Well Done!";
        wellDoneMsg.setAttribute("class", "wellDoneMsg");
        questionDiv.appendChild(wellDoneMsg);
        // Displays users Final Score
        var scoreMsg = document.createElement("div");
        scoreMsg.textContent = "You scored: " + score + ".";
        answersDiv.appendChild(scoreMsg);
        // Prompts user to input their name 
        var enternameMsg = document.createElement("p");
        enternameMsg.textContent = "Enter Your Name: ";
        resultsDiv.appendChild(enternameMsg);
        // Input field for users name
        var nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = "";
        nameInput.maxLength = "15";
        nameInput.placeholder = "Mickey Mouse";
        nameInput.setAttribute("class", "nameInput");
        enternameMsg.appendChild(nameInput);
        // Submit button stores users name in local storage array
        var submitBtn = document.createElement("button");
        submitBtn.innerText = "Submit";
        submitBtn.onclick = function(e) {
            e.preventDefault();
            var highScore = {
                highScore: score,
                name: nameInput.value
            };
            highScores.push(highScore);
            highScores.sort((a,b) => b.highScore - a.highScore);
            highScores.splice(10);
            localStorage.setItem("highScores", JSON.stringify(highScores));
            document.location.assign(src="highscores.html");
        }
        submitBtn.setAttribute("class", "submitBtn");
        enternameMsg.appendChild(submitBtn);
    }
}

// Array of Objects - containing 10 JavaScript questions
var questions = [
    {
        question: "Who invented JavaScript?",
        answers: [
            { text: "1. Douglas Crockford", correct: false },
            { text: "2. Brendan Eich", correct: true },
            { text: "3. Sheryl Sandberg", correct: false },
            { text: "4. Linus Torvolds", correct: false }
        ],
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "1. JavaScript", correct: false },
            { text: "2. Terminal / Bash", correct: false },
            { text: "3. for loops", correct: false },
            { text: "4. console.log", correct: true }
        ],
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        answers: [
            { text: "1. commas", correct: false },
            { text: "2. curly brackets", correct: false },
            { text: "3. quotes", correct: true },
            { text: "4. parentheses", correct: false }
        ],
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers: [
            { text: "1. Angular", correct: false },
            { text: "2. jQuery", correct: false },
            { text: "3. ESLint", correct: true },
            { text: "4. RequireJS", correct: false }
        ],
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "1. <script>", correct: true },
            { text: "2. <js>", correct: false },
            { text: "3. <scripting>", correct: false },
            { text: "4. <javascript>", correct: false }
        ],
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
            { text: "1. The <head> section", correct: false },
            { text: "2. The <body> section", correct: false },
            { text: "3. The <footer> section", correct: false },
            { text: "4. Both the <head> section and the <body> section are correct", correct: true }
        ],
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            { text: "1. alertBox('Hello World');", correct: false },
            { text: "2. alert('Hello World');", correct: true },
            { text: "3. msgBox('Hello World');", correct: false },
            { text: "4. prompt('Hello World');", correct: false }
        ],
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        answers: [
            { text: "1. -", correct: false },
            { text: "2. *", correct: false },
            { text: "3. X", correct: false },
            { text: "4. =", correct: true }
        ],
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        answers: [
            { text: "1. top(x, y)", correct: false },
            { text: "2. ceil(x, y)", correct: false },
            { text: "3. Math.max(x, y)", correct: true },
            { text: "4. Math.ceil(x, y)", correct: false }
        ],
    },
    {
        question: "How does a FOR loop start?",
        answers: [
            { text: "1. for (i = 0; i <= 5; i++)", correct: true },
            { text: "2. for i = 1 to 5", correct: false },
            { text: "3. for (i = 0; i <= 5)", correct: false },
            { text: "4. for (i <= 5; i++)", correct: false }
        ],
    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: [
            { text: "1. if i == 5 then", correct: false },
            { text: "2. if i = 5 then", correct: false },
            { text: "3. if i = 5", correct: false },
            { text: "4. if (i == 5)", correct: true }
        ],
    },
    {
        question: "How do write an IF statement for executing some code if \"i\" is NOT equal to 5?",
        answers: [
            { text: "1. if i =! 5 then", correct: false },
            { text: "2. if (i != 5)", correct: true },
            { text: "3. if (i <> 5)", correct: false },
            { text: "4. if i <> 5", correct: false }
        ],
    },
    {
        question: "How can you add a comment in a JavaScript?",
        answers: [
            { text: "1. <!-- This is a comment -->", correct: false },
            { text: "2. ' This is a comment '", correct: false },
            { text: "3. // This is a comment", correct: true },
            { text: "4. !-- This is a comment", correct: false }
        ],
    },
    {
        question: "How can you add a comment that has more than one line?",
        answers: [
            { text: "1. \/* This comment has more than one line */", correct: true },
            { text: "2. // This comment has more than one line //", correct: false },
            { text: "3. <!-- This comment has more than one line -->", correct: false },
            { text: "4. !--This comment has more than one line--", correct: false }
        ],
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        answers: [
            { text: "1. var colors = \"red\", \"green\", \"blue\"", correct: false },
            { text: "2. var colors = (1:\"red\", 2:\"green\", 3:\"blue\")", correct: false },
            { text: "3. var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")", correct: false },
            { text: "4. var colors = [\"red\", \"green\", \"blue\"]", correct: true }
        ],
    },
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        answers: [
            { text: "1. Math.rnd(7.25)", correct: false },
            { text: "2. Math.round(7.25)", correct: true },
            { text: "3. rnd.Math(7.25)", correct: false },
            { text: "4. round.Math(7.25)", correct: false }
        ],
    },
    {
        question: "How do you call a function named \"myFunction\"?",
        answers: [
            { text: "1. myFunction()", correct: true },
            { text: "2. call function myFunction()", correct: false },
            { text: "3. call myFunction()", correct: false },
            { text: "4. function myFunction()", correct: false }
        ],
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: [
            { text: "1. onmouseclick", correct: false },
            { text: "2. onclick", correct: true },
            { text: "3. onchange", correct: false },
            { text: "4. onmouseover", correct: false }
        ],
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            { text: "1. function:myFunction()", correct: false },
            { text: "2. function = myFunction()", correct: false },
            { text: "3. function myFunction()", correct: true },
            { text: "4. function-myFunction()", correct: false }
        ],
    },
    {
        question: "What is the correct syntax for referring to an external script called \"xxx.js\"?",
        answers: [
            { text: "1. <script src=\"xxx.js\">", correct: true },
            { text: "2. <script name=\"xxx.js\">", correct: false },
            { text: "3. <script href=\"xxx.js\">", correct: false },
            { text: "4. <script file=\"xxx.js\">", correct: false }
        ],
    },
    {
        question: "How can you detect the client's browser name?",
        answers: [
            { text: "1. navigator.appName", correct: true },
            { text: "2. client.navName", correct: false },
            { text: "3. browser.name", correct: false },
            { text: "4. navigator.browserName", correct: false }
        ],
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: [
            { text: "1. v = carName;", correct: false },
            { text: "2. variable carName;", correct: false },
            { text: "3. v carName;", correct: false },
            { text: "4. var carName;", correct: true }
        ],
    },
];


