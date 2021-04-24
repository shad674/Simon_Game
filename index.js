
var name = prompt("What is your Name");
$("h2").append(name + "!");
var buttonColours = ["red","blue","green","yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//playing sound
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//the gray blink
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed")

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  },50);

}

//check answers
function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

  if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
        nextSequence();
      },1000);
    }
} else {
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass('game-over');
      },200);
    var au = new Audio("sounds/wrong.mp3");
    au.play();
    $("h1").text("Game Over, Press Any key to Restart");
    $("h2").text("good job! " + name); 
    startOver();
}

}

//restart the game
function startOver(){
  level = 0;
  gamePattern = [];
  started = true;
}


//the next sequence of colors
function nextSequence(){

  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  var currentColor = "#" + randomChosenColour;

  $(currentColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);



}

//the start of the game
if(!started){
  $(document).keypress(function(){
    nextSequence();
  });
  started = true;

}


//the clicked target
$(".btn").click(function(ev){
  var userChosenColour = ev.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})
