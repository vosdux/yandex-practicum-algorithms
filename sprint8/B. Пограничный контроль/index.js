const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

let input = [];

// Установим callback на считывание строки - так мы получим
// все строки из ввода в массиве _inputLines.
_reader.on("line", (line) => {
  input.push(line);
});
// Когда ввод закончится, будет вызвана функция solve.
process.stdin.on("end", solve);

const OK = "OK";
const FAIL = "FAIL";

function solve() {
  let str1 = input[0];
  let str2 = input[1];

  if (str1.length > str2.length) {
    [str1, str2] = [str2, str1];
  }

  if (str2.length - str1.length > 1) {
    console.log(FAIL);
    return;
  }

  let id1 = 0;
  let id2 = 0;
  let mistakes = 0;
  while (id1 < str1.length && id2 < str2.length) {
    if (str1[id1] === str2[id2]) {
      id1++;
      id2++;
    } else {
      mistakes += 1;

      if (mistakes > 1) {
        console.log(FAIL);
        return;
      }
      if (str1.length === str2.length) {
        id1++;
        id2++;
      } else {
        id2++;
      }
    }
  }

  console.log(OK);
}
