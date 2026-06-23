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

// MOVED OUTSIDE: Shared global state variables
let curntQusIndx = 0;
let score = 0;

function quizStart() {
    // RESET VALUES: Do not use 'let' or 'var' here
    curntQusIndx = 0;
    score = 0;
    nextBtn.innerHTML = "Next"; 
    showQuestion();
};

function resetStatus() {
    nextBtn.style.display = "none";
    while (ansBtns.firstChild) {
        ansBtns.removeChild(ansBtns.firstChild);
    }
}

function selectAns(event) {
    let selectedBtn = event.target;
    if (selectedBtn.dataset.correct === 'true') {
        selectedBtn.classList.add("correct");
        score++; // Properly increments the global score tracker
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(ansBtns.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
};

function showQuestion() {
    resetStatus();
    let curntQus = questions[curntQusIndx]; // Properly reads the global question pointer
    let quesNo = curntQusIndx + 1;
    qus.innerHTML = quesNo + ". " + curntQus.question;

    curntQus.answers.forEach((answr) => {
        let button = document.createElement("button");
        button.innerHTML = answr.text;
        button.classList.add("btn");
        ansBtns.appendChild(button);
        if (answr.correct) {
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
    curntQusIndx++; // Increments correctly across quiz iterations
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
});

// Run application
quizStart();
