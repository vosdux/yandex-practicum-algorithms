/*
Comment it before submitting
class Node {  
  constructor(value = null, next = null) {  
    this.value = value;  
    this.next = next;  
  }  
}
*/

function solution(node, idx) {
  if (idx === 0) {
    const newHead = node.next;
    node.next = undefined;
    return newHead;
  }

  let index = 0;
  let localNode = node;
  let prevNode = null;

  while (index !== idx) {
    if (!localNode.next) {
      break;
    }
    prevNode = localNode;
    localNode = localNode.next;
    index += 1;
  }

  prevNode.next = localNode.next;
  localNode.next = undefined;
  return node;
}

function test() {
  var node3 = new Node("node3");
  var node2 = new Node("node2", node3);
  var node1 = new Node("node1", node2);
  var node0 = new Node("node0", node1);
  var newHead = solution(node0, 1);
  // result is node0 -> node2 -> node3
}
