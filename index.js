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
  // Now try and complete the program.

  // Choose the high range
  // and store in a variable
  let min = 1;
  let max = await ask("Please choose the high range: ");
  max = parseInt(max);


  let computerGuess = 0;


  let humanHint = null;



  while (computerGuess !== secretNumber) {
    computerGuess = Math.floor((Math.random() * (max - min + 1) + min));
    humanHint = await ask(`Is it ${computerGuess}? y/n \n`);

    if (humanHint !== "y" && humanHint !== "n") {
      console.log("ERROR");

      while (humanHint !== "y" && humanHint !== "n") {
        humanHint = await ask("Invalid input. Try again\n");
        process.exit();
      }
    }

      if (humanHint === "y") {
        console.log("Congratulations! You got it!!");
        
      }

      else {

        humanHint = await ask("Is it higher (h), or lower (l)?\n");

        humanHint === "h" ? min = computerGuess + 1 : max = computerGuess - 1;

      }
    
  }

  process.exit();
}
