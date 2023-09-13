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
  const map = new Map();
  const points = input[1].split(' ');
  let sum = 0;
  let max = 0;

  for (let i = 0; i < points.length; i++) {
    if (points[i] === '0') {
      sum += 1;
    } else {
      sum -=1;
    }

    const data = map.get(sum);
    if (data) {
      map.set(sum, [...data, i]);
    } else {
      map.set(sum, [i]);
    }
  }

  map.forEach(item => {
    const curr = item[item.length - 1] - item[0];

    if (curr > max) {
      max = curr;
    }
  })
  console.log(max)
}
