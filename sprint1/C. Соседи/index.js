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
  const data = [];
  for (let i = 2; i < _input.length - 2; i++) {
    data.push(_input[i].split(" "));
  }

  const yMax = Number(_input[0]) - 1;
  const xMax = Number(_input[1]) - 1;

  const y = Number(_input[_input.length - 2]);
  const x = Number(_input[_input.length - 1]);

  const result = [];

  if (x > 0) {
    result.push(data[y][x - 1]);
  }

  if (x < xMax) {
    result.push(data[y][x + 1]);
  }

  if (y > 0) {
    result.push(data[y - 1][x]);
  }

  if (y < yMax) {
    result.push(data[y + 1][x]);
  }

  console.log(result.sort((a, b) => a - b).join(" "));
}
