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
  const data = input[1].split(" ").sort((a, b) => Number(b) - Number(a));
  let sum = 0;

  for (let i = 0; i < data.length - 2; i++) {
    const first = Number(data[i]);
    const second = Number(data[i + 1]);
    const third = Number(data[i + 2]);
    if (first < second + third) {
      sum = first + second + third;
      break;
    }
  }

  console.log(sum);
}
