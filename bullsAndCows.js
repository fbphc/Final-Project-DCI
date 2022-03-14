const ps = require("prompt-sync")({ sigint: true });
const colors = require("colors");

class BullsAndCows {
  constructor(jumpBack) {
    this.jumpBack = jumpBack;
    this.userName;
    this.secretNumber = "";
    this.randomMex;
    this.attempts = 0;
    this.playedGameCounter = 0;
    this.stats = [];
    this.attemptsLimit = Infinity;
    this.mode = "Easy";
  }
  start(name) {
    this.userName = colors.red.bold(name);
    console.log(
      colors.magenta.bold(`
    |__        |   |     __      __   __   __|      __   __            __ 
    |__) (__(_ |_, |_, __)      (__( |  ) (__|     (___ (__) (__(__( __)  \n`)
    );
    this.modeSelect();
  }
  modeSelect() {
    console.log(
      `Ok ${this.userName} choose the level!\n${colors.green.underline(
        "\nDifficulty Level:"
      )}\n\n${colors.magenta.underline("Easy")} [Type ${colors.red.bold(
        "any Key"
      )}] No limits of attempts\n${colors.magenta.underline(
        "Medium"
      )} [Type ${colors.red.bold(
        "M"
      )}] Max attempts 20\n${colors.magenta.underline(
        "Hard"
      )} [Type ${colors.red.bold("H")}] Max attempts 10\n`
    );
    const difficultyMode = ps();
    if (difficultyMode[0].toLowerCase() === "m") {
      this.attemptsLimit = 20;
      this.mode = "Medium";
    } else if (difficultyMode[0].toLowerCase() === "h") {
      this.attemptsLimit = 10;
      this.mode = "Hard";
    }
    this.generateSecretNumber(this.secretNumber);
  }
  generateSecretNumber() {
    console.clear();
    if (this.secretNumber.length === 4) {
      this.playedGameCounter++;
      return this.playTheGame();
    } else {
      for (let i = 0; i < 4; i++) {
        const numb = Math.floor(Math.random() * 10);
        if (!this.secretNumber.includes(numb)) this.secretNumber += numb;
        return this.generateSecretNumber();
      }
    }
  }
  playTheGame() {
    this.randomMessage();
    console.log(
      `// ${colors.red.bold(this.userName)} | Attempts: ${colors.yellow.bold(
        this.attempts
      )} - Mode: ${colors.yellow.bold(this.mode)}`
    );
    const counter = {
      bulls: 0,
      cows: 0,
    };

    console.log(
      colors.rainbow(` _       _       _       _
/ \\     / \\     / \\     / \\   
 X       X       X       X               
\\_/     \\_/     \\_/     \\_/
`)
    );
    console.log(this.secretNumber);
    const userNumber = ps(`${colors.green("Your number:")} `);
    const regEx = /^(?!.*(.).*\1)\d{4}$/;
    this.attempts++;
    if (
      !regEx.test(
        userNumber
      ) /*WITHOUT REGEX  || Number.isNaN(+userNumber) || userNumber.length !== 4 */
    ) {
      console.log(
        `Please insert a ${colors.red("number")}, ${colors.green(
          "remember"
        )} it has to be ${colors.red("4")} digits ${colors.red(
          "long"
        )} and without ${colors.red("repetition")}`
      );
    } else {
      for (let i = 0; i < this.secretNumber.length; i++) {
        if (this.secretNumber[i] === userNumber[i]) {
          counter["bulls"]++;
        } else if (this.secretNumber.includes(userNumber[i])) {
          counter["cows"]++;
        }
      }
    }
    console.log(
      `\n${colors.blue.bold("| - ")}🦬   ${colors.yellow.bold(
        counter.bulls
      )}${colors.blue.bold(" - | - ")}🐮  ${colors.yellow.bold(
        counter.cows
      )}${colors.blue.bold(" - |")}\n`
    );
    if (userNumber === this.secretNumber) {
      return this.controlGame("won");
    } else if (this.attempts === this.attemptsLimit) {
      return this.controlGame("lost");
    }
    if (counter.bulls === 0 && counter.cows === 0) {
      console.log(this.randomMex);
    }
    ps("Next try");
    console.clear();
    return this.playTheGame();
  }
  randomMessage() {
    const randomArrayMes = [
      `${colors.rainbow(
        "Talent"
      )} hits a target no one else can hit... ${colors.rainbow(
        "Genius"
      )} hits a target no one else can see.`,
      `If at first you don’t succeed, then ${colors.rainbow(
        "skydiving"
      )} definitely isn’t for you.`,
      `If you don’t know where you are going, you might wind up ${colors.rainbow(
        "somewhere else"
      )}`,
      `0 ${colors.rainbow("bulls")} and 0 ${colors.rainbow(
        "cows"
      )} ... I can't say you're a ${colors.rainbow("cowboy")}!`,
      `The secret of success is to go from ${colors.rainbow(
        "mistake"
      )} to ${colors.rainbow("mistake")} without losing your enthusiasm.`,
      `The road to success is always under ${colors.rainbow("construction")}`,
      `You are putting the ${colors.rainbow("Pro")} in ${colors.rainbow(
        "procrastinate"
      )}`,
    ];
    let randomIndex = Math.floor(Math.random() * randomArrayMes.length);

    return (this.randomMex = randomArrayMes[randomIndex]);
  }
  controlGame(x) {
    console.clear();
    if (x === "won") {
      console.log(
        `Well done ${colors.red(this.userName)}, you ${colors.red(x)}!\n`
      );
    } else {
      console.log(
        `Sorry ${colors.red(this.userName)}, you ${colors.red(x)}!\n`
      );
    }
    let scoreBoard = {};
    scoreBoard.game = this.playedGameCounter;
    scoreBoard.attempts = this.attempts;
    scoreBoard.result = x;
    this.stats.push(scoreBoard);
    for (const x of this.stats) {
      console.log(
        `Game Nr.${colors.bgGreen.black(x.game)}, you ${colors.green.bold(
          x.result
        )} with ${colors.green(x.attempts)} attempts`
      );
    }
    console.log(
      `\nWhat do you think of ${colors.red(
        "another"
      )} round? y/n\nIf you want to ${colors.magenta(
        "change game"
      )} [Type - ${colors.red.bold("C")}]`
    );
    const anotherGame = ps("");
    if (anotherGame[0].toLowerCase() === "y") {
      this.attempts = 0;
      this.secretNumber = "";
      console.clear();
      return this.modeSelect();
    } else if (anotherGame[0].toLowerCase() === "n") {
      return console.log(`Ok maybe ${colors.green("next time")} ;)`);
    } else if (anotherGame[0].toLowerCase() === "c") {
      return this.jumpBack.gameSelector();
    }
  }
}
module.exports = BullsAndCows;
