function siftUp(heap, idx) {
  if (idx === 1) {
    return idx;
  }

  const parentIndex = Math.floor(idx / 2);

  if (heap[parentIndex] < heap[idx]) {
    const elem = heap[idx];
    heap[idx] = heap[parentIndex];
    heap[parentIndex] = elem;
    return siftUp(heap, parentIndex);
  }

  return idx;
}

function test() {
  var sample = [-1, 12, 6, 8, 3, 15, 7];
  console.assert(siftUp(sample, 5) == 1);
}