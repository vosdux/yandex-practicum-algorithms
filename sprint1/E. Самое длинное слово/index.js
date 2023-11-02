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
  const text = _input[1];
  const arr = text.split(" ");
  let biggest = "";

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > biggest.length) {
      biggest = arr[i];
    }
  }

  console.log(biggest);
  console.log(biggest.length);
}
