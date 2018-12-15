## [从尾到头打印链表](https://www.acwing.com/problem/content/18/)

### 题目描述
输入一个链表的头结点，按照 从尾到头 的顺序返回节点的值。

返回的结果用数组存储。

**样例**
```
输入：[2, 3, 5]
返回：[5, 3, 2]
```

### 解法
遍历链表，每个链表结点值 `push` 进栈，最后将栈中元素依次 `pop` 到数组中。

```java
/**
 * @author bingo
 * @since 2018/12/15
 */

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {

    /**
     * 从尾到头打印链表
     *
     * @param head 链表头结点
     * @return 结果数组
     */
    public int[] printListReversingly(ListNode head) {
        if (head == null) {
            return null;
        }
        Stack<Integer> stack = new Stack<>();
        ListNode cur = head;
        int cnt = 0;
        while (cur != null) {
            stack.push(cur.val);
            cur = cur.next;
            ++cnt;
        }

        int[] res = new int[cnt];
        int i = 0;
        while (!stack.isEmpty()) {
            res[i++] = stack.pop();
        }
        return res;
    }
}
```

### 测试用例
1. 功能测试（输入的链表有多个结点；输入的链表只有一个结点）；
2. 特殊输入测试（输入的链表结点指针为空）。

### 题目导航
1. [返回上一题](/solution/剑指Offer/05_ReplaceSpaces/README.md)
2. [进入下一题](/solution/剑指Offer/07_ConstructBinaryTree/README.md)
3. [回到题目列表](../README.md)