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

function bubleSort(arr) {
  let isChanged = false;
  for (let i = 0; i < arr.length; i++) {
    isChanged = false;
    for (let j = 0; j < arr.length - i; j++) {
      const number1 = Number(arr[j]);
      const number2 = Number(arr[j + 1]);
      if (number1 > number2) {
        arr[j + 1] = number1;
        arr[j] = number2;
        isChanged = true;
      }
    }
    if (isChanged) {
      console.log(arr.join(" "));
    } else {
      if (i === 0) {
        console.log(arr.join(" "));
      }
      break;
    }
  }
}

function solve() {
  const arr = input[1].split(" ");
  bubleSort(arr);
}
