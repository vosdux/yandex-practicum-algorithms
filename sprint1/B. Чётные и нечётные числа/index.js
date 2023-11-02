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
  const isEven = [];

  for (let i = 0; i < _input.length; i++) {
    isEven.push(_input[i] % 2 === 0);
  }

  if (isEven.includes(true) && !isEven.includes(false)) {
    console.log("WIN");
  } else if (isEven.includes(false) && !isEven.includes(true)) {
    console.log("WIN");
  } else {
    console.log("FAIL");
  }
}
