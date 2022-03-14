const ps = require("prompt-sync")({ sigint: true });
const colors = require("colors");
const gameShrug = require("./shrugman.js");
const gameBulls = require("./bullsAndCows.js");

class Game {
  constructor() {
    this.playerName = "";
  }
  getUserInfo() {
    console.log(colors.bold.magenta(`
                __                                 _
__  _  __ ____ |  |   ____  ____   _____   ____   | |
\\ \\/ \\/ // __ \\|  | _/ ___\\/  _ \\ /     \\_/ __ \\  | |
 \\     /\\  ___/|  |_\\  \\__(  <_> )  Y Y  \\  ___/   \\|
  \\/\\_/  \\___  |____/\\___  >____/|__|_|  /\\___  >  __
             \\/          \\/            \\/     \\/   \\/
`));
    this.playerName = ps(
      `Hello ${colors.yellow("Stranger")}! please enter your ${colors.yellow(
        "name"
      )}: `
    );
    if (this.playerName === "") {
      this.playerName = colors.red.bold("Warrior");
    }
    console.log(
      `Ok ${colors.red(this.playerName)}! What do you want to play today?\n`
    );
    this.gameSelector();
  }
  gameSelector() {
    console.log(
      `${colors.red("Shrugman")} [Type - ${colors.green(
        "S"
      )}] - | - | - ${colors.red("Bulls and Cows")} [Type - ${colors.green("B")}]`
    );

    const gameSelector = ps();
    if (gameSelector[0].toLowerCase() === "s") {
      const shrugMan = new gameShrug(game);
      console.clear();
      shrugMan.start(this.playerName);
    } else if (gameSelector[0].toLowerCase() === "b") {
      const bullsAndCows = new gameBulls(game);
      console.clear();
      bullsAndCows.start(this.playerName);
    }
  }
}

const game = new Game();
game.getUserInfo();
