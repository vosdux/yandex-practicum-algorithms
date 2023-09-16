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
  let max = Number(input[0]);
  const heapsCount = Number(input[1]);
  const heaps = [];
  let result = 0;

  for (let i = 2; i < heapsCount + 2; i++) {
    heaps.push(input[i].split(" ").map(Number));
  }
  heaps.sort((a, b) => b[0] - a[0]);

  for (let heap of heaps) {
    if (max === 0) {
      break;
    }
    if (heap[1] <= max) {
      max -= heap[1];
      result += heap[0] * heap[1];
    } else {
      result += heap[0] * max;
      max = 0;
    }
  }

  console.log(result);
}
