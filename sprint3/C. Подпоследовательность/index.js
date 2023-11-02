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
  const firts = input[0];
  const second = input[1];
  let currPos = 0;

  for (let i = 0; i < second.length; i++) {
    if (firts[currPos] === second[i]) {
      currPos += 1;
    }
  }

  if (currPos < firts.length) {
    console.log("False");
  } else {
    console.log("True");
  }
}
