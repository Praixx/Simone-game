
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


var level = "0";

var started = false;

$(document).keypress(function() {

    if(!started){
        $("#level-title").text("level " + level);
        nextSquence();
        started = true;
    }

});

function nextSquence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("level " + level);
    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("." + randomChosenColour).fadeIn('100').fadeOut('100').fadeIn('100');
    playSound(randomChosenColour);

}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  
})

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}







function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("success");
        
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
                nextSquence();
            }, 1000);
        }

    }  else {
        console.log("wrong");

        if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
           
            playSound("wrong");

            $("body").addClass("game-over");
                 setTimeout(function() {
             $("body").removeClass("game-over");
             }, 200);

             


             $("#level-title").text("Game over, Press any key to restart" );

            
            }

            startOver();

 }

}


function startOver() {
    level = "0";
    gamePattern = [];
    started = false;

}


    
     