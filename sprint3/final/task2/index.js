/*
ID: 89224708
-- ПРИНЦИП РАБОТЫ --
Использовал алгоритм быстрой сортировки. Но не создаю доплнительные массивы для хранения
Выбираю опорный элемент, и все элементы меньше перемещаю в правую часть,
все элементы больше в левую. И так рекурсивно, пока в интервале не останется 1 элемент. Перестановки делаю в исходном массиве
Для операций сравнения использую функции isHigher и isEqual, для сравнения всех данных участника

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Быстрая сортировка корректно отсортирует наш массив.
Мы сортируем прямо в исходном массиве, поэтому память тратится только на исходный массив.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Сложность быстрой сортировки в среднем случае составляет O(n log(n))
В худшем случае это O(n^2)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Мы храним только исходный массив, поэтому сложность O(n)

*/

const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

let input = [];
const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;
// Установим callback на считывание строки - так мы получим
// все строки из ввода в массиве _inputLines.
_reader.on("line", (line) => {
  const arr = line.split(" ");
  if (!cyrillicPattern.test(arr[0])) {
    input.push([arr[0], Number(arr[1]), Number(arr[2])]);
  }
});
// Когда ввод закончится, будет вызвана функция solve.
process.stdin.on("end", solve);

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function sort(arr, left, right) {
  if (right === left || left > right) {
    return;
  }

  let i = left;
  let j = right;
  const random = getRandomInt(right - left) + left
  const pivot = arr[random];

  while (i !== j) {
    if (isHigher(arr[i], pivot)) {
      i += 1;
    }

    if (isHigher(pivot, arr[j])) {
      j -= 1;
    }

    if (
      (isHigher(arr[j], pivot) || isEqual(arr[j], pivot)) &&
      (isHigher(pivot, arr[i]) || isEqual(arr[i], pivot))
    ) {
      const elem = arr[j];
      arr[j] = arr[i];
      arr[i] = elem;
    }
  }
  sort(arr, left, i);
  sort(arr, i + 1, right);
}

function getData(elem) {
  return {
    point: Number(elem[1]),
    fail: Number(elem[2]),
    name: elem[0],
  };
}

function isEqual(elem, pivot) {
  const { point: point1, fail: fail1, name: name1 } = getData(elem);
  const { point: point2, fail: fail2, name: name2 } = getData(pivot);

  if (
    point1 === point2 &&
    fail1 === fail2 &&
    name1.localeCompare(name2) === 0
  ) {
    return true;
  } else {
    return false;
  }
}

function isHigher(elem, pivot) {
  const { point: point1, fail: fail1, name: name1 } = getData(elem);
  const { point: point2, fail: fail2, name: name2 } = getData(pivot);

  if (point1 > point2) {
    return true;
  } else if (point1 < point2) {
    return false;
  } else {
    if (fail1 > fail2) {
      return false;
    } else if (fail1 < fail2) {
      return true;
    } else {
      const res = name1.localeCompare(name2);
      if (res < 0) {
        return true;
      } else {
        return false;
      }
    }
  }
}

function solve() {
  sort(input, 1, input.length - 1);
  input.forEach((element, index) => {
    if (index !== 0) {
      console.log(element[0]);
    }
  });
}
