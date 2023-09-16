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
  const strings = input[1].split(' ');

  const map = {};

  strings.forEach((str, index) => {
    const sortedStr = str.split('').sort().join('');
    if (map[sortedStr]) {
      map[sortedStr].push(index);
    } else {
      map[sortedStr] = [index];
    }
  });

  const result = Object.entries(map).sort((a, b) => a[1][0] - b[1][0]);
  let buffer = '';
  result.forEach(item => {
    buffer = `${buffer}${item[1].join(' ')}\n`
  });
  process.stdout.write(buffer);
}
