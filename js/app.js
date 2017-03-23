// Settings for changes without much coding
var settings = {};
settings.cardAnimation = {};
settings.cardAnimation.duration = {};
settings.cardAnimation.delay = {};

// Card animation settings
settings.cardAnimation.perspectiveOrigin = "center";
settings.cardAnimation.direction = "normal";
settings.cardAnimation.flip = "left";
settings.cardAnimation.turns = "1";
settings.cardAnimation.overshoot = "0%";
settings.cardAnimation.duration.value = "900ms";
settings.cardAnimation.duration.randomness = "0%";
settings.cardAnimation.timing = "ease";
settings.cardAnimation.delay.value = "1ms";
settings.cardAnimation.delay.randomness = "0%";

var questions, randomNumber;
var questionMode = false;
var questionHistory = [];
var ruleDiv = document.getElementById("rule");
var cardDiv = document.getElementById("card");
var backBtn = document.getElementById("backBtn");
var nextBtn = document.getElementById("nextBtn");
var editbtn = document.getElementById("editBtn");

function getQuestions() {
  Papa.parse("data/questions.csv", {
    download: true,
    complete: function(results) {
      questions = results.data;
      ruleDiv.innerHTML = "Trivia with " + questions.length + " questions!";
    }
  });
}

function cardClicked() {
  if(questionMode) showAnswer(); 
  else getQuestion();
  startAnimation();
}

function getQuestion() {
  randomNumber = Math.floor(Math.random() * (questions.length - 1));
  ruleDiv.innerHTML = questions[randomNumber][2];
  nextBtn.innerHTML = "answer";
  ruleDiv.style.fontStyle = 'normal';
  questionMode = true;
}

function showAnswer() {
  ruleDiv.innerHTML = questions[randomNumber][3];
  questionHistory.push(questions[randomNumber][0]);
  nextBtn.innerHTML = "next";
  ruleDiv.style.fontStyle = 'italic';
  questionMode = false;
}

function startAnimation(type) {
  alicejs.cheshire({"perspectiveOrigin": settings.cardAnimation.perspectiveOrigin,"direction": settings.cardAnimation.direction,"elems": ["card"],"flip": settings.cardAnimation.flip,"turns": settings.cardAnimation.turns,"overshoot": settings.cardAnimation.overshoot,"duration": {"value": settings.cardAnimation.duration.value,"randomness": settings.cardAnimation.duration.randomness},"timing": settings.cardAnimation.timing,"delay": {"value": settings.cardAnimation.delay.value,"randomness": settings.cardAnimation.delay.randomness},"iteration": "1","playstate": "running"});
}

function goBack() {
  if(questionHistory.length == 0) return;
  startAnimation();
  randomNumber = questionHistory.pop();
  ruleDiv.innerHTML = questions[randomNumber][2];
  ruleDiv.style.fontStyle = 'normal';
  questionMode = true;
}

function edit() {
  //alert("question ID is " + randomNumber);
  var editMessage = "Enter your edit";
  var questionEdit = {};
  questionEdit.id = randomNumber;
  if(!questionMode) questionEdit.answer = prompt(editMessage, questions[randomNumber][2]);
  else questionEdit.question = prompt(editMessage, questions[randomNumber][1]);
  console.log(questionEdit);
  $.post( "https://graniteapps.co/services/email/send", questionEdit, function( data ) {
    data = JSON.parse(data);
    alert(data.message);
  });
}

window.addEventListener('DOMContentLoaded', getQuestions);
nextBtn.addEventListener("click", cardClicked);
backBtn.addEventListener("click", goBack);
editbtn.addEventListener("click", edit);
