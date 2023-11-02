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
  let devider = 2;
  const deviders = [];

  while (number >= 2) {
    if (number % devider === 0) {
      deviders.push(devider);
      number = number / devider;
    } else if (devider < Math.sqrt(number)) {
      devider += 1;
    } else {
      devider = number;
    }
  }

  console.log(deviders.join(" "));
}
