const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

let input = '';

// Установим callback на считывание строки - так мы получим
// все строки из ввода в массиве _inputLines.
_reader.on("line", (line) => {
  input = line;
});
// Когда ввод закончится, будет вызвана функция solve.
process.stdin.on("end", solve);

function solve() {
  console.log(input.split(' ').reverse().join(' '));
}
