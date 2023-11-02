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

function solve() {
  const arr = input[1].split(" ");

  let result = 0;
  let max = 0;
  let currentNumber = 0;

  for (let i = 0; i < arr.length; ++i) {
    max = Math.max(max, arr[i]);
    currentNumber += 1;
    if (max + 1 == currentNumber) {
      result += 1;
    }
  }

  console.log(result);
}
