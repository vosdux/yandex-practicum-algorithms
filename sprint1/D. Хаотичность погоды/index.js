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
  const data = _input[1].split(" ");
  let result = 0;

  for (let i = 0; i < data.length; i++) {
    const before = Number(data[i - 1]);
    const curr = Number(data[i]);
    const after = Number(data[i + 1]);

    if (isNaN(after) && isNaN(before)) {
      result += 1;
      continue;
    }

    if (isNaN(before) && curr > after) {
      result += 1;
      continue;
    }

    if (isNaN(after) && curr > before) {
      result += 1;
      continue;
    }

    if (curr > after && curr > before) {
      result += 1;
    }
  }

  console.log(`${result}`);
}
