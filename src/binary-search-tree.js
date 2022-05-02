const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  // return root node of the tree
  root() {
    return this.rootNode;
  }

  // add node with value to the tree
  add(value) {
    this.rootNode = addWithin(this.rootNode, value);

    function addWithin(node, value) {
      // if the node is null - make new node
      if (!node) {
        return new Node(value);
      }
      
      // if the node value is equal to the value - dont add the value
      if (node.data === value) {
        return node;
      }
      
      // if the value is less than the node value - add to the left children
      // if the value is greater than the node value - add to the right children
      if (value < node.data) {
        node.left = addWithin(node.left, value);
      } else {
        node.right = addWithin(node.right, value);
      }

      return node;
    }
  }

  // returns true if node with the value exists in the tree and false otherwise
  has(value) {
    return searchWithin(this.rootNode, value);

    function searchWithin(node, value) {
      // if the node is null in this branch - tree has not value
      if (!node) {
        return false;
      }
      
      // if the node value equal to the value - tree has value
      if (node.data === value) {
        return true;
      }

      // if the value is less than the node value - search in the left children
      // if the value is greater than the node value - search in the right children
      return value < node.data ?
        searchWithin(node.left, value) :
        searchWithin(node.right, value);
    }
  }

  // returns node with the data if node with the value exists in the tree and null otherwise
  find(value) {
    return findWithin(this.rootNode, value);

    function findWithin(node, value) {
      // if the node is null in this branch - tree has not value
      if (!node) {
        return null;
      }
      
      // if the node value equal to the value - return this node
      if (node.data === value) {
        return node;
      }

      // if the value is less than the node value - search in the left children
      // if the value is greater than the node value - search in the right children
      return value < node.data ?
        findWithin(node.left, value) :
        findWithin(node.right, value);
    }
  }

  // removes node with the value from the tree if node with the data exists
  remove(value) {
    this.rootNode = removeNode(this.rootNode, value);

    function removeNode(node, value) {
      // if the node is null in this branch - tree has not the match
      if (!node) {
        return node;
      }

      // find the match
      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = removeNode(node.right, value);
        return node;
      } else if (value === node.data) {
        // equal = should remove this node

        if (!node.left && !node.right) {
          // put null instead of node
          return null;
        }

        if (!node.left) {
          // set right child instead node 
          node = node.right;
          return node;
        }

        if (!node.right) {
          // set left child instead node
          node = node.left;
          return node;
        }

        // both children exists for this node
        let minFromRightChild = node.right;
        while (minFromRightChild.left) {
          minFromRightChild = minFromRightChild.left;
        }

        // rewrite node date to the min value from right child
        node.data = minFromRightChild.data;

        // remove node with the min value from right child
        node.right = removeNode(node.right, minFromRightChild.data);

        return node;
      }
    }
  }

  // returns minimal value stored in the tree (or null if tree has no nodes)
  min() {
    if (!this.rootNode) {
      return null;
    }

    let minNode = this.rootNode;
    while (minNode.left) {
      minNode = minNode.left;
    }

    return minNode.data;
  }

  // returns maximal value stored in the tree (or null if tree has no nodes)
  max() {
    if (!this.rootNode) {
      return null;
    }

    let maxNode = this.rootNode;
    while (maxNode.right) {
      maxNode = maxNode.right;
    }

    return maxNode.data;
  }
}

module.exports = {
  BinarySearchTree
};