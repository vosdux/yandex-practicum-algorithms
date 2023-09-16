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
  const n = Number(input[0]);
  const iData = input[1].split(" ").map(Number);
  let isStockPresent = false;
  let stockPrice = 0;
  let profit = 0;
  let day = 0;

  while (day < n - 1) {
    if (isStockPresent) {
      while (iData[day] < iData[day + 1]) {
        day += 1;
        if (day === n - 1) {
          break;
        }
      }
      if (iData[day] >= iData[day + 1]) {
        profit += iData[day] - stockPrice;
        isStockPresent = false;
      }
    } else {
      while (iData[day] > iData[day + 1]) {
        day += 1;
        if (day === n - 1) {
          break;
        }
      }
      if (iData[day] <= iData[day + 1]) {
        stockPrice = iData[day];
        isStockPresent = true;
      }
    }
    day += 1;
  }

  if (isStockPresent) {
    profit += iData[n - 1] - stockPrice;
  }

  console.log(profit);
}
