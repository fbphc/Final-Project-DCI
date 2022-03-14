const ps = require("prompt-sync")({ sigint: true });
const colors = require("colors");
const index = require("./index.js");

class Shrugman {
  constructor(jumpBack) {
    this.jumpBack = jumpBack;
    this.userName;
    this.answer = "";
    this.hint = "";
    this.guessedArray = [];
    this.mistakes = 0;
    this.emojiString = "";
    this.emoji = "¯\\_(:/)_/¯";
    this.isOver = false;
    this.userName = "";
    this.hiddenTitle = "";
    this.stats = [];
    this.category = {
      "Sci-fi": [
        {
          movie: "Dune",
          Hint: "// Sci-fi // Hint: Film director, David Lynch",
        },
        {
          movie: "They Live",
          Hint: "// Sci-fi // Hint: Film director, John Carpenter",
        },
        {
          movie: "Dark Star",
          Hint: "// Sci-fi // Hint: Film director, John Carpenter",
        },
        {
          movie: "Minority Report",
          Hint: "// Sci-fi // Hint: Main actor, Tom Cruise",
        },
        {
          movie: "Blade Runner",
          Hint: "// Sci-fi // Hint: Quote, You people wouldn't believe...",
        },
      ],
      Action: [
        {
          movie: "Kings Man",
          Hint: "// Action // Hint: Main actor, Taron Egerton",
        },
        {
          movie: "Red Notice",
          Hint: "// Action // Hint: Main Actress, Gal Gadot",
        },
        {
          movie: "Captain America",
          Hint: "// Action // Hint: A lot of comics before the movie",
        },
        {
          movie: "Free Guy",
          Hint: "// Action // Hint: Main Actor, Ryan Reynolds",
        },
        {
          movie: "Jungle Cruise",
          Hint: "// Action // Hint: Main Actor, Dwayne Johnson",
        },
      ],
      Romance: [
        {
          movie: "Upside Town",
          Hint: "// Romance // Hint: Main Actress, Kirsten Dunst",
        },
        {
          movie: "Sex List",
          Hint: "// Romance // Hint: Main Actor, Chris Evans",
        },
        {
          movie: "Little Women",
          Hint: "// Romance // Hint: Film adaptation of the very famous novel",
        },
        {
          movie: "Honey Boy",
          Hint: "// Romance // Hint: Writer and actor Shia LaBeouf",
        },
        {
          movie: "Chasing Amy",
          Hint: "// Romance // Hint: Writer and film director Kevin Smith, 1997",
        },
      ],
      Comedy: [
        {
          movie: "Deadpool",
          Hint: "// Comedy // Hint: Film adaptation of a famous Marvel comic",
        },
        {
          movie: "Ted",
          Hint: "// Comedy // Hint: Voice of the main character, Seth MacFarlane",
        },
        {
          movie: "Get Hard",
          Hint: "// Comedy // Hint: Main actor: Will Ferrell",
        },
        {
          movie: "Sausage Party",
          Hint: "// Comedy // Hint: Adult computer-animated film directed by Conrad Vernon",
        },
        {
          movie: "Ace Ventura",
          Hint: "// Comedy // Hint: Main Actor, Jim Carrey",
        },
      ],
    };
  }
  start(name) {
    this.userName = colors.red.bold(name);
    console.log(
      colors.magenta.bold(`
    __ |__   __         __   __ __   __   __  
  __)  |  ) |  ' (__)  (__| |  )  ) (__( |  ) 
                        __/                   `)
    );
    console.log(
      `\nRemember you have 10 ${colors.red(
        "mistakes"
      )}, then it's over!\nAt any time you want to stop the game type ${colors.green.bold(
        "Strg+C"
      )}\n\nPlease ${this.userName} Choose a ${colors.green.bold("category")}\n`
    );
    this.generateTitle();
    this.playTheGame();
  }
  generateTitle() {
    console.log(
      `Categories:\n${colors.green("Sci-fi")} [Type-${colors.green(
        "S"
      )}], ${colors.red("Action")} [Type-${colors.red("A")}], ${colors.magenta(
        "Romance"
      )} [Type-${colors.magenta("R")}], ${colors.red(
        "Comedy"
      )} [Type-${colors.red("C")}], ${colors.yellow(
        "Random"
      )} [Type-${colors.green("Random")}] `
    );
    let selectACategory = ps();
    let random;
    let categoryToChoose = "";
    if (selectACategory.toLowerCase() === "s") {
      categoryToChoose = this.category["Sci-fi"];
    } else if (selectACategory.toLowerCase() === "a") {
      categoryToChoose = this.category["Action"];
    } else if (selectACategory.toLowerCase() === "r") {
      categoryToChoose = this.category["Romance"];
    } else if (selectACategory.toLowerCase() === "c") {
      categoryToChoose = this.category["Comedy"];
    } else if (selectACategory.toLowerCase() === "random") {
      const arrList = Object.keys(this.category).map(
        (movie) => this.category[movie]
      );
      categoryToChoose = arrList[Math.floor(Math.random() * arrList.length)];
    } else {
      return this.generateTitle();
    }
    random =
      categoryToChoose[Math.floor(Math.random() * categoryToChoose.length)];
    this.answer = random.movie;
    this.hint = random.Hint;
  }
  playTheGame() {
    console.clear();
    if (
      this.mistakes === 10 ||
      this.guessedArray.length === this.answer.length
    ) {
      return this.gameControl();
    }
    this.hiddenTitle = this.answer
      .split("")
      .map((char) => {
        if (this.guessedArray.includes(char.toLowerCase())) {
          char = colors.yellow.bold(char);
        } else if (char === " ") {
          char = " ";
          this.guessedArray.push(" ");
        } else {
          char = colors.green.bold("_");
        }
        return char;
      })
      .join(" ");

    console.clear();
    console.log(
      `${colors.bgGreen.black(this.hint)}\n\n \n${
        this.hiddenTitle
      }\n \n${colors.rainbow(this.emojiString)}\n`
    );
    this.guess();
    return this.hiddenTitle;
  }
  guess() {
    if (this.isOver === false) {
      const guessedChar = ps(`Type ${colors.green("one")} letter `);

      if (guessedChar.length > 1 || guessedChar === "" || guessedChar === " ") {
        console.log(
          `Too many or no-${colors.red(
            "letters"
          )} at the same time ${colors.red(":)")} Try again!`
        );
        this.guess();
        this.playTheGame();
      } else if (
        this.answer.toLowerCase().includes(guessedChar.toLowerCase())
      ) {
        if (!this.guessedArray.includes(guessedChar)) {
          for (const x of this.answer) {
            if (guessedChar === x.toLowerCase()) {
              this.guessedArray.push(guessedChar);
            }
          }
        }
        this.playTheGame();
        this.guess();
      } else {
        this.emojiString = "";
        this.mistakes++;
        for (let i = 0; i < this.mistakes; i++) {
          this.emojiString += this.emoji[i];
        }
        this.playTheGame();
        this.guess();
      }
    }
  }
  gameControl() {
    this.isOver = true;
    let actualGame = {};
    actualGame.title = this.answer;
    this.stats.push(actualGame);
    if (this.mistakes === 10) {
      console.log(`${colors.yellow(this.userName)} you lost!\n`);
      actualGame.winOrLost = "lost";
    } else {
      console.log(`${colors.yellow(this.userName)} you won!\n`);
      actualGame.winOrLost = "won";
    }
    for (const x of this.stats) {
      console.log(
        `Movie: ${colors.green(x.title)}, you ${colors.yellow(x.winOrLost)}`
      );
    }
    console.log(
      `\nDo you wanna play ${colors.rainbow(
        "another Game"
      )}? y/n\nIf you want to ${colors.magenta(
        "change game"
      )} [Type - ${colors.red.bold("C")}]`
    );
    let anotherGame = ps("");
    if (anotherGame[0].toLowerCase() === "y") {
      this.guessedArray = [];
      this.mistakes = 0;
      this.emojiString = "";
      this.isOver = false;
      this.generateTitle();
      this.playTheGame();
    } else if (anotherGame[0].toLowerCase() === "n") {
      return console.log(`${colors.green("Ok maybe next time!")}`);
    } else if (anotherGame[0].toLowerCase() === "c") {
      return this.jumpBack.gameSelector();
    }
  }
}
module.exports = Shrugman;
