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
  const k = _input[0];
  const k2 = Number(k) * 2;
  const data = [];
  let result = 0;

  for (let i = 1; i < _input.length; i++) {
    data.push(..._input[i]);
  }

  let max = 0;

  for (let i = 0; i < data.length; i++) {
    const number = Number(data[i]);
    if (!isNaN(number) && number > max) {
      max = number;
    }
  }

  for (let t = 0; t <= max; t++) {
    const elems = data.filter((elem) => elem === t.toString());
    if (elems && elems.length && elems.length <= k2) {
      result += 1;
    }
  }

  console.log(`${result}`);
}
