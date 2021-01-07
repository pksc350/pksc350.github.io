//W3 Schools
$("#begin").click(function(){
//Webdeveloper.com
    this.style.visibility="hidden"

    document.getElementById("instructions").style.fontSize = "20px";
    document.getElementById("instructions").style.height = "50px";
    document.getElementById("instructions").style.width = "100px";
    document.getElementById("instructions").style.marginLeft = "320px";

    $(".game-screen").toggle()

    timerFuncs.start()
})

$("#instructions").click(function(){
    $("#instruction-screen").toggle()
    
    // if(document.getElementById("instruction-screen").style.display !== "none"){
    //     document.getElementByClassName("game-screen").style.visibility = "hidden"
    // }
})

//NOTE this makes the timer work
$("#pause").click(function(){
    if(document.getElementById("pause").innerHTML === "Pause"){
    timerFuncs.pause()
    document.getElementById("pause").innerHTML = "Resume"
    document.getElementById("table").style.color = "white"

} else {
    timerFuncs.resume()
    document.getElementById("pause").innerHTML = "Pause"
    document.getElementById("table").style.color = "black"
}
})

let randomLetter;
let word = []
let points = 0;

//NOTE //Letter Bank for Squares to choose from
let letterBank = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "C", "C", "D", "D", "D", "D", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "G", "G", "G", "H", "H", "I", "I", "I", "I", "I", "I", "I", "I", "I", "J", "K", "L", "L", "L", "L", "M", "M", "N", "N", "N", "N", "N", "N", "O", "O", "O", "O", "O", "O", "O", "O", "P", "P", "Q", "R", "R", "R", "R", "R", "R", "S", "S", "S", "S", "T", "T", "T", "T", "T", "T", "U", "U", "U", "U", "V", "V", "W", "W", "X", "Y", "Y", "Z"]
// for (let i = 0; i < letterBank.length; i++)

let letterPoints = {
    1: ["A", "E", "I", "L", "N", "O", "R", "S", "T", "U"],
    2: ["D", "G"],
    3: ["B", "C", "M", "P"],
    4: ["F", "H", "V", "W", "Y"],
    5: ["K"],
    8: ["J", "X"],
    10: ["Q", "Z"],
}


let letterBoard = [];

//NOTE //Getting 16 random letters from the letter bank
let getLetter = function() {
    randomLetter = letterBank[Math.floor(Math.random() * letterBank.length)]

    return randomLetter
}
let generateArr = function(){
    for (let a = 0; a < 16; a++){
//NOTE // Generates array to hold random letters
    letterBoard.push(getLetter())
    letterBank.splice(letterBank.indexOf(randomLetter), 1)
}
} 

generateArr()

console.log(letterBoard)
console.log(letterBank)


$("#reset-button").click(function(){
    word = []
    letterBoard = []
    getLetter()
    generateArr()
    renderBoard()
})

const gameSquares = {
    $sq1: $('#1'), 
    $sq2: $('#2'), 
    $sq3: $('#3'), 
    $sq4: $('#4'), 
    $sq5: $('#5'), 
    $sq6: $('#6'), 
    $sq7: $('#7'), 
    $sq8: $('#8'), 
    $sq9: $('#9'), 
    $sq10: $('#10'), 
    $sq11: $('#11'), 
    $sq12: $('#12'), 
    $sq13: $('#13'), 
    $sq14: $('#14'), 
    $sq15: $('#15'), 
    $sq16: $('#16'), 
}

const squareValue = Object.keys(gameSquares)
for(let x = 0; x < squareValue.length; x++)

// gameSquares.$sq1.html(letterBoard)

//NOTE //Looping through the object to place letters on the board
// for (const x in gameSquares){

//     console.log(gameSquares[x])
//         gameSquares[x].html(letterBoard)
// }

gameSquares.$sq1.html(letterBoard[0])
gameSquares.$sq2.html(letterBoard[1])
gameSquares.$sq3.html(letterBoard[2])
gameSquares.$sq4.html(letterBoard[3])
gameSquares.$sq5.html(letterBoard[4])
gameSquares.$sq6.html(letterBoard[5])
gameSquares.$sq7.html(letterBoard[6])
gameSquares.$sq8.html(letterBoard[7])
gameSquares.$sq9.html(letterBoard[8])
gameSquares.$sq10.html(letterBoard[9])
gameSquares.$sq11.html(letterBoard[10])
gameSquares.$sq12.html(letterBoard[11])
gameSquares.$sq13.html(letterBoard[12])
gameSquares.$sq14.html(letterBoard[13])
gameSquares.$sq15.html(letterBoard[14])
gameSquares.$sq16.html(letterBoard[15])

    const renderBoard = function(){
        for(let ii = 0; ii <= letterBoard.length - 1; ii++){
            $(`#${ii+1}`).html(letterBoard[ii])
    }
}


//NOTE Timer - Stack Overflow
let timerFuncs = {
counter: 60,

start: function() {
    let countdown = this
    
    this.interval = setInterval(function(){
    countdown.counter --;

    if (countdown.counter >= 0) {
        span = document.getElementById("timer")
        span.innerHTML = `${countdown.counter}`;
    }

    if (countdown === 0){
    clearInterval(counter)
    }
}, 1000)
},

pause: function (){
    clearInterval(this.interval)
    delete this.interval;
},

resume: function(){
    if (!this.interval) this.start()
}
}

// const sq1 = document.getElementById("1")
// sq1.addEventListener('click', event => {
//     sq1.style.backgroundColor = "grey"
// })

//NOTE Function to pick letters to make words - you can't make doubles, but still needs troubleshooting 
const table = document.querySelector("table")
let words = table.addEventListener('click', evt => {
    let chosenLetter = evt.target.innerText
    console.log(chosenLetter)

    if(chosenLetter === word[word.length - 1]){
        alert('Pick a different letter')
    } else {
        // evt.target.style.backgroundColor = "#c2e3e3"
        $("#chosen-letters").append(`<div class='game-ltrs'>${chosenLetter}</div>`)
        word.push(chosenLetter)
    }
})

console.log(word)

//NOTE // Clears the chosen letters field
const tableSq = document.getElementById('table')
const clearBtn = document.getElementById("clear")
let clearWord = clearBtn.addEventListener('click', evt => {

    let submitWords = $('.game-ltrs')
    if(submitWords.length > 0){
        $('.game-ltrs').remove()

        word = []
        
        //Have to come back to this - getting the table to reset it's background color to white
        // tblStyle.style.backgroundColor = "white"
    }
})

//NOTE //Gets words on found words "board"
const submitBtn = document.getElementById("submit")
let submitWord = submitBtn.addEventListener('click', evt => {

    if(word.length >= 3 && word.length <= 15){
    let listItm = document.createElement("li")

    let fullWrd = document.createTextNode(word.join(''))
    listItm.appendChild(fullWrd)
    document.getElementById("word-list").appendChild(listItm)

    word = []

    //Not working
    $('.game-ltrs').remove()

    } else if(word.length <= 2){
        alert('Word too short - need at least 3 characters')
    } 
})

//https://exercism.io/tracks/javascript/exercises/scrabble-score/solutions/adac4a7dca744e56bc9e3ab84ad8c309
//Point scoring function
// function scorePoints(wrdltr){
//     for (let index in letterPoints)
//     {
//         if (Object.keys(letterPoints).indexOf((letterPoints[index].indexOf(wrdltr) !== -1) ? index.toString() : '-1') !== -1) {
//         }
//         return parseInt(index)
//     }
// }

// let scorePoints = function(){
//     for (let idx in letterPoints){
//         if(Object.keys(letterPoints).indexOf(letterPoints[idx]))
//     }
// }