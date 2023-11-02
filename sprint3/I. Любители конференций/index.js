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
  const data = input[1].split(" ");
  const number = Number(input[2]);
  const map = {};

  for (let i = 0; i < data.length; i++) {
    if (map[data[i]] === undefined) {
      map[data[i]] = 1;
    } else {
      map[data[i]] += 1;
    }
  }

  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);

  console.log(
    sorted
      .splice(0, number)
      .map((item) => item[0])
      .join(" ")
  );
}
