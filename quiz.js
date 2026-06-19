const questions = [
    {
        question: "Which is largest animal in world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "What is the color of blood when it's inside your body?",
        answers: [
            { text: "Green", correct: false },
            { text: "Yellow", correct: false },
            { text: "White", correct: false },
            { text: "Red", correct: true },
        ]
    },
    {
        question: `Which planet is known as the "Red Planet"?`,
        answers: [
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Saturn", correct: false },
            { text: "Mercury", correct: false },
        ]
    },
    {
        question: "Which food item never spoils?",
        answers: [
            { text: "Cereal", correct: false },
            { text: "Beef Jerky", correct: false },
            { text: "Honey", correct: true },
            { text: "Beans", correct: false },
        ]
    }
];

let qus = document.querySelector(".qus");
let ansBtns = document.querySelector(".ans-btn");
let nextBtn = document.querySelector(".next-btn");


function quizStart() {
    let curntQusIndx = 0;
    var score = 0;
    nextBtn.innerHTML = "Next";  // as we change then in replay
    showQuestion();
};


function resetStatus() {
    nextBtn.style.display = "none";

    //loop Remove the first child element of answerButtons
    while (ansBtns.firstChild) {
        ansBtns.removeChild(ansBtns.firstChild);
    }
}

function selectAns(event) {

    let selectedBtn = event.target;
    if (selectedBtn.dataset.correct === 'true') {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // other button can not click if one click
    Array.from(ansBtns.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextBtn.style.display = "block";
};

function showQuestion() {
    // for hide next and ans btns
    resetStatus();

    // for show ques
    let curntQus = questions[curntQusIndx];
    let quesNo = curntQusIndx + 1;
    qus.innerHTML = quesNo + ". " + curntQus.question;

    // for show ans
    curntQus.answers.forEach((answr) => {
        let button = document.createElement("button");
        button.innerHTML = answr.text;
        button.classList.add("btn");
        ansBtns.appendChild(button);

        if (answr.correct) {  // if ans is true
            //Adds a data-correct="true" class to the button to indicate it's the right answer
            button.dataset.correct = answr.correct;
        }

        button.addEventListener("click", selectAns);
    });
};

function showScore() {
    resetStatus();
    qus.innerHTML = `Your Score is ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    curntQusIndx++;
    if (curntQusIndx < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (curntQusIndx < questions.length) {
        handleNextBtn();
    } else {
        quizStart();
    }
})

quizStart();