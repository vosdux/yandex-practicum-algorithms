/*
Comment it before submitting
class Node {  
  constructor(value = null, next = null) {  
    this.value = value;  
    this.next = next;  
  }  
}
*/

function solution(node, elem) {
  let index = 0;
  let localNode = node;
  let fail = false;

  while (localNode.value !== elem) {
    if (!localNode.next) {
      fail = true;
      break;
    }
    localNode = localNode.next;
    index += 1;
  }

  if (fail) {
    return -1;
  }

  return index;
}

function test() {
  var node3 = new Node("node3");
  var node2 = new Node("node2", node3);
  var node1 = new Node("node1", node2);
  var node0 = new Node("node0", node1);
  var idx = solution(node0, "node2");
  // result is idx === 2
}
