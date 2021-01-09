//W3 Schools
$("#begin").click(function () {
  //Webdeveloper.com
  this.style.visibility = "hidden";

  document.getElementById("instructions").style.fontSize = "20px";
  document.getElementById("instructions").style.height = "50px";
  document.getElementById("instructions").style.width = "100px";
  document.getElementById("instructions").style.marginLeft = "320px";

  $(".game-screen").toggle();
  resetGame();
});

$("#instructions").click(function () {
  $("#instruction-screen").toggle();
});

//NOTE this makes the timer work
$("#pause").click(function () {
  if (document.getElementById("pause").innerHTML === "Pause") {
    timerFuncs.pause();
    document.getElementById("pause").innerHTML = "Resume";
    document.getElementById("table").style.color = "white";
  } else {
    timerFuncs.resume();
    document.getElementById("pause").innerHTML = "Pause";
    document.getElementById("table").style.color = "black";
  }
});

let randomLetter;
let word = [];
let points = 0;

//NOTE //Letter Bank for Squares to choose from
let letterBank = [
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
  "B",
  "B",
  "C",
  "C",
  "D",
  "D",
  "D",
  "D",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "F",
  "F",
  "G",
  "G",
  "G",
  "H",
  "H",
  "I",
  "I",
  "I",
  "I",
  "I",
  "I",
  "I",
  "I",
  "I",
  "J",
  "K",
  "L",
  "L",
  "L",
  "L",
  "M",
  "M",
  "N",
  "N",
  "N",
  "N",
  "N",
  "N",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "P",
  "P",
  "Q",
  "R",
  "R",
  "R",
  "R",
  "R",
  "R",
  "S",
  "S",
  "S",
  "S",
  "T",
  "T",
  "T",
  "T",
  "T",
  "T",
  "U",
  "U",
  "U",
  "U",
  "V",
  "V",
  "W",
  "W",
  "X",
  "Y",
  "Y",
  "Z",
];

let letterBoard = [];

//NOTE //Getting 16 random letters from the letter bank
let getLetter = function () {
  randomLetter = letterBank[Math.floor(Math.random() * letterBank.length)];

  return randomLetter;
};
let generateArr = function () {
  for (let a = 0; a < 16; a++) {
    //NOTE // Generates array to hold random letters
    letterBoard.push(getLetter());
    letterBank.splice(letterBank.indexOf(randomLetter), 1);
  }
};

generateArr();

console.log(letterBoard);
console.log(letterBank);

//NOTE Reset Game

function resetGame() {
  document.getElementById("current-level").innerHTML = currentLevel;
  if (currentLevel === 3) {
    document.getElementById("next-level").innerHTML = "win the game!";
  } else {
    document.getElementById("next-level").innerHTML =
      "Level " + (currentLevel + 1);
  }
  document.getElementById("required-points").innerHTML =
    levelPoints[currentLevel - 1];
  word = [];
  letterBoard = [];
  score = [];
  totalScore = [];
  getLetter();
  generateArr();
  renderBoard();
  $(".game-ltrs").remove();
  clearInterval(timerFuncs.interval);
  delete timerFuncs.interval;
  timerFuncs.counter = 60;
  timerFuncs.start();

  document.getElementById("word-list").innerHTML = "";
  document.getElementById("point-list").innerHTML = "";
  document.getElementById("running-points").innerHTML = "0";
}

//NOTE Reset Button

$("#reset-button").click(function () {
  resetGame();
  currentLevel = 1;
});

const gameSquares = {
  $sq1: $("#1"),
  $sq2: $("#2"),
  $sq3: $("#3"),
  $sq4: $("#4"),
  $sq5: $("#5"),
  $sq6: $("#6"),
  $sq7: $("#7"),
  $sq8: $("#8"),
  $sq9: $("#9"),
  $sq10: $("#10"),
  $sq11: $("#11"),
  $sq12: $("#12"),
  $sq13: $("#13"),
  $sq14: $("#14"),
  $sq15: $("#15"),
  $sq16: $("#16"),
};

const squareValue = Object.keys(gameSquares);
for (let x = 0; x < squareValue.length; x++)
  //NOTE //Looping through the object to place letters on the board

  gameSquares.$sq1.html(letterBoard[0]);
gameSquares.$sq2.html(letterBoard[1]);
gameSquares.$sq3.html(letterBoard[2]);
gameSquares.$sq4.html(letterBoard[3]);
gameSquares.$sq5.html(letterBoard[4]);
gameSquares.$sq6.html(letterBoard[5]);
gameSquares.$sq7.html(letterBoard[6]);
gameSquares.$sq8.html(letterBoard[7]);
gameSquares.$sq9.html(letterBoard[8]);
gameSquares.$sq10.html(letterBoard[9]);
gameSquares.$sq11.html(letterBoard[10]);
gameSquares.$sq12.html(letterBoard[11]);
gameSquares.$sq13.html(letterBoard[12]);
gameSquares.$sq14.html(letterBoard[13]);
gameSquares.$sq15.html(letterBoard[14]);
gameSquares.$sq16.html(letterBoard[15]);

const renderBoard = function () {
  for (let ii = 0; ii <= letterBoard.length - 1; ii++) {
    $(`#${ii + 1}`).html(letterBoard[ii]);
  }
};

//NOTE Timer - Stack Overflow
let timerFuncs = {
  counter: 10,

  start: function () {
    let countdown = this;

    this.interval = setInterval(function () {
      countdown.counter--;

      if (countdown.counter >= 0) {
        span = document.getElementById("timer");
        span.innerHTML = `${countdown.counter}`;
      }

      if (countdown.counter === 0) {
        let wordsTotal = totalScore.reduce((a, b) => a + b, 0);

        if (wordsTotal >= levelPoints[currentLevel - 1]) {
          if (currentLevel === 3) {
            alert("Congratulations! You win!");
          } else {
            alert(
              "Congrats, you're moving on to the next level. Click ok to start"
            );
            currentLevel++;
            resetGame();
          }
        } else {
          alert(
            "Sorry, not enough points - You need to start over. Press okay to go back to level 1."
          );
          currentLevel = 1;
          resetGame();
        }
      }
    }, 1000);
  },

  pause: function () {
    clearInterval(this.interval);
    delete this.interval;
  },

  resume: function () {
    if (!this.interval) this.start();
  },
};

//NOTE Function to pick letters to make words

let score = [];
let totalScore = [];
let lettersClicked = [];

let currentLevel = 1;
let levelPoints = [50, 100, 200];

const table = document.querySelector("table");
let words = table.addEventListener("click", (evt) => {
  let chosenLetter = evt.target.innerText;

  if (lettersClicked.includes(evt.target.id) === true) {
    alert("Pick a different letter");
    score.pop();
    totalScore.pop();
  } else {
    evt.target.style.backgroundColor = "#c2e3e3";
    $("#chosen-letters").append(`<div class='game-ltrs'>${chosenLetter}</div>`);
    word.push(chosenLetter);
    lettersClicked.push(evt.target.id);
  }

  if (chosenLetter === "A") {
    score.push(1);
  }
  if (chosenLetter === "B") {
    score.push(3);
  }
  if (chosenLetter === "C") {
    score.push(3);
  }
  if (chosenLetter === "D") {
    score.push(2);
  }
  if (chosenLetter === "E") {
    score.push(1);
  }
  if (chosenLetter === "F") {
    score.push(4);
  }
  if (chosenLetter === "G") {
    score.push(2);
  }
  if (chosenLetter === "H") {
    score.push(4);
  }
  if (chosenLetter === "I") {
    score.push(1);
  }
  if (chosenLetter === "J") {
    score.push(8);
  }
  if (chosenLetter === "K") {
    score.push(5);
  }
  if (chosenLetter === "L") {
    score.push(1);
  }
  if (chosenLetter === "M") {
    score.push(3);
  }
  if (chosenLetter === "N") {
    score.push(1);
  }
  if (chosenLetter === "O") {
    score.push(1);
  }
  if (chosenLetter === "P") {
    score.push(3);
  }
  if (chosenLetter === "Q") {
    score.push(10);
  }
  if (chosenLetter === "R") {
    score.push(1);
  }
  if (chosenLetter === "S") {
    score.push(1);
  }
  if (chosenLetter === "T") {
    score.push(1);
  }
  if (chosenLetter === "U") {
    score.push(1);
  }
  if (chosenLetter === "V") {
    score.push(4);
  }
  if (chosenLetter === "W") {
    score.push(4);
  }
  if (chosenLetter === "X") {
    score.push(8);
  }
  if (chosenLetter === "Y") {
    score.push(4);
  }
  if (chosenLetter === "Z") {
    score.push(10);
  }
});

console.log(word);
console.log(score);

//NOTE // Clears the chosen letters field
const tableSq = document.getElementById("table");
const clearBtn = document.getElementById("clear");
let clearWord = clearBtn.addEventListener("click", (evt) => {
  let submitWords = $(".game-ltrs");
  if (submitWords.length > 0) {
    $(".game-ltrs").remove();

    lettersClicked.forEach((cell) => {
      document.getElementById(cell).style.backgroundColor = "white";
    });

    lettersClicked = [];
    word = [];
  }
});

//NOTE //Gets words on found words "board"
const submitBtn = document.getElementById("submit");
let submitWord = submitBtn.addEventListener("click", (evt) => {
  if (word.length >= 3 && word.length <= 15) {
    let strWord = word.join("");
    checkWord(strWord);

    word = [];

    $(".game-ltrs").remove();
  } else if (word.length <= 2) {
    alert("Word too short - need at least 3 characters");
  }

  lettersClicked.forEach((cell) => {
    document.getElementById(cell).style.backgroundColor = "white";
  });
  lettersClicked = [];
});

function checkWord(str) {
  $.ajax({
    url: `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${str}?key=53f242ce-0801-488a-931d-791646df2e86`,
  }).then((response) => {
    if (response[0]["meta"] && response[0]["meta"]["id"]) {
      console.log("word");
      let listItm = document.createElement("li");

      let fullWrd = document.createTextNode(str);
      listItm.appendChild(fullWrd);
      document.getElementById("word-list").appendChild(listItm);

      if (score.length > 0) {
        let wordPoints = score.reduce((a, b) => a + b, 0);
        console.log(wordPoints);

        let listPoint = document.createElement("li");

        listPoint.append(wordPoints);
        document.getElementById("point-list").appendChild(listPoint);

        totalScore.push(wordPoints);
        let wordsTotal = totalScore.reduce((a, b) => a + b, 0);

        document.getElementById("running-points").innerHTML = wordsTotal;

        score = [];
      }
    } else {
      console.log("not a word");
    }
  });
}
