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

function comparator(first, second) {
  if (first.length === second.length) {
    return Number(first) > Number(second);
  } else {
    const newFirst = `${first}${second}`;
    const newSecond = `${second}${first}`;

    return Number(newFirst) > Number(newSecond);
  }
}

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const itemForInsert = arr[i];
    let j = i;
    while (j > 0 && comparator(itemForInsert, arr[j - 1])) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = itemForInsert;
  }
}

function solve() {
  const arr = input[1].split(" ");
  insertionSort(arr);
  console.log(arr.join(""));
}
