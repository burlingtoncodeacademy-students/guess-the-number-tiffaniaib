const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

start();

async function start() {
    console.log("Let's play a game where I think of a number and you try to guess it!\n");

    // USER CHOOSES LOWER BOUND OF THE RANGE (value is stored in a variable).
    // We do the same thing for the upper bound.
    let min = await ask("Insert low range: ");
    min = parseInt(min);

    let max = await ask("Insert high range: ");
    max = parseInt(max);

    // COMPUTER PICKS A NUMBER
    let secretNumber = Math.floor((Math.random() * (max - min + 1) + min));
    console.log(`I'm ready! I chose a number in between ${min} and ${max}.`);


    let playerGuess = 0;
    while (playerGuess !== secretNumber) {
        let playerGuess = await ask("What's your guess?\n");
        playerGuess = parseInt(playerGuess);

        if (playerGuess < min || playerGuess > max) {
            console.log(`ERROR. ${playerGuess} is not in the range. Try again`);
        }
        else if (playerGuess > secretNumber) {
            console.log("Lower!");}
            else if (playerGuess < secretNumber) {
                console.log(`${playerGuess} is too low. Guess higher!`);
            } else {
                console.log("Congratulations you won!");
                break;
            }
    }
    process.exit();
}