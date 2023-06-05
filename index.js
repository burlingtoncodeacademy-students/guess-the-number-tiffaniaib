const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  // CHOICE OF GAME 
  let gameChoice = await ask(`
GAME 1: you think of a number and I (the computer) try to guess it.
GAME 2: I (the computer) pick a number, and you have to guess it.
To play game1 insert g1, for game2 insert g2\n `);




  while (true) {
    if (gameChoice === "g1") {
      let computerGuess = null;
      let humanHint = null;

      //------------------------------------------------------------------------------------------------------
      console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
      let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
      // ! INVALID INPUT ERROR
      while (isNaN(secretNumber)) {
      console.log("ERROR, please insert a number");
      secretNumber= await ask("What is your secret number?\n");
      }
      console.log('You entered: ' + secretNumber);


      // CHOOSE THE HIGH RANGE
      // and store in a variable
      let min = 1;
      let max = await ask("Please choose the high range: ");
      max = parseInt(max);
      // ! INVALID INPUT ERROR
      while (isNaN(max)) {
        console.log("ERROR, please insert a number");
        max = await ask("What is your secret number?\n");
        }
      console.log(`I see. So you picked a number in between 1 and ${max}... what could it be?`);

      // WHILE LOOP
      // will have the computer generate its guess until the guess matches the secret number;
      while (computerGuess !== secretNumber) {
        // With this formula the computer generates a random number, in the range indicated by the user.
        computerGuess = Math.floor((Math.random() * (max - min +1) + min));
        humanHint = await ask(`Is it ${computerGuess}? y/n \n`);

        //! CHECK FOR THE CORRECT COMMAND
        if (humanHint !== "y" && humanHint !== "n") {
          console.log("ERROR, invalid input\n");

          while (humanHint !== "y" && humanHint !== "n") {
            humanHint = await ask("Try again\n");
            
          }
        }
        // LET THE COMPUTER WIN
        if (humanHint === "y") {
          console.log("You Won!!");
          let playAgain = await ask("Do you want to play another game? Answer y or n: ");
          // let y = true;
          // let n = false;
          playAgain === "y" ? start() : process.exit();
        }

        // THE COMPUTER GUESSED WRONG
        else {

          humanHint = await ask("Is it higher (h), or lower (l)?\n");
          // ! INVALID INPUT ERROR
          if (humanHint !== "h" && humanHint !== "l") {
            console.log("Invalid input. Try again\n");
            humanHint = await ask("Is it higher (h), or lower (l)?\n");
          }

          // Change of the range
          humanHint === "h" ? min = computerGuess + 1 : max = computerGuess - 1;
        }
      }

      process.exit();
    }

    else if (gameChoice === "g2") {
      // VARIABLE TO KEEP TRACK OF COMPUTER'S GUESS
      let numberOfGuesses = 0;
      // VARIABLE TO STORE THE PLAYER'S GUESS
      let playerGuess = null;

      //-------------------------------------------------------------------
      let min = await ask("Insert low range: ");
      min = parseInt(min);
      let max = await ask("Insert high range: ");
      max = parseInt(max);


      let secretNumber = Math.floor((Math.random() * (max - min + 1) + min));
      console.log(`Ok, I got it. I chose a number in between ${min} and ${max}. Good luck!`);



      while (playerGuess !== secretNumber) {

        playerGuess = await ask("What's your guess? ");
        playerGuess = parseInt(playerGuess);

        if (playerGuess < min || playerGuess > max) {
          console.log(`ERROR. ${playerGuess} is not in the range. Try again`);
        }


        else if (playerGuess > secretNumber) {
          console.log("Lower!");

          // We increment of 1 the number of guesses's value
          numberOfGuesses++
        }

        else if (playerGuess < secretNumber) {
          console.log(`${playerGuess} is too low. Guess higher!`);

          numberOfGuesses++

        }

        else {
          console.log("CONGRATULATIONS!!! You won!");
          numberOfGuesses++
          break
        }


      }

      console.log(`Well played! It only took you ${numberOfGuesses} guesses to find my number`);
      let playAgain = await ask("Do you want to play another game? Answer y or n: ");
      // let y = true;
      // let n = false;
      playAgain === "y" ? start() : process.exit();
    }

    else {
      // ! INVALID INPUT ERROR
      console.log("ERROR. Please select g1 or g2");
      gameChoice = await ask("To play game1 insert g1, for game2 insert g2\n");
    }
  }

}
