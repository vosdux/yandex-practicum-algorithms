/* ID: 90531239
Необходимо составить остовное дерево. При составлении оставного дерева
необходимо брать и сохранять вершину с самым тяжёлым ребром, которое к ней
ведёт.
Для реализации данного алгоритма используются функции findMST и addVertex.
При запуске функции findMST, берётся самая первая вершина и запускается
функция addVertex, которая добавляет все рёбра с вершинами у взятой вершины
в кучу (edges) и добавляет в set added(т.к.
данная вершина уже будет добавлена и больше её обрабатывать не нужно). После
данной операции, в функции findMST выбирается максимальная вершина из
кучи, и повторяется весь алгоритм заново, пока все вершины
с рёбрами не будут добавлены в оставное дерево

Временная сложность: O(E * logV), где E — количество рёбер в графе, а V — количество
вершин. Т.к. используется очередь с приоритетом (куча).

Пространственная сложность: O(V * E)

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

function solve() {
  const [peaksCount, connectionsCount] = input[0].split(" ");
  const error = "Oops! I did it again";

  const added = new Set();
  let edges = new MaxHeap();
  let weight = BigInt(0);

  const adjList = getAdjList(peaksCount);

  if (connectionsCount === "0") {
    if (peaksCount === "1") {
      console.log(0);
      return;
    } else {
      console.log(error);
      return;
    }
  }

  function addVertex(v) {
    added.add(v);

    adjList[v]
      .filter((elem) => !added.has(elem[0]))
      .forEach((item) => {
        edges.add(item);
      });
  }

  function findMST() {
    let v = 1;

    addVertex(v);

    while (added.size !== Number(peaksCount) && !edges.isEmpty()) {
      const e = edges.remove();

      if (!added.has(e[0])) {
        weight += e[1];
        addVertex(e[0]);
      }
    }

    if (added.size !== Number(peaksCount)) {
      console.log(error);
    } else {
      console.log(weight.toString());
    }
  }

  findMST();
}

function getAdjList(peaksCount) {
  const map = {};
  for (let i = 1; i < Number(peaksCount) + 1; i++) {
    map[i] = {};
  }

  for (let i = 1; i < input.length; i++) {
    const [from, to, weight] = input[i].split(" ");
    const numberFrom = Number(from);
    const numberTo = Number(to);
    const numberWeight = Number(weight);

    if (map[numberFrom][numberTo]) {
      map[numberFrom][numberTo] = Math.max(
        map[numberFrom][numberTo],
        numberWeight
      );
    } else {
      map[numberFrom][numberTo] = weight;
    }

    if (map[numberTo][numberFrom]) {
      map[numberTo][numberFrom] = Math.max(
        map[numberTo][numberFrom],
        numberWeight
      );
    } else {
      map[numberTo][numberFrom] = weight;
    }
  }

  Object.keys(map).forEach((key) => {
    map[key] = Object.entries(map[key]).map(([key, value]) => [
      Number(key),
      BigInt(value),
    ]);
  });

  return map;
}

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Helper Methods
  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  leftChild(index) {
    return this.heap[this.getLeftChildIndex(index)];
  }

  rightChild(index) {
    return this.heap[this.getRightChildIndex(index)];
  }

  parent(index) {
    return this.heap[this.getParentIndex(index)];
  }

  swap(indexOne, indexTwo) {
    const temp = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo];
    this.heap[indexTwo] = temp;
  }

  remove() {
    if (this.heap.length === 0) {
      return null;
    }
    const item = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();
    return item;
  }

  add(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (
      this.hasParent(index) &&
      this.parent(index)[1] < this.heap[index][1]
    ) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let largerChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        this.rightChild(index)[1] > this.leftChild(index)[1]
      ) {
        largerChildIndex = this.getRightChildIndex(index);
      }
      if (this.heap[index][1] > this.heap[largerChildIndex][1]) {
        break;
      } else {
        this.swap(index, largerChildIndex);
      }
      index = largerChildIndex;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}
