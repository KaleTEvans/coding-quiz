/* Code Quiz
Upon opening the page, the user will be presented with tbe quiz directions and the options to either view the high score 
or start the quiz. 
* Clicking to view the high score will take the user to a separate page where the stored high score is displayed
* Clicking the start quiz button will begin the quiz
    1. Create an array of 10 items with each item containing the quiz questions and answer choices
        1a. Each question and its answers will be contained in an object
        1b. The object will also contain a correct value string, which will be used to compare to the user's selection
            to determine if they pick the right answer
    2. Create a function that will create html text and buttons for the questions and answers
    3. Create a function that determines if the user chose the right answer
        3a. Loop back the function with an alert and subtract time if an incorrect answer is chosen
        3b. If correct, add to user score and reset html to be populated with the next question using same funciton in step 2
    4. Create a randomizer function that will select a quiz question from the array at random 
    5. Create a timer function that will count the timer down once the start quiz button is selected and subtracts 5
        every time the selected answer returns false
            3a. exit the function and skip to the results page once the timer reaches zero
            3b. reset the timer each time the initial page is loaded
    6. Load results once all questions are completed or once the timer runs out 

*/
var header = document.querySelector("header");

var quizBox = document.querySelector("#quiz-content");
var quizInfoBox = document.querySelector(".quiz-box");
// quiz time variable
var timer = 60;
// question number counter
var i = 0;
// declare answer choice variable
var answerChoice;
// variable to store player's score
var playerScore = 0;
// variable to store answer for each question
var answerResult;
// object to store user data
var userData = [];
// variable to attach an id to each user entry
var userId = 1;
// global variables for high score elements
var highScoreList;
var savedScores;
var scoreListEl;

var questionOne = {
    question: "Which of the following is the correct name of the loop that loops through a block of code a specified number of times in JavaScript?",
    choiceOne: "while",
    choiceTwo: "loop",
    choiceThree: "for",
    choiceFour: "else if",
    correct: "for"
};

var questionTwo = {
    question: "What is the name of the JavaScript element that stores multiple values in a single variable?",
    choiceOne: "integer",
    choiceTwo: "var",
    choiceThree: "loop",
    choiceFour: "array",
    correct: "array"
};

var questionThree = {
    question: "What is the correct syntax for a comment in JavaScript?",
    choiceOne: "<!-- --> or //",
    choiceTwo: "// or /* */",
    choiceThree: "/* */ or <!-- -->",
    choiceFour: "// or <>",
    correct: "// or /* */"
};

var questionFour = {
    question: "The ending of a JavaScript file contains this format:",
    choiceOne: ".js",
    choiceTwo: ".css",
    choiceThree: ".html",
    choiceFour: ".jpg",
    correct: ".js"
};

var questionFive = {
    question: "The object representation of a webpage is called the _____",
    choiceOne: "Domain Orientation",
    choiceTwo: "Document Object Manipulation",
    choiceThree: "Domain Object Manipulation",
    choiceFour: "Document Object Model",
    correct: "Document Object Model"
};

var questionSix = {
    question: "The correct syntax to log an element in the console is:",
    choiceOne: "log()",
    choiceTwo: "console.log()",
    choiceThree: "console()",
    choiceFour: "consolelog()",
    correct: "console.log()"
};

var questionSeven = {
    question: "To push a new element to the current array, arr = [1], the correct code is ____.",
    choiceOne: "arr.push()",
    choiceTwo: "arr.add()",
    choiceThree: "push()",
    choiceFour: "arr.new()",
    correct: "arr.push()"
};

var questionEight = {
    question: "What is the correct format for linking JavaScript code to an HTML file?",
    choiceOne: "<java></java>",
    choiceTwo: "<javaScript></javaScript>",
    choiceThree: "<new></new>",
    choiceFour: "<script></script>",
    correct: "<script></script>"
};

var questionNine = {
    question: "What is the correct name for a loop that loops through a block of code as long as a specified condition is true?",
    choiceOne: "for",
    choiceTwo: "if",
    choiceThree: "else",
    choiceFour: "while",
    correct: "while"
};

var questionTen = {
    question: "What are the two values represented by a boolean variable?",
    choiceOne: "for and while",
    choiceTwo: "greater than or less than",
    choiceThree: "True or False",
    choiceFour: "New and Old",
    correct: "True or False"
};

var questionArray = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight, questionNine, questionTen];

var questionFormEl = function() {

    // create question text element
    var questionTextEl = document.createElement("div");
    questionTextEl.className = "question";
    questionTextEl.innerHTML = "<h2 class='question-title'>" + questionArray[i].question + "</h2>";

    quizBox.appendChild(questionTextEl);

    // add four buttons for answer choices
    var answerContainerEl = document.createElement("div");
    answerContainerEl.className = "answer-choices";

    var answerChoiceOne = document.createElement("button");
    answerChoiceOne.textContent = questionArray[i].choiceOne;
    answerChoiceOne.className = "btn btn-one";
    // set button id as answer choice to compare to the correct value
    answerChoiceOne.setAttribute("id", questionArray[i].choiceOne);

    answerContainerEl.appendChild(answerChoiceOne);

    var answerChoiceTwo = document.createElement("button");
    answerChoiceTwo.textContent = questionArray[i].choiceTwo;
    answerChoiceTwo.className = "btn btn-two";
    answerChoiceTwo.setAttribute("id", questionArray[i].choiceTwo);

    answerContainerEl.appendChild(answerChoiceTwo);

    var answerChoiceThree = document.createElement("button");
    answerChoiceThree.textContent = questionArray[i].choiceThree;
    answerChoiceThree.className = "btn btn-three";
    answerChoiceThree.setAttribute("id", questionArray[i].choiceThree);

    answerContainerEl.appendChild(answerChoiceThree);

    var answerChoiceFour = document.createElement("button");
    answerChoiceFour.textContent = questionArray[i].choiceFour;
    answerChoiceFour.className = "btn btn-four";
    answerChoiceFour.setAttribute("id", questionArray[i].choiceFour);

    answerContainerEl.appendChild(answerChoiceFour);

    quizBox.appendChild(answerContainerEl);

    // add element to tell player if choice was right or wrong
    answerResult = document.createElement("div");
    answerResult.className = "answer-result";

    quizBox.appendChild(answerResult);

}; 

// function to load question upon button click
var firstQuestionLoad = function() {

    // remove initial quiz info elements from question box
    quizInfoBox.remove();

    questionFormEl();
    quizTimer();

}; 

// function to begin timer once user gets to first question
var quizTimer = function() {
    
    // function to count down
    setTimeout(function() {
        timer--;
        var timeLeft = document.querySelector("#timer");
        timeLeft.innerText = timer;
        // end timer if all quesitons are answered
        if (i === questionArray.length) {
            return timer;
        }
        // continue to run function if timer is greater than 0
        if (timer > 0) {
            quizTimer();
        }
        // quit to end page once timer is up
        if (timer <= 0) {
            window.alert("Sorry! Your time is up.");
            questionPageHandler();
            return timer;
        }
    }, 1000)
    console.log(timer);
};

// button handler function
var buttonHandler = function(event) {
    // get target element from event
    event.preventDefault();
    var targetEl = event.target;

    // if start quiz is selected, run first question function
    if (targetEl.matches("#quiz-answer")) {
        firstQuestionLoad(event);
    }
    // choice one was chosen
    if (targetEl.matches(".btn-one")) {
        answerChoice = targetEl.getAttribute("id");
        // call rightOrWrong function
        rightOrWrong();
    }
    if (targetEl.matches(".btn-two")) {
        answerChoice = targetEl.getAttribute("id");
        rightOrWrong();
    }
    if (targetEl.matches(".btn-three")) {
        answerChoice = targetEl.getAttribute("id");
        rightOrWrong();
    }
    if (targetEl.matches(".btn-four")) {
        answerChoice = targetEl.getAttribute("id");
        rightOrWrong();
    }
    // if view high score button is selected, go to high score page
    if (targetEl.matches(".high-score")) {
        if (timer < 60) {
            window.alert("You must complete the quiz first!")
            return false;
        }
        else {
            highScorePage();
        }
    }
    // once final submit button is selected, go to high score page
    if (targetEl.matches(".submit")) {
        highScoreSaver();
    }
    // reset javascript when go back button has been selected
    if (targetEl.matches(".go-back")) {
        location.reload();
    }
    // clear local storage if clear scores has been selected
    if (targetEl.matches(".clear-scores")) {
        localStorage.clear();
        highScoreList.remove();
    }
};

// function to determine if choice was right or wrong
var rightOrWrong = function() {

    // compare answer choice variable to correct object
    if (answerChoice === questionArray[i].correct) {
        // add a point to player score
        playerScore++;
        // run questionPageHandler to generate new question
        questionPageHandler();
        // insert text at bottom to notify user answer is correct
        answerResult.innerHTML = "<h3 class='result'>Correct!</h3>";  
    }
    else {
        // set timer back as a penalty for wrong answer
        timer = timer - 5;
        // run questionPageHandler to generate new question
        questionPageHandler();
        // insert text at bottom to notify user answer is incorrect
        answerResult.innerHTML = "<h3 class='result'>Incorrect!</h3>";
    }   
    console.log("player score is " + playerScore);
};

// question page handler function
// this function will handle question transitions
var questionPageHandler = function() {
    // remove question element
    var questionBox = document.querySelector(".question");
    questionBox.remove();
    // remove answer choices
    var answerBox = document.querySelector(".answer-choices");
    answerBox.remove();
    // remove results text
    var resultsBox = document.querySelector(".answer-result");
    resultsBox.remove();
    // increment the question array to load next quesiton
    i++; 
    // once i reaches the full length of the question array, call the end page function
    if (i < questionArray.length && timer > 0) {
       // call function to load new question
       questionFormEl();
    }
    else {
       quizEndPage();
    }
};

// function to open end of quiz interface
var quizEndPage = function() {
    // create div box for end page elements
    quizInfoBox = document.createElement("div");
    quizInfoBox.className = "quiz-box";

    var endPageTitle = document.createElement("h2");
    endPageTitle.className = "question";
    endPageTitle.innerHTML = "All Done!";
    quizInfoBox.appendChild(endPageTitle);

    // create div box for player score and input
    var finalScore = document.createElement("h3");
    finalScore.className = "player-score";
    finalScore.innerHTML = "Your final score is " + playerScore;

    quizInfoBox.appendChild(finalScore);

    // create form to have user enter their initials
    var userInfo = document.createElement("input");
    userInfo.type = "text";
    userInfo.name = "user-initials";
    userInfo.placeholder = "Enter Initials to Save High Score";

    quizInfoBox.appendChild(userInfo);

    // create button to submit score
    var submitButton = document.createElement("button");
    submitButton.className = "btn submit";
    submitButton.id = "save-score";
    submitButton.innerHTML = "Submit Score";

    quizInfoBox.appendChild(submitButton);

    // add answerResult element to display last question answer
    answerResult = document.createElement("div");
    answerResult.className = "answer-result";

    quizInfoBox.appendChild(answerResult);
    // append all elements to quiz box
    quizBox.appendChild(quizInfoBox);
};

// this function will store the user's score in an object
var highScoreSaver = function() {
    var userInitials = document.querySelector("input[name='user-initials']").value;

    // alert user if no initials are entered
    if (!userInitials) {
        alert("You need to enter your initials!") 
        return false;
    }

    var playerObj = {
        name: userInitials,
        score: playerScore
    };

    highScorePage();
    scoreOrganizer(playerObj);

};

// this function will load the high score page
var highScorePage = function() {
    // remove header element
    header.remove();
    // remove quiz box element
    quizInfoBox.remove(); 

    // create new body element
    var highScoreEl = document.createElement("div");
    highScoreEl.className = "quiz-content";
    highScoreEl.id = "quiz-content";

    var highScoreTitle = document.createElement("h2");
    highScoreTitle.className = "question";
    highScoreTitle.innerHTML = "High Scores";
    highScoreEl.appendChild(highScoreTitle);

    // create ul for high score list
    highScoreList = document.createElement("ul");
    highScoreList.className = "score-list";
    highScoreEl.appendChild(highScoreList);

    // create button to go back
    var goBackButton = document.createElement("button");
    goBackButton.className = "btn go-back";
    goBackButton.id = "go-back";
    goBackButton.innerHTML = "Go Back to Quiz Start";
    highScoreEl.appendChild(goBackButton);

    // create a clear high scores button
    var clearScoresButton = document.createElement("button");
    clearScoresButton.className = "btn clear-scores";
    clearScoresButton.id = "clear-scores";
    clearScoresButton.innerHTML = "Click to Clear High Scores";
    highScoreEl.appendChild(clearScoresButton);

    // append to quizBox
    quizBox.appendChild(highScoreEl);

    // loop through saved score array if one exists
    if (!savedScores) {
        return;
    }
    else {
        for (var i=0; i < savedScores.length; i++) {
            scoreOrganizer(savedScores[i]);
        }
    }
    
};

// function to organize the high scores and loop them to fill in the high score list element
var scoreOrganizer = function(playerObj) {
    // set player id 
    playerObj.id = userId;
    userData.push(playerObj);
    // save player input to local storage
    saveScores();
    //increase counter for next player input
    userId++;
    // create a list item for each score entry
    scoreListEl = document.createElement("li");
    scoreListEl.className = "score-entry";
    // add score id as custom attribute
    scoreListEl.setAttribute("user-id", playerObj.id);
    scoreListEl.innerHTML = playerObj.id + ". " +  playerObj.name + " - " + playerObj.score;

    highScoreList.appendChild(scoreListEl);

};

var saveScores = function() {
    // save user data to local storage
    localStorage.setItem("userData", JSON.stringify(userData));
};

var loadScores = function() {
    savedScores = localStorage.getItem("userData");

    if (!userData) {
        return false;
    }

    savedScores = JSON.parse(savedScores);
};

header.addEventListener("click", buttonHandler);
quizBox.addEventListener("click", buttonHandler);

loadScores();
