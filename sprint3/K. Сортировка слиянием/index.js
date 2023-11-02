function merge_sort(arr, left, right, counter = 0) {
  if (right - left === 1) {
    return [arr[left]];
  }

  const mid = Math.floor((left + right) / 2);
  const leftArr = merge_sort(arr, left, mid, counter + 1);
  const rightArr = merge_sort(arr, mid, right, counter + 1);
  const result = merge(
    [...leftArr, ...rightArr],
    0,
    leftArr.length,
    leftArr.length + rightArr.length
  );

  if (counter === 0) {
    result.forEach((element, index) => {
      arr[index] = element;
    });
  } else {
    return result;
  }
}
function merge(arr, left, mid, right) {
  const result = [];
  let firstCounter = left;
  let secondCounter = mid;
  while (firstCounter !== mid && secondCounter !== right) {
    const elemFromFirst = arr[firstCounter];
    const elemFromSecond = arr[secondCounter];
    if (elemFromSecond > elemFromFirst) {
      result.push(elemFromFirst);
      firstCounter += 1;
    } else if (elemFromFirst === elemFromSecond) {
      result.push(elemFromFirst);
      result.push(elemFromSecond);
      firstCounter += 1;
      secondCounter += 1;
    } else {
      result.push(elemFromSecond);
      secondCounter += 1;
    }
  }

  if (firstCounter < mid) {
    for (let i = firstCounter; i < mid; i++) {
      result.push(arr[i]);
    }
  } else if (secondCounter < right) {
    for (let i = secondCounter; i < right; i++) {
      result.push(arr[i]);
    }
  }
  return result;
}

function test() {
  var a = [1, 4, 9, 2, 10, 11];
  var b = merge(a, 0, 3, 6);
  var expected = [1, 2, 4, 9, 10, 11];

  var c = [1, 4, 2, 10, 1, 2];
  merge_sort(c, 0, 6);
  expected = [1, 1, 2, 2, 4, 10];
}
