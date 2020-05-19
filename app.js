/*

GAME FUNCTIONS:
- player must guess a number between a min and max
- player has a certain amount of guesses
-notify player of remaining tries
-notify the player of the correct answer if lose
-notify player of correct answer
-let player chose to play again
*/

// create variable - Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;
    

// UI elements

const gameWrapper = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#input-number'),
      guessBtn = document.querySelector('#submit-button'),
      message = document.querySelector('.message');

 
   
// assign min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again btn Listner, use delegation (parent)
gameWrapper.addEventListener/*'click' doesnt do what we expect*/
('mousedown', function(e){
  
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})

// create event listener
// Listen for Guess

guessBtn.addEventListener('click',function(){
  
  // the input is a number so we need to convert it !
  let guess = parseInt(guessInput.value);
  console.log(typeof(guess));
  // validate, make sure its a number and between 1 and 10, not an NaN
  if ( isNaN(guess)|| guess < min || guess > max){
    
    setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
  }
  // check if winning number
  if(guess === winningNum){
    // game over, won
    gameOver(true,`Congratulations ${winningNum} is correct.`);
  } else { 
    // wrong number
    // subtract 1 to guesses left
    guessesLeft -= 1;
     // same as guessesLeft = guessesLeft - 1;
   

    if(guessesLeft === 0){
      // game over, lost
      gameOver(false, `Game Over, you lost, the correct number was ${winningNum}`)
      // guessInput.disabled = true;
      // setMessage(`Game Over, you lost, the correct number was ${winningNum}`, "red");
      
    } else {
    // game continues, answer wrong
    // set border color
    guessInput.style.borderColor = "red";
    // message try again
    setMessage(`${guess} is wrong,${guessesLeft} guesses left.`, 'red');
    // clear input
  guessInput.value = "";
    };
  };
  })

 
// to make things easier we can create a function
function gameOver(won,msg){
  let color;
  won === true ? color = "green" : color = "red";
  // disable input
  guessInput.disabled = true;
  // border color
  guessInput.style.borderColor = color;
  // message color
  message.style.color = color;
  setMessage(msg);
// play again ?
 guessBtn.value = "Play Again";
guessBtn.className += "play-again";
}

// get random winning number
function getRandomNum(min,max){
 return Math.floor(Math.random()*(max-min+1)+min);
  
}
// set message
// call the 2 parameters seen up there, depending on the parameters !
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}

