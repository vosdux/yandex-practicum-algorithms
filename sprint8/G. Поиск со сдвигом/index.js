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
  const differenceOfRow = [];
  const differenceOfPattern = [];
  const row = input[1].split(" ");
  const pattern = input[3].split(" ");
  const indexes = [];

  for (let i = 0; i < row.length - 1; i++) {
    differenceOfRow[i] = row[i + 1] - row[i];
  }

  for (let i = 0; i < pattern.length - 1; i++) {
    differenceOfPattern[i] = pattern[i + 1] - pattern[i];
  }

  for (let i = 0; i < differenceOfRow.length; i++) {
    for (let j = 0; j < differenceOfPattern.length; j++) {
      if (differenceOfRow[i + j] !== differenceOfPattern[j]) {
        break;
      }

      if (j === differenceOfPattern.length - 1) {
        indexes.push(i + 1);
      }
    }
  }

  console.log(indexes.join(" "));
}
