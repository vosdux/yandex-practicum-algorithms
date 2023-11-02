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
// const input = [
//   '92',
// '98',
// '0 1 1 2 4 6 6 7 8 8 9 10 10 10 11 13 13 16 16 17 17 18 19 19 19 21 21 21 22 24 24 24 27 28 29 29 30 31 32 32 32 33 33 34 35 39 44 48 48 51 53 54 55 55 56 56 56 60 62 66 66 67 68 68 69 70 70 71 71 71 72 76 76 77 81 82 83 83 85 86 86 86 91 92 92 92 92 95 95 96 97 98',
// '0 5 7 7 8 8 9 9 10 11 11 13 13 17 18 20 22 23 23 25 27 28 28 28 30 30 32 33 34 34 36 37 38 39 39 41 41 42 42 42 42 42 42 43 44 45 49 50 51 51 52 56 57 57 59 60 60 60 60 64 65 66 67 70 71 71 71 71 77 77 77 78 78 83 83 83 84 84 84 84 84 84 85 86 87 89 89 90 91 91 92 92 96 98 98 99 99 100'
// ]
function merge(arr, arr2) {
  const result = [];
  let firstCounter = 0;
  let secondCounter = 0;
  while (firstCounter !== arr.length && secondCounter !== arr2.length) {
    const elemFromFirst = Number(arr[firstCounter]);
    const elemFromSecond = Number(arr2[secondCounter]);
    if (elemFromSecond > elemFromFirst) {
      result.push(elemFromFirst);
      firstCounter += 1;
    } else if (elemFromFirst === elemFromSecond) {
      result.push(elemFromFirst);
      result.push(elemFromSecond);
      firstCounter += 1;
      secondCounter += 1;
    } else {
      result.push(elemFromSecond);
      secondCounter += 1;
    }
  }

  if (firstCounter < arr.length) {
    result.push(...arr.splice(firstCounter, arr.length - firstCounter));
  } else if (secondCounter < arr2.length) {
    result.push(...arr2.splice(secondCounter, arr2.length - secondCounter));
  }
  return result;
}

function median(arr1, arr2) {
  const arr = merge(arr1, arr2);
  const mid = Math.floor(arr.length / 2);
  let value = 0;

  if (arr.length % 2 === 0) {
    value = (Number(arr[mid]) + Number(arr[mid - 1])) / 2;
  } else {
    value = arr[mid];
  }

  console.log(value);
}

function solve() {
  const arr1 = input[2].split(" ");
  const arr2 = input[3].split(" ");
  median(arr1, arr2);
}

// solve()
