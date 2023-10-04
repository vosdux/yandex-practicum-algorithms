const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

let input = "";

// Установим callback на считывание строки - так мы получим
// все строки из ввода в массиве _inputLines.
_reader.on("line", (line) => {
  input = line;
});
// Когда ввод закончится, будет вызвана функция solve.
process.stdin.on("end", solve);

function factorial(x) {
  if (x == 0) {
    return 1;
  }
  if (x < 0) {
    return undefined;
  }
  for (var i = x; --i; ) {
    x *= i;
  }
  return x;
}

function solve() {
  const n = Number(input);
  console.log(Math.round(factorial(2 * n) / (factorial(n) * factorial(n + 1))));
}
