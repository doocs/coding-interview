## [重建二叉树](https://www.acwing.com/problem/content/description/23/)

### 题目描述
输入一棵二叉树前序遍历和中序遍历的结果，请重建该二叉树。

**样例**
```
给定：
前序遍历是：[3, 9, 20, 15, 7]
中序遍历是：[9, 3, 15, 20, 7]

返回：[3, 9, 20, null, null, 15, 7, null, null, null, null]
返回的二叉树如下所示：
    3
   / \
  9  20
    /  \
   15   7
```

### 解法
在二叉树的前序遍历序列中，第一个数字总是根结点的值。在中序遍历序列中，根结点的值在序列的中间，左子树的结点位于根结点左侧，而右子树的结点位于根结点值的右侧。

遍历中序序列，找到根结点，递归构建左子树与右子树。

注意添加特殊情况的 `if` 判断。

```java
/**
 * @author bingo
 * @since 2018/12/15
 */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {

    /**
     * 重建二叉树
     *
     * @param preorder 前序遍历序列
     * @param inorder 中序遍历序列
     * @return 二叉树根结点
     */
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        if (preorder == null || inorder == null || preorder.length == 0 || preorder.length != inorder.length) {
            return null;
        }

        return build(preorder, inorder, 0, preorder.length - 1, 0, inorder.length - 1);
    }

    private TreeNode build(int[] preorder, int[] inorder, int s1, int e1, int s2, int e2) {
        int rootVal = preorder[s1];
        TreeNode root = new TreeNode(rootVal);
        if (s1 == e1) {
            return root;
        }

        int i = s2, cnt = 0;
        for (; i <= e2; ++i) {
            if (inorder[i] == rootVal) {
                break;
            }
            ++cnt;
        }

        root.left = cnt > 0 ? build(preorder, inorder, s1 + 1, s1 + cnt, s2, i - 1) : null;
        root.right = i < e2 ? build(preorder, inorder, s1 + cnt + 1, e1, i + 1, e2) : null;
        return root;
    }
}
```

### 测试用例
1. 普通二叉树（完全二叉树；不完全二叉树）；
2. 特殊二叉树（所有结点都没有左/右子结点；只有一个结点的二叉树）；
3. 特殊输入测试（二叉树根结点为空；输入的前序序列和中序序列不匹配）。

### 题目导航
1. [返回上一题](/solution/剑指Offer/06_PrintListInReversedOrder/README.md)
2. [进入下一题](/solution/剑指Offer/08_NextNodeInBinaryTrees/README.md)
3. [回到题目列表](../README.md)