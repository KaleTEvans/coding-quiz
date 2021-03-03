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
    6. Load a results page once all questions are completed or once the timer runs out 

*/

var quizBox = document.querySelector("#quiz-content");
// quiz time variable
var timer = 60;

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
}

var questionArray = [questionOne, questionTwo, questionThree];

var questionFormEl = function() {

    // create question text element
    var questionTextEl = document.createElement("div");
    questionTextEl.className = "questionEl";
    questionTextEl.innerHTML = "<h2 class='question'>" + questionArray[0].question + "</h2>";

    quizBox.appendChild(questionTextEl);

    // add four buttons for answer choices
    var answerContainerEl = document.createElement("div");
    answerContainerEl.className = "answer-choices";

    var answerChoiceOne = document.createElement("button");
    answerChoiceOne.textContent = questionOne.choiceOne;
    answerChoiceOne.className = "btn";
    // set button id as answer choice to compare to the correct value
    answerChoiceOne.setAttribute("id", questionOne.choiceOne);

    answerContainerEl.appendChild(answerChoiceOne);

    var answerChoiceTwo = document.createElement("button");
    answerChoiceTwo.textContent = questionOne.choiceTwo;
    answerChoiceTwo.className = "btn";
    answerChoiceTwo.setAttribute("id", questionOne.choiceTwo);

    answerContainerEl.appendChild(answerChoiceTwo);

    var answerChoiceThree = document.createElement("button");
    answerChoiceThree.textContent = questionOne.choiceThree;
    answerChoiceThree.className = "btn";
    answerChoiceThree.setAttribute("id", questionOne.choiceThree);

    answerContainerEl.appendChild(answerChoiceThree);

    var answerChoiceFour = document.createElement("button");
    answerChoiceFour.textContent = questionOne.choiceFour;
    answerChoiceFour.className = "btn";
    answerChoiceFour.setAttribute("id", questionOne.choiceFour);

    answerContainerEl.appendChild(answerChoiceFour);

    quizBox.appendChild(answerContainerEl);

} 

// function to load question upon button click
var firstQuestionLoad = function(event) {

    event.preventDefault();
    // remove initial quiz info elements from question box
    var quizInfoBox = document.querySelector(".quiz-box");
    quizInfoBox.remove()

    // create quiz elements
    var quizContainerEl = document.createElement("div");
    quizContainerEl.className = "quiz-box"; 

    questionFormEl();
    quizTimer();
}; 

// funciton to begin timer once user gets to first question
var quizTimer = function() {
    
    // function to count down
    setTimeout(function() {
        timer--;
        var timeLeft = document.querySelector("#timer");
        timeLeft.innerText = timer;
        if (timer > 0) {
            quizTimer();
        }
    }, 1000)
    console.log(timer);
}

quizBox.addEventListener("submit", firstQuestionLoad); 

// function to determine if the user selected the correct answer
