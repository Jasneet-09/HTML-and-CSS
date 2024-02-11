//  A List of questions with the question and the answer (text and correct)
const questions = [
    {
        question: "which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct:false},
            {text: "Blue Whale", correct:true},
            {text: "Elephant", correct:false},
            {text: "Giraffe", correct:false},
        ]
    },
    {
        question: "which is the smallest continent?",
        answers: [
            {text: "Asia", correct:false},
            {text: "Australia", correct:true},
            {text: "Africa", correct:false},
            {text: "Europe", correct:false},
        ]
    },
    {
        question: "3",
        answers: [
            {text: "1", correct:false},
            {text: "2", correct:false},
            {text: "3", correct:false},
            {text: "4", correct:true},
        ]
    },
    {
        question: "4",
        answers: [
            {text: "1", correct:true},
            {text: "2", correct:false},
            {text: "3", correct:false},
            {text: "4", correct:false},
        ]
    }
]
 
const questionElement = document.getElementById("question");  // variable for question
const answerButton = document.getElementById("answer-button"); // varaible for answer set
const nextButton = document.getElementById("next-btn"); // variable for next button

let currentQuestionIndex = 0; // varaible to maintain the index number
let score = 0; // varaible to maintian the score

// to start the quiz
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"; // innerHTML = "next" because we may write the "play again" in the next 
    showQuestion();
}

// Show the questions and answers in the innerHTML
function showQuestion(){
    resetState(); // reset the state i.e. it will remove the previous element from the list and insert the new data
    let currentQuestion = questions[currentQuestionIndex]; // store the question
    let questionNo = currentQuestionIndex + 1; // questionNo = 0(index) + 1 = 1
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question; // insert the question in the innerHTML

    currentQuestion.answers.forEach(answer => { // loop for accessing the text and correct of the answers
        const button = document.createElement("button"); // create a new button
        button.innerHTML = answer.text; // added or insert the text of answers in the button
        button.classList.add("btn"); // class="btn"
        answerButton.appendChild(button); // appended or inserted the button line by line in the div 
        if(answer.correct){
            button.dataset.correct = answer.correct; // dataset of button is equal to the answer.correct
        }
        button.addEventListener("click", selectAnswer); // when clicked on button the functin selectAnswer is called
    });
}


function resetState(){
    nextButton.style.display = "none"; // disappear the next button
    // console.log(answerButton.firstChild); firstelement of the answerButton is appeared/displayed
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild); // remove the elements of the answerButton one by one
    }
}

function selectAnswer(e){
    const selectedBtn = e.target; //returns the HTML element that triggered an event 
    // <button class="btn correct" data-correct="true" disabled="">Blue Whale</button>
    console.log(selectedBtn);
    const isCorrect = selectedBtn.dataset.correct === "true"; //The strict equality ( === ) operator checks whether its two operands are equal, returning a Boolean result
    //==  loose equality (double equals) 
    if(isCorrect){
        selectedBtn.classList.add("correct"); // class = "btn" => class="btn correct"
        score++; // and increase the correct as it is the correct answer
    }
    else{
        selectedBtn.classList.add("incorrect"); // class = "btn" => class="btn incorrect"
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; // disable the button functionality
    });
    nextButton.style.display = "block"; // display the next button
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{ // when clicked on next ...
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();