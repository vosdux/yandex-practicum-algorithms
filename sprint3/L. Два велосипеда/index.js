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

function binarySearch(arr, x, left, right) {
  if (right <= left && left !== 0) {
    return -1;
  }
  const mid = Math.floor((left + right) / 2);

  const number = Number(arr[mid]);

  if (number >= x && (Number(arr[mid - 1]) < x || mid === 0)) {
    return mid + 1;
  } else if (x <= number) {
    return binarySearch(arr, x, left, mid);
  } else {
    return binarySearch(arr, x, mid + 1, right);
  }
}

function solve() {
  const arr = input[1].split(" ");
  const sum = Number(input[2]);
  const firstDay = binarySearch(arr, sum, 0, arr.length);
  const secondDay = binarySearch(arr, sum * 2, 0, arr.length);

  console.log(`${firstDay} ${secondDay}`);
}
