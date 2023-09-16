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

function solve() {
  const str1 = input[0];
  const str2 = input[1];

  const NO = "NO";
  const YES = "YES";

  if (str1.length !== str2.length) {
    console.log(NO);
    return;
  }

  const map1 = new Map();
  const map2 = new Map();

  function setToMap(map, elem, i) {
    const data = map.get(elem);
    if (!data) {
      map.set(elem, [i]);
    } else {
      map.set(elem, [...data, i]);
    }
  }

  for (let i = 0; i < str1.length; i++) {
    const elem1 = str1[i];
    const elem2 = str2[i];

    const data1 = map1.get(elem1);
    const data2 = map2.get(elem2);

    if (data1 && data1 !== elem2 || data2 && data2 !== elem1) {
      console.log(NO)
      return;
    }

    map1.set(elem1, elem2);
    map2.set(elem2, elem1);
  }

  console.log(YES);
}
