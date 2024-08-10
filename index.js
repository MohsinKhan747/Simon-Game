
let gamePattern = [];
let buttonColours = ['red','blue','green','yellow'];
let userClicked = [];
let started = false;
let level =  0;

$(document).click(function(){
    if(!started){
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    }
})

$('.btn').click(function(){
    let userChosenColor = $(this).attr('id');
    userClicked.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClicked.length-1);
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClicked[currentLevel]){
        if(userClicked.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        // console.log("Failure");
        playSound('wrong');
        $('body').addClass('game-over');
        $("#level-title").text("Game Over, Click Anywhere to Restart");
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        startover();
    }
        
    
}


function nextSequence(){
    userClicked = [];
    level ++;
    $('#level-title').text('Level ' + level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    

}

function animatePress(currentColor){
    $('#' + currentColor).addClass('pressed');

    setTimeout(function(){
        $('#' + currentColor).removeClass('pressed');
    },100);
}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function startover(){
    level = 0;
    gamePattern = [];
    started = false;
}


