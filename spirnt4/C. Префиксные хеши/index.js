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
  const a = Number(input[0]);
  const m = Number(input[1]);
  const str = input[2];
  const length = input[3];
  let result = 0

  

  for (let symbol of str) {
    const code = symbol.charCodeAt(0);
    result = (result * a + code) % m
  }

  for(let i = 4; i < length + 4; i++) {
    const [start, end] = input[i].split(' ');
  }
}
