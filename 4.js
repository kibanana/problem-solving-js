// 참고자료
// https://gist.github.com/Prottoy2938/c61a4fa5614c0086952e2464b80136be
// https://dobby-the-house-elf.tistory.com/55

// 높이가 최소인 이진 탐색 트리는 곧 중간값이 루트에 있는 이진 탐색 트리입니다.
// 이를 구현하기 위해 BinarySearchTree 클래스의 생성자에서 받은 배열을 재귀함수에 전달하여 이진 탐색 트리를 구성하였습니다.
// 예시)
//         5
//      /     \
//     3       8
//    / \     / \
//   2   4   7   9
//  /       /
// 1       6

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    preOrder() {
        console.log(this.value);
        if (this.left) this.left.preOrder();
        if (this.right) this.right.preOrder();
    }

    inOrder() {
        if (this.left) this.left.inOrder();
        console.log(this.value);
        if (this.right) this.right.inOrder();
    }

    postOrder() {
        if (this.left) this.left.postOrder();
        if (this.right) this.right.postOrder();
        console.log(this.value);
    }
}

class BinarySearchTree {
    constructor(arr) {
        this.root = this.insert(arr, 0, arr.length - 1);
    }

    insert(arr, start, end) {
        if (start > end) return null;

        const center = Math.floor((start + end + 1) / 2);

        const node = new Node(arr[center]);
        node.left = this.insert(arr, start, center - 1);
        node.right = this.insert(arr, center + 1, end);
        
        return node;
    }

    find(value) {
        if (!this.root) return null;
        let current = this.root;

        while (true) {
            if (!current) return undefined;
            
            if (current.value > value) current = current.left;
            else if (current.value < value) current = current.right;
            else return current;
        }
    }

    contains(value) {
        if (!this.root) return false;
        let current = this.root;

        while (true) {
            if (!current) return false;
            
            if (current.value > value) current = current.left;
            else if (current.value < value) current = current.right;
            else return true;
        }
    }

    preOrder() {
        this.root.preOrder();
    }

    inOrder() {
        this.root.inOrder();
    }

    postOrder() {
        this.root.postOrder();
    }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const binarySearchTree = new BinarySearchTree(arr);

binarySearchTree.preOrder(); // 전위순회
console.log();
binarySearchTree.inOrder(); // 중위순회
console.log();
binarySearchTree.postOrder(); // 후위순회

// output:
// 5
// 3
// 2
// 1
// 4
// 8
// 7
// 6
// 9

// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9

// 1
// 2
// 4
// 3
// 6
// 7
// 9
// 8
// 5