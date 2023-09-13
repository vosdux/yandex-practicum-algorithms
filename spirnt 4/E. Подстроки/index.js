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
  if (input.length === 0) {
    console.log(0);
    return;
  }

  if (input.length === 1) {
    console.log(1);
    return;
  }

  let elemnts = [];
  let maxSize = 0;

  for (let i of input) {
    const index = elemnts.findIndex((elem) => elem === i);

    if (index < 0) {
      elemnts.push(i);
    } else {
      elemnts = elemnts.splice(index + 1, elemnts.length - index);
      elemnts.push(i);
    }

    maxSize = Math.max(maxSize, elemnts.length);
  }

  console.log(maxSize);
}
