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