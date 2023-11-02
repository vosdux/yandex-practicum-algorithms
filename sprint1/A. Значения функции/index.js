const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

let _input = [];

_reader.on("line", (line) => {
  _input = line.split(" ");
});

process.stdin.on("end", solve);

function solve() {
  const a = +_input[0];
  const x = +_input[1];
  const b = +_input[2];
  const c = +_input[3];

  const answer = a * x * x + b * x + c;

  console.log(answer);
}
