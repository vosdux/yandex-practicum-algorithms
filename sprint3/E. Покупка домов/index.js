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
  const money = Number(input[0].split(" ")[1]);
  const prices = input[1].split(" ").sort((a, b) => Number(a) - Number(b));
  let counter = 0;
  let sum = 0;

  for (let price of prices) {
    sum += Number(price);
    if (sum <= money) {
      counter += 1;
    } else {
      break;
    }
  }

  console.log(counter);
}
