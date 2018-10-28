## 用两个栈实现队列

### 题目描述
用两个栈来实现一个队列，完成队列的 `Push` 和 `Pop` 操作。 队列中的元素为 `int` 类型。


### 解法
`Push` 操作，每次都存入 `stack1`；
`Pop` 操作，每次从 `stack2` 取：
- `stack2` 栈不为空时，不能将 `stack1` 元素倒入；
- `stack2` 栈为空时，需要一次将 `stack1` 元素全部倒入。

```java
import java.util.Stack;

/**
 * @author bingo
 * @since 2018/10/28
 */

public class Solution {
    Stack<Integer> stack1 = new Stack<Integer>();
    Stack<Integer> stack2 = new Stack<Integer>();
    
    public void push(int node) {
        stack1.push(node);
    }
    
    public int pop() {
        if (stack2.isEmpty()) {
            if (stack1.isEmpty()) {
                return -1;
            }
            while (!stack1.isEmpty()) {
                stack2.push(stack1.pop());
            }
        }
        return stack2.pop();
    }
}
```


### 测试用例
1. 普通二叉树（完全二叉树；不完全二叉树）；
2. 特殊二叉树（所有结点都没有左/右子结点；只有一个结点的二叉树；二叉树的根结点为空）；
3. 不同位置的结点的下一个结点（下一个结点为当前结点的右子结点、右子树的最左子结点、父结点、跨层的父结点等；当前结点没有下一个结点）。