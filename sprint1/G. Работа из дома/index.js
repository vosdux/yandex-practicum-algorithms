const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

let _input = "";

_reader.on("line", (line) => {
  _input = line;
});

process.stdin.on("end", solve);

function solve() {
  let number = Number(_input);
  const result = [];
  while (number > 1) {
    const reminder = number % 2;
    result.push(reminder);
    number = (number - reminder) / 2;
  }

  result.push(number);

  console.log(result.reverse().join(""));
}
