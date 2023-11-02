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

function solve() {
  function fibionaci(n) {
    if (n === 0 || n === 1) {
      return 1;
    }

    return fibionaci(n - 2) + fibionaci(n - 1);
  }

  console.log(fibionaci(Number(input)));
}
