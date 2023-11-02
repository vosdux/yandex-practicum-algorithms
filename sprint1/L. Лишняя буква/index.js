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
  const arr1 = _input[0].split("").sort();
  const arr2 = _input[1].split("").sort();

  for (let i = 0; i < arr2.length; i++) {
    if (arr1[i] !== arr2[i]) {
      console.log(arr2[i]);
      break;
    }
  }
}
