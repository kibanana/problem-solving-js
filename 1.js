// 참고자료
// https://velog.io/@kimkevin90/Javascript를-이용한-Linked-List-구현
// https://velog.io/@camel-man-ims/LinkedList-%EC%A4%91%EB%B3%B5%EB%90%9C-%EA%B0%92-%EC%A0%9C%EA%B1%B0

// 1. 중복되는 원소를 제거하는 코드
// Linked List 클래스의 removeDuplication 메소드
// 중복되는 원소를 제거하되 버퍼를 사용하지 않기 위해 
// 특정 노드를 기준으로 잡고 다음 노드들에 차례대로 접근하면서 중복 여부를 확인했습니다.

// 2. 리스트의 사이즈를 확인할 수 있는 기능
// Linked List 클래스의 getSize 메소드
// Linked List에 값이 삽입되고, 삭제될 때마다 리스트의 사이즈를 나타내는 size 멤버변수 값을 수정하도록 구현했습니다.
// 그리고 이 size 멤버변수 값을 getSize 메소드를 통해 확인할 수 있도록 구현했습니다.

class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    getSize() { // 리스트의 사이즈 반환
        return this.size;
    }

    insertFirst(data) {
        this.head = new Node(data, this.head);
        this.size++;
    }

    insertLast(data) {
        const node = new Node(data);
        let current = null;

        if (this.head) {
            current = this.head;
            while (current.next) current = current.next;
            current.next = node;
        } else {
            this.head = node;
        }
        
        this.size++;
    }

    insertAt(data, index) {
        if (index < 0 || (index > 0 && index > this.size)) return;

        if (index === 0) {
            this.head = new Node(data, this.data);
        } else {
            const node = new Node(data);
            let current = this.head;
            let previous = null;
            let count = 0;

            while (count < index) {
                previous = current;
                current = current.next;
                count++;
            }

            node.next = current;
            previous.next = node;
        }

        this.size++;
    }

    getAt(index) {
        if (index < 0 || (index > this.size)) return;

        let current = this.head;
        let count = 0;

        while (current) {
            if (count === index) return current.data;
            current = current.next;
            count++;
        }

        return current.data;
    }

    removetAt(index) {
        if (index < 0 || (index > this.size)) return;

        let previous = null;
        let current = this.head;
        let count = 0;

        if (index === 0) this.head = current.next;
        else {
            while (count < index) {
                previous = current;
                current = current.next;
                count++;
            }

            previous.next = current.next;
        }

        this.size--;
    }

    removeDuplication() { // 중복되는 원소 제거
        let current = this.head;

        while (current && current.next) {
            let start = current;

            while (start.next) {
                if (current.data === start.next.data) {
                    start.next = start.next.next;
                    this.size--;
                }
                else start = start.next;
            }

            current = current.next;
        }
    }

    clear() {
        this.head = null;
        this.size = 0;
    }

    print() {
        let index = 0;
        let current = this.head;

        while (current) {
            console.log(`${index} : ${current.data}`);
            current = current.next;
            index++;
        }
    }
}

const linkedList = new LinkedList();
linkedList.insertLast(500);
linkedList.insertLast(300);
linkedList.insertLast(400);
linkedList.insertLast(200);
linkedList.insertLast(100);
linkedList.insertFirst(500);
linkedList.insertFirst(300);
linkedList.insertFirst(400);
linkedList.insertFirst(200);
linkedList.insertFirst(100);

console.log(linkedList.getSize());
linkedList.print();

linkedList.removeDuplication();

console.log(linkedList.getSize());
linkedList.print();

linkedList.clear();

// Output:

// 10
// 0 : 100
// 1 : 200
// 2 : 400
// 3 : 300
// 4 : 500
// 5 : 500
// 6 : 300
// 7 : 400
// 8 : 200
// 9 : 100
// 5
// 0 : 100
// 1 : 200
// 2 : 400
// 3 : 300
// 4 : 500