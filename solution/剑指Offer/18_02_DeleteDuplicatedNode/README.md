## [删除链表中重复的节点](https://www.acwing.com/problem/content/27/)

### 题目描述
在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留。

**样例1**
```
输入：1->2->3->3->4->4->5

输出：1->2->5
```

**样例2**
```
输入：1->1->1->2->3

输出：2->3
```

### 解法
#### 解法一：递归

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
     * 删除链表重复的节点
     *
     * @param head 链表头节点
     * @return 删除重复节点后的链表
     */
    public ListNode deleteDuplication(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        if (head.next.val == head.val) {
            if (head.next.next == null) {
                return null;
            }
            if (head.next.next.val == head.val) {
                return deleteDuplication(head.next);
            }
            return deleteDuplication(head.next.next);
        }
        head.next = deleteDuplication(head.next);
        return head;
    }
}
```

#### 解法二
pre 始终指向下一个不重复的节点。

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
     * 删除链表重复的节点
     *
     * @param head 链表头节点
     * @return 删除重复节点后的链表
     */
    public ListNode deleteDuplication(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode pre = null, cur = head;
        while (cur != null) {
            if (cur.next != null && cur.next.val == cur.val) {
                int val = cur.val;
                while (cur.next != null && cur.next.val == val) {
                    cur = cur.next;
                }
                if (pre == null) {
                    head = cur.next;
                } else {
                    pre.next = cur.next;
                }
            } else {
                pre = cur;
            }
            cur = cur.next;
        }
        return head;
    }
}
```

### 测试用例
1. 功能测试（重复的节点位于链表的头部/中间/尾部；链表中没有重复的节点）；
2. 特殊输入测试（指向链表头节点的为空指针；链表中所有节点都是重复的）。

### 题目导航
1. [返回上一题](/solution/剑指Offer/18_01_DeleteNodeInList/README.md)
2. [进入下一题](/solution/剑指Offer/19_RegularExpressionsMatching/README.md)
3. [回到题目列表](../README.md)