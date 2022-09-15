var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;
var newGame = true;

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    $("#"+randomChosenColour).fadeOut().fadeIn();
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#level-title").text("Level " + ++level);
}

$(".btn").click(function(){ 
    //$(this).fadeOut(200).fadeIn(200);
    var clickedButton = $(this).attr("id");
    userClickedPattern.push(clickedButton);
    animatePress(clickedButton);
    playSound(clickedButton);
    checkAnswer((userClickedPattern.length-1));
    });
    

function playSound(name){    
    var sound = new Audio("./sounds/"+name+".mp3");
    sound.play();
}


function animatePress(currentColour){
    $("."+currentColour).toggleClass("pressed");
    setTimeout(function(){$("."+currentColour).toggleClass("pressed")}, 100);
}

$(document).keydown(function(){
    if (newGame){
    nextSequence();
    newGame = false;
    }
});


function startOver(){
    level = 0;
    gamePattern = [];
    newGame = true;
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success");
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(nextSequence,1000);

        }
    }
    else{
        console.log("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart")
        $("body").toggleClass("game-over");
        setTimeout(function(){$("body").toggleClass("game-over");},200)
        startOver();
    }
} 


