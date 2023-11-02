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
  const kids = input[1].split(" ").sort((a, b) => Number(b) - Number(a));
  const cookies = input[3].split(" ").sort((a, b) => Number(a) - Number(b));
  let happy = 0;

  for (let kid of kids) {
    if (Number(kid) <= Number(cookies[cookies.length - 1])) {
      happy += 1;
      cookies.pop();
    }
  }

  console.log(happy);
}
