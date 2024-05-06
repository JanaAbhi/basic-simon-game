let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

let score = 0;

let highScore = 0;

//To start the game
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// user clicking colors
$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  // console.log(userChosenColor);

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
// To check user selection and gamePattern

function checkAnswer(currentLevel) {
  console.log(currentLevel);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over,Press Any key To Rest");
    startOver();
  }
}

//choosing seqence for the game

function nextSequence() {
  userClickedPattern = [];
  level++;
  score++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);

  if (score > highScore) {
    highScore = score;
  }
  $("#currentScore").text("Score:" + score);
  $("#score").text("High Score:" + highScore);
}

//sound while play and click
function playSound(name) {
  let sounds = new Audio("sounds/" + name + ".mp3");
  sounds.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level =0;
  score = -1;
  gamePattern = [];
  started = false;
}
