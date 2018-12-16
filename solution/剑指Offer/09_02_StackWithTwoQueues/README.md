## [用两个队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues/)

### 题目描述
使用队列实现栈的下列操作：

- push(x) -- 元素 x 入栈
- pop() -- 移除栈顶元素
- top() -- 获取栈顶元素
- empty() -- 返回栈是否为空

**注意:**

- 你只能使用队列的基本操作-- 也就是 `push to back`, `peek/pop from front`, `size`, 和 `is empty` 这些操作是合法的。
- 你所使用的语言也许不支持队列。 你可以使用 list 或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。
- 你可以假设所有操作都是有效的（例如, 对一个空的栈不会调用 pop 或者 top 操作）。


### 解法
- 出栈时，先将队列的元素依次移入另一个队列中，直到队列剩下一个元素。将该元素出队即可。
- 进栈时，将元素压入不为空的那一个队列即可。如果两队列都为空，随便压入其中一个队列。

```java
/**
 * @author bingo
 * @since 2018/12/16
 */

class MyStack {

    private Queue<Integer> q1;
    private Queue<Integer> q2;

    /** Initialize your data structure here. */
    public MyStack() {
        q1 = new LinkedList<>();
        q2 = new LinkedList<>();
    }

    /** Push element x onto stack. */
    public void push(int x) {
        if (empty() || q2.isEmpty()) {
            q1.offer(x);
        } else {
            q2.offer(x);
        }
    }

    /** Removes the element on top of the stack and returns that element. */
    public int pop() {
        if (q1.isEmpty()) {
            while (q2.size() > 1) {
                q1.offer(q2.poll());
            }
            return q2.poll();
        }

        while (q1.size() > 1) {
            q2.offer(q1.poll());
        }
        return q1.poll();
    }

    /** Get the top element. */
    public int top() {
        int val = pop();
        push(val);
        return  val;
    }

    /** Returns whether the stack is empty. */
    public boolean empty() {
        return q1.isEmpty() && q2.isEmpty();
    }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * MyStack obj = new MyStack();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.top();
 * boolean param_4 = obj.empty();
 */
```

### 测试用例
1. 往空的栈里添加、删除元素；
2. 往非空的栈添加、删除元素；
3. 连续删除元素直至栈为空。

### 题目导航
1. [返回上一题](/solution/剑指Offer/09_01_QueueWithTwoStacks/README.md)
2. [进入下一题](/solution/剑指Offer/10_01_Fibonacci/README.md)
3. [回到题目列表](../README.md)