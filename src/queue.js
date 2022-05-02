const { NotImplementedError } = require('../extensions/index.js');
const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.head = null; 
  }

  getUnderlyingList() {
    return this.head;
  }

  enqueue(value) {
    this.head = addToTheEnd(this.head, value);

    function addToTheEnd(node, value) {
      if (!node) {
        node = new ListNode(value);
        return node;
      }

      node.next = addToTheEnd(node.next, value);
      return node;
    }
  }

  dequeue() {
    const firstValue = this.head.value;
    this.head = this.head.next;

    return firstValue;
  }
}

module.exports = {
  Queue
};
