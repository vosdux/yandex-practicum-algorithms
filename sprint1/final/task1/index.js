const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

let _input = [];

_reader.on("line", (line) => {
  _input.push(line);
});

process.stdin.on("end", solve);

function solve() {
  const data = _input[1].split(" ");
  const result = [];
  let prevZero = null;
  let nearestZero = null;

  for (let i = 0; i < data.length; i++) {
    const number = Number(data[i]);
    if (number === 0) {
      prevZero = nearestZero;
      nearestZero = i;
      result.push(0);

      if (prevZero !== null) {
        const middle = Math.round((nearestZero + prevZero) / 2);
        for (let j = middle; j < i; j++) {
          result[j] = i - j;
        }
      } else {
        for (let j = 0; j < i; j++) {
          result[j] = i - j;
        }
      }
    } else {
      if (nearestZero !== null) {
        result.push(i - nearestZero);
      } else {
        result.push("x");
      }
    }
  }

  console.log(result.join(" "));
}
