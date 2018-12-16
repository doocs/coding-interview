## [用两个栈实现队列](https://www.acwing.com/problem/content/36/)

### 题目描述
请用栈实现一个队列，支持如下四种操作：

- push(x) – 将元素x插到队尾。
- pop(x) – 将队首的元素弹出，并返回该元素。
- peek() – 返回队首元素。
- empty() – 返回队列是否为空。

**注意：**

- 你只能使用栈的标准操作：`push to top`，`peek/pop from top`, `size` 和 `is empty`；
- 如果你选择的编程语言没有栈的标准库，你可以使用 list 或者 deque 等模拟栈的操作；
- 输入数据保证合法，例如，在队列为空时，不会进行 `pop` 或者 `peek` 等操作；

**样例**
```java
MyQueue queue = new MyQueue();

queue.push(1);
queue.push(2);
queue.peek();  // returns 1
queue.pop();   // returns 1
queue.empty(); // returns false
```

### 解法
`push` 操作，每次都存入 `s1`；
`pop` 操作，每次从 `s2` 取：
- `s2` 栈不为空时，不能将 `s1` 元素倒入；
- `s2` 栈为空时，需要一次将 `s1` 元素全部倒入。

```java
/**
 * @author bingo
 * @since 2018/12/16
 */

class MyQueue {

    private Stack<Integer> s1;
    private Stack<Integer> s2;

    /** Initialize your data structure here. */
    public MyQueue() {
        s1 = new Stack<>();
        s2 = new Stack<>();
    }

    /** Push element x to the back of queue. */
    public void push(int x) {
        s1.push(x);
    }

    /** Removes the element from in front of queue and returns that element. */
    public int pop() {
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
        }
        return s2.pop();
    }

    /** Get the front element. */
    public int peek() {
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
        }
        return s2.peek();
    }

    /** Returns whether the queue is empty. */
    public boolean empty() {
        return s1.isEmpty() && s2.isEmpty();
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue obj = new MyQueue();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.peek();
 * boolean param_4 = obj.empty();
 */
```

### 测试用例
1. 往空的队列里添加、删除元素；
2. 往非空的队列添加、删除元素；
3. 连续删除元素直至队列为空。

### 题目导航
1. [返回上一题](/solution/剑指Offer/08_NextNodeInBinaryTrees/README.md)
2. [进入下一题](/solution/剑指Offer/09_02_StackWithTwoQueues/README.md)
3. [回到题目列表](../README.md)