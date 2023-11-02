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
  const count = Number(input[2]);
  const result = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const res = Number(data[i]) - Number(data[j]);
      if (res < 0) {
        result.push(-res);
      } else {
        result.push(res);
      }

      if (result.length > count) {
        result.sort((a, b) => a - b);
        result.pop();
      }
    }
  }
  result.sort((a, b) => a - b);
  console.log(result[count - 1]);
}
