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
  const matrix = [];
  for (let i = 2; i < input.length; i++) {
    const row = input[i].split(" ");

    row.forEach((elem, index) => {
      if (matrix[index]) {
        matrix[index].push(elem);
      } else {
        matrix[index] = [elem];
      }
    });
  }

  matrix.forEach((row) => {
    console.log(row.join(" "));
  });
}
