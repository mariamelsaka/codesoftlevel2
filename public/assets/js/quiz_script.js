const questions=[
    {
        question:"what is the largest animal in the world",
        answers:[
            {text:"shark",correct:"false"},
            {text:"blue whale",correct:"true"},
            {text:"elephant",correct:"false"},
            {text:"dog",correct:"false"},
        ],
    },
    {
        question:"what is the tallest building in the world",
        answers:[
            {text:"tower",correct:"false"},
            {text:"khalifa tower",correct:"true"},
            {text:"pizza tower",correct:"false"},
            {text:"evil tower",correct:"false"},
        ],
    }
]

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextBtn=document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score=0;

function StartQuiz() {
    currentQuestionIndex=0;
    score=0;
    nextBtn.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("Btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextBtn.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
const selectedBtn=e.target;
const isCorrect=selectedBtn.dataset.correct=="true";
if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
}else{
    selectedBtn.classList.add("incorrect");
}
Array.from(answerButtons.children).forEach(button=>{
    if(button.dataset.correct==="true"){
        button.classList.add("correct");
    }
    button.disabled=true;
});
nextBtn.style.display="block";

}

function showScore(){
    resetState();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML="play again";
    nextBtn.style.display="block";

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex <questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        StartQuiz();
    }
})


StartQuiz();


