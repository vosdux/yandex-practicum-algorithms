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

const obj = {
  0: [0]
}

function solve() {
  const points = input[1].split(' ');
  let sum = 0;
  let max = 0;

  for (let i = 1; i <= points.length; i++) {
    if (points[i - 1] === '0') {
      sum += 1;
    } else {
      sum -= 1;
    }

    const data = obj[sum];
    if (data) {
      data.push(i)
      
      const newMax = i - data[0];
      if (newMax > max) {
        max = newMax;
      }
    } else {
      obj[sum] = [i];
    }
  }

  console.log(max)
}
