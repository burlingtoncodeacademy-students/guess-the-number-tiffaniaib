const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  

  // CHOOSE THE HIGH RANGE
  // and store in a variable
  let min = 1;
  let max = await ask("Please choose the high range: ");
  max = parseInt(max); 


  let computerGuess = 0;


  let humanHint = null;

// WHILE LOOP
// will have the computer generate its guess until the guess matches the secret number;
  while (computerGuess !== secretNumber) {
// With this formula the computer generates a random number, in the range indicated by the user.
    computerGuess = Math.floor((Math.random() * (max - min + 1) + min));
    humanHint = await ask(`Is it ${computerGuess}? y/n \n`);

// CHECK FOR THE CORRECT COMMAND
    if (humanHint !== "y" && humanHint !== "n") {
      console.log("ERROR");

      while (humanHint !== "y" && humanHint !== "n") {
        humanHint = await ask("Invalid input. Try again\n");
        process.exit();
      }
    }
// THE COMPUTER THE COMPUTER WON
      if (humanHint === "y") {
        console.log("Congratulations! You got it!!");
        process.exit();
      }

// THE COMPUTER GUESSED WRONG
      else {

        humanHint = await ask("Is it higher (h), or lower (l)?\n");

// Change of the range
        humanHint === "h" ? min = computerGuess + 1 : max = computerGuess - 1;
      }
  }

  process.exit();
}
