var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Correct!");

    if(userClickedPattern.length === gamePattern.length){
      console.log("Sequence complete!");

      setTimeout(function (){
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong!");

    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200)

    $("#level-title").text("Game Over, Press Any Key To Restart");

    startOver();
   }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); //Generate random number
  var randomChosenColor = buttonColors[randomNumber]; //Select values from array based on random number
  gamePattern.push(randomChosenColor); // Push the random number into an another array
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100); //
  playSound(randomChosenColor);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}