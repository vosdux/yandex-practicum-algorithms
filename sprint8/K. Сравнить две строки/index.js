const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

let input = [];

// Установим callback на считывание строки - так мы получим
// все строки из ввода в массиве _inputLines.
_reader.on("line", (line) => {
  input.push(line);
});
// Когда ввод закончится, будет вызвана функция solve.
process.stdin.on("end", solve);

const evenLetters = ['b', 'd', 'f', 'h', 'j', 'l', 'n', 'p', 'r', 't', 'v', 'x', 'z'];

function solve() {
    const firstString = filterLetter(input[0]);
    const secondString = filterLetter(input[1]);

    if (firstString < secondString) {
        console.log('-1');
    } else if (firstString === secondString) {
        console.log('0');
    } else {
        console.log('1');
    }
}

function filterLetter(string) {
    let result = '';
    for (let letter of string) {
        if (evenLetters.includes(letter)) {
            result += letter;
        }
    }

    return result;
}
