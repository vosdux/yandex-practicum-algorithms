/*
ID: 89558695
Снача мы вставляем элементы в кучу просеиванием в верх. Таким образом получаем max-heap.
Затем удаляем самый приоритетный элемент из кучи и заменяем его на новый просеиванием вниз.
Сам элемент вставляем в наш отсортированный массив. повторяем операцию до тех пор,
пока в кучи есть элементы. таким образом на выход получаем отсортированный массив


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
https://practicum.yandex.ru/learn/algorithms/courses/7f101a83-9539-4599-b6e8-8645c3f31fad/sprints/134503/topics/e7dbf42a-fd5a-434b-990d-9cfe0e3a10c8/lessons/c29642e4-76ff-47df-82d2-87848ddc7f77/

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
O(1) + O(nlogn) + O(nlogn) = O(nlogn)
где O(1) - создание бинарной кучи
O(nlogn) - вставка элементов в кучу
O(nlogn) - удаление элементов из кучи

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
O(n), где n - кол-во участников
*/
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

class Heap {
  constructor() {
    this.heap = [-1];
  }

  _formatItem = (item) => {
    return {
      score: Number(item[1]),
      fails: Number(item[2]),
      login: item[0],
    };
  }

  _isBigger = (item1, item2) => {
    const {
      score: score1,
      fails: fails1,
      login: login1,
    } = this._formatItem(item1);
    const {
      score: score2,
      fails: fails2,
      login: login2,
    } = this._formatItem(item2);

    if (score1 > score2) {
      return true;
    } else if (score2 > score1) {
      return false;
    } else {
      if (fails2 > fails1) {
        return true;
      } else if (fails1 > fails2) {
        return false;
      } else {
        const compare = login1.localeCompare(login2);

        if (compare === -1) {
          return true;
        } else if (compare === 1) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  heapAdd = (key) => {
    const index = this.heap.length;
    this.heap[index] = key;

    this.shiftUp(index);
  }

  shiftUp = (index) => {
    if (index === 1) {
      return;
    }

    const parentIndex = Math.floor(index / 2);

    if (this._isBigger(this.heap[index], this.heap[parentIndex])) {
      const temp = this.heap[index];
      this.heap[index] = this.heap[parentIndex];
      this.heap[parentIndex] = temp;
      this.shiftUp(parentIndex);
    }
  }

  popMax = () => {
    const result = this.heap[1];
    this.heap[1] = this.heap[this.heap.length - 1];
    this.heap.pop();

    this.shiftDown(1);
    return result;
  }

  shiftDown = (index) => {
    const left = index * 2;
    const right = index * 2 + 1;

    if (this.heap.length <= left) {
      return;
    }

    let indexOfLargest = 0;
    if (
      right < this.heap.length &&
      this._isBigger(this.heap[right], this.heap[left])
    ) {
      indexOfLargest = right;
    } else {
      indexOfLargest = left;
    }

    if (this._isBigger(this.heap[indexOfLargest], this.heap[index])) {
      const temp = this.heap[index];
      this.heap[index] = this.heap[indexOfLargest];
      this.heap[indexOfLargest] = temp;
      this.shiftDown(indexOfLargest);
    }
  }

  isNotEmpty = () => {
    return this.heap.length > 1;
  }
}

function heapsort(array) {
  const { heap, heapAdd, isNotEmpty, popMax } = new Heap();

  // Вставим в неё по одному все элементы массива, сохраняя свойства кучи.
  for (item of array) {
    heapAdd(item); // код для heap_add можно посмотреть в прошлом уроке
  }

  // Будем извлекать из неё наиболее приоритетные элементы, удаляя их из кучи.
  const sortedArray = [];
  while (isNotEmpty()) {
    let max = popMax(heap);
    sortedArray.push(max);
  }
  return sortedArray;
}

function solve() {
  input.shift();

  const data = input.map((item) => item.split(" "));
  if (data[data.length - 1] && isNaN(Number(data[data.length - 1][1]))) {
    data.pop();
  }
  const sorted = heapsort(data);
  sorted.forEach((elem) => console.log(elem[0]));
}

solve()