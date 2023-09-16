/**
Comment it before submitting 
class Node { 
    constructor(value, left = null, right = null) { 
        this.value = value; 
        this.left = left; 
        this.right = right; 
    } 
}
**/

function search(root, left, right, res) {
  if (!root) {
    return;
  }

  if (root.value >= left && root.value <= right) {
    search(root.left, left, right, res);
    search(root.right, left, right, res);
  } else if (root.value > left) {
    search(root.left, left, right, res);
  }

  if (root.value < left) {
    search(root.right, left, right, res);
  }

  if (root.value >= left && root.value <= right) {
    res.push(root.value);
  }
}

function printRange(root, left, right) {
  const result = [];
  search(root, left, right, result);

  result.sort((a, b) => a - b).forEach((item) => console.log(item));
}

function test() {
  var node1 = new Node(2, null, null);
  var node2 = new Node(1, null, node1);
  var node3 = new Node(8, null, null);
  var node4 = new Node(8, null, node3);
  var node5 = new Node(9, node4, null);
  var node6 = new Node(10, node5, null);
  var node7 = new Node(5, node2, node6);
  printRange(node7, 2, 8);
  // expected output: 2 5 8 8
}
