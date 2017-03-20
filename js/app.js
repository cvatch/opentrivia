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
var ruleDiv = document.getElementById("rule");
var cardDiv = document.getElementById("card");

function getQuestions() {
  Papa.parse("data/questions.csv", {
    download: true,
    complete: function(results) {
      questions = results.data;
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
  questionMode = true;
}

function showAnswer() {
  ruleDiv.innerHTML = questions[randomNumber][3];
  questionMode = false;
}

function startAnimation(type) {
  alicejs.cheshire({"perspectiveOrigin": settings.cardAnimation.perspectiveOrigin,"direction": settings.cardAnimation.direction,"elems": ["card"],"flip": settings.cardAnimation.flip,"turns": settings.cardAnimation.turns,"overshoot": settings.cardAnimation.overshoot,"duration": {"value": settings.cardAnimation.duration.value,"randomness": settings.cardAnimation.duration.randomness},"timing": settings.cardAnimation.timing,"delay": {"value": settings.cardAnimation.delay.value,"randomness": settings.cardAnimation.delay.randomness},"iteration": "1","playstate": "running"});
}

window.addEventListener('DOMContentLoaded', getQuestions);
cardDiv.addEventListener("click", cardClicked);
