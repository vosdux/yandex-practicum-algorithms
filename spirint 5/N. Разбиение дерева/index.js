/**
Comment it before submitting 
class Node { 
    constructor(value, left = null, right = null, size = 0) { 
        this.value = value; 
        this.left = left; 
        this.right = right; 
        this.size = size;
    } 
}
**/

function split(root, k) {
  if (root == null) {
    // Подумайте, что надо вернуть в таком случае.
    return [null, null];
  }
  if (root.left.size + 1 <= k) {
    k -= 1 + root.left.size;
    const [right, rightSide] = split(root.right, k);
    root.right = right;
    return [root, rightSide];
  }
  // Что должно происходить при спуске рекурсии в левое поддерево?
  const [left, leftSide] = split(root.left, k);
  root.left = left;
  return [leftSide, root];
}

function test() {
  const node1 = new Node(3, null, null, 1);
  const node2 = new Node(2, null, node1, 2);
  const node3 = new Node(8, null, null, 1);
  const node4 = new Node(11, null, null, 1);
  const node5 = new Node(10, node3, node4, 3);
  const node6 = new Node(5, node2, node5, 6);
  const res = split(node6, 4);

  console.assert(res[0].size === 4);
  console.assert(res[1].size === 2);
}
