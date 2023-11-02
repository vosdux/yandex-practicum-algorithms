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
  const initial = input[0];
  const count = Number(input[1]);
  let nexPos = 0;
  let strings = [];
  let result = '';
  for (let i = 2; i < count + 2; i++) {
    const [str, count] = input[i].split(' ');
    strings.push([str, Number(count)]);
  }

  strings.sort((a, b) => a[1] - b[1]);
  let sbstrIndex = 0;
  let shift = 0;
  for (let j = 0; j < initial.length + strings.length; j++) {
    const substr = strings[sbstrIndex];
    if (substr && j === substr[1] + nexPos) {
      result += substr[0];
      sbstrIndex += 1;
      nexPos += 1;
    } else {
      result += initial[shift];
      shift += 1;
    }
  }

  console.log(result);
}

