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
  const newLine = _input.replace(/[\s.,:!?]/g, "");
  const arr = newLine.split("");
  const reverserArr = [...arr].reverse();

  if (arr.join("").toLowerCase() === reverserArr.join("").toLowerCase()) {
    console.log("True");
  } else {
    console.log("False");
  }
}
