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
  const number1 = BigInt(`0b${_input[0]}`).toString(10);
  const number2 = BigInt(`0b${_input[1]}`).toString(10);

  console.log((BigInt(number1) + BigInt(number2)).toString(2));
}
