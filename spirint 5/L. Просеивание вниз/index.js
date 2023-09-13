function siftDown(heap, idx) {
  const left = 2 * idx
  const right = 2 * idx + 1
  const size = heap.length - 1;

  let largestIndex = 0;

  if (left > size) {
    return idx;
  }

  if (right <= size && heap[left] < heap[right]) {
    largestIndex = right
  } else {
    largestIndex = left
  }

  if (heap[idx] < heap[largestIndex]) {
    let elem = heap[idx];
    heap[idx] = heap[largestIndex];
    heap[largestIndex] = elem;
    return siftDown(heap, largestIndex);
  }
  return idx;
}

function test() {
  //var sample = [-1, 12, 1, 8, 3, 4, 7];
  const sample = [-1, 12, 9, 6, 2, 4, 1]
  console.log(siftDown(sample, 6))
  console.assert(siftDown(sample, 6) == 5);
}
