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
  const number = Number(_input);
  if (number === 1) {
    console.log("True");
  } else {
    let answer = 4;

    while (answer < number) {
      answer = answer * 4;
    }

    if (answer === number) {
      console.log("True");
    } else {
      console.log("False");
    }
  }
}
