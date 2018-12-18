## [在O(1)时间删除链表节点](https://www.acwing.com/problem/content/85/)

### 题目描述
给定单向链表的一个节点指针，定义一个函数在 `O(1)` 时间删除该节点。

假设链表一定存在，并且该节点一定不是尾节点。

**样例**
```
输入：链表 1->4->6->8
      删掉节点：第2个节点即6（头节点为第0个节点）

输出：新链表 1->4->8
```

### 解法
判断要删除的节点是否是尾节点：

- 若是，那么需要遍历链表，找到节点的前一个节点，让前一个节点指向 `null`，时间复杂度为 `O(n)`；
- 若不是，把下一个节点的值赋给该节点，该节点指向下下个节点，时间复杂度为 `O(1)`。

题目中说明了节点不是尾节点，那么符合第二种情况。

```java
/**
 * @author bingo
 * @since 2018/12/18
 */

/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {

    /**
     * 删除链表的节点
     * 
     * @param node 要删除的节点
     */
    public void deleteNode(ListNode node) {
        node.val = node.next.val;
        node.next = node.next.next;
    }
}
```

### 测试用例
1. 功能测试（从有多个节点的链表的中间/头部/尾部删除一个节点；从只有一个节点的链表中删除唯一的节点）；
2. 特殊输入测试（指向链表头节点的为空指针；指向要删除节点的为空指针）。

### 题目导航
1. [返回上一题](/solution/剑指Offer/17_Print1ToMaxOfNDigits/README.md)
2. [进入下一题](/solution/剑指Offer/18_02_DeleteDuplicatedNode/README.md)
3. [回到题目列表](../README.md)