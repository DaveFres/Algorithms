class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val) {
        let newNode = new Node(val);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }

        this.length++;
        return this;
    }

    pop() {
        if (!this.head) {
            return undefined;
        }
        let oldTail = this.tail;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = oldTail.prev;
            this.tail.next = null;
            oldTail.prev = null;
        }

        this.length--;
        return oldTail;
    }

    shift() {
        if (!this.head) {
            return undefined;
        }
        let oldHead = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = oldHead.next;
            this.head.prev = null;
            oldHead.next = null;
        }
        this.length--;
        return oldHead;
    }

    unshift(val) {
        let newNode = new Node(val);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }

        if (index <= this.length / 2) {
            let count = 0;
            let curr = this.head;
            while (count !== index) {
                curr = curr.next;
                count++;
            }
            return curr;
        } else {
            let count = this.length - 1;
            let curr = this.tail;
            while (count !== index) {
                curr = curr.prev;
                count--;
            }
            return curr;
        }
    }

    set(index, value) {
        let node = this.get(index);
        if (node != null) {
            node.val = value;
            return true;
        }
        return false;
    }
    insert(index, value) {
        if (index < 0 || index > this.length) {
            return false;
        }
        if(index === 0) {
            return !!this.unshift(value);
        }
        if(index === this.length) {
            return !!this.push(value);
        }
        let newNode = new Node(value);
        let prevNode = this.get(index - 1);

        newNode.next = prevNode.next;
        newNode.next.prev = newNode;

        prevNode.next = newNode;
        newNode.prev = prevNode;

        this.length++;
        return true;

    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            return undefined;
        } 
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        
        let nodeToDelete = this.get(index);
        let beforeNode = nodeToDelete.prev;
        let afterNode = nodeToDelete.next;

        afterNode.prev = beforeNode;
        beforeNode.next = afterNode;

        nodeToDelete.next = null;
        nodeToDelete.prev = null;
        
        this.length--;
        return nodeToDelete;

    }
}
