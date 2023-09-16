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
  const [peaksCount, connectionsCount] = input[0].split(" ");
  const matrix = [];

  for (let i = 0; i < Number(peaksCount); i++) {
    matrix[i] = new Array(Number(peaksCount)).fill(0);
  }

  for (let i = 1; i < input.length; i++) {
    const [from, to] = input[i].split(" ");

    matrix[Number(from) - 1][Number(to) - 1] = 1;
  }

  matrix.forEach(item => {
    console.log(item.join(' '));
  })
}
