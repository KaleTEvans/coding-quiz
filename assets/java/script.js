/* Code Quiz
Upon opening the page, the user will be presented with tbe quiz directions and the options to either view the high score 
or start the quiz. 
* Clicking to view the high score will take the user to a separate page where the stored high score is displayed
* Clicking the start quiz button will begin the quiz
    1. Create an array of 10 items with each item containing the quiz questions and answer choices
        * The correct answer choice will be set to a value of true, with the rest set to a value of false
    2. Create a randomizer function that will select a quiz question from the array at random 
    3. Create a timer function that will count the timer down once the start quiz button is selected and subtracts 5
        every time the selected answer returns false
            3a. exit the function and skip to the results page once the timer reaches zero
            3b. reset the timer each time the initial page is loaded
    4. Create a function that will create html elements for any question array element that is selected
    5. Load a results page once all questions are completed or once the timer runs out 

*/

var quizBox = document.querySelector("#quiz-content");

var questionOne = function() {

    // create question text element
    var questionTextEl = document.createElement("div");
    questionTextEl.className = "questionEl";
    questionTextEl.innerHTML = "<h2 class='question'>Which of the following is the correct syntax for declaring an array?</h2>";

    quizBox.appendChild(questionTextEl);

    // add four buttons for answer choices
    var answerContainerEl = document.createElement("div");
    answerContainerEl.className = "answer-choices";

    var answerChoiceOne = document.createElement("button");
    answerChoiceOne.textContent = "var a = []";
    answerChoiceOne.className = "btn";
    answerChoiceOne.setAttribute("id", true);

    answerContainerEl.appendChild(answerChoiceOne);

    var answerChoiceTwo = document.createElement("button");
    answerChoiceTwo.textContent = "var a = {}";
    answerChoiceTwo.className = "btn";
    answerChoiceTwo.setAttribute("id", false);

    answerContainerEl.appendChild(answerChoiceTwo);

    var answerChoiceThree = document.createElement("button");
    answerChoiceThree.textContent = "a = {}";
    answerChoiceThree.className = "btn";
    answerChoiceThree.setAttribute("id", false);

    answerContainerEl.appendChild(answerChoiceThree);

    var answerChoiceFour = document.createElement("button");
    answerChoiceFour.textContent = "a = []";
    answerChoiceFour.className = "btn";
    answerChoiceFour.setAttribute("id", false);

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

    questionOne();
}; 

quizBox.addEventListener("submit", firstQuestionLoad); 