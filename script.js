let play;
let pause;
let randomLetter;

let letterBank = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "C", "C", "D", "D", "D", "D", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "G", "G", "G", "H", "H", "I", "I", "I", "I", "I", "I", "I", "I", "I", "J", "K", "L", "L", "L", "L", "M", "M", "N", "N", "N", "N", "N", "N", "O", "O", "O", "O", "O", "O", "O", "O", "P", "P", "Q", "R", "R", "R", "R", "R", "R", "S", "S", "S", "S", "T", "T", "T", "T", "T", "T", "U", "U", "U", "U", "V", "V", "W", "W", "X", "Y", "Y", "Z"]
// for (let i = 0; i < letterBank.length; i++)

let letterBoard = [];

function getLetter() {
    randomLetter = 
    letterBank[Math.floor(Math.random() * letterBank.length)]

    return randomLetter
}

letterBoard.push(getLetter())

console.log(letterBoard)

const gameSquares = {
    sq1: $('#1'), 
    sq2: $('#2'), 
    sq3: $('#3'), 
    sq4: $('#4'), 
    sq5: $('#5'), 
    sq6: $('#6'), 
    sq7: $('#7'), 
    sq8: $('#8'), 
    sq9: $('#9'), 
    sq10: $('#10'), 
    sq11: $('#11'), 
    sq12: $('#12'), 
    sq13: $('#13'), 
    sq14: $('#14'), 
    sq15: $('#15'), 
    sq16: $('#16'), 
}