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

function generateBrackets(prefix, left, right, n) {
  if (left === right && right === n) {
    console.log(prefix);
    return;
  }

  if (right < left) {
    if (left === n) {
      generateBrackets(`${prefix})`, left, right + 1, n);
    } else {
      generateBrackets(`${prefix}(`, left + 1, right, n);
      generateBrackets(`${prefix})`, left, right + 1, n);
    }
  } else {
    generateBrackets(`${prefix}(`, left + 1, right, n);
  }
}

function solve() {
  generateBrackets("(", 1, 0, Number(input));
}
