/**
 * @author bingo
 * @since 2018/12/16
 */

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode father;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {

    /**
     * 获取二叉树中序遍历结点的下一个结点
     *
     * @param p 某结点
     * @return p的下一个结点
     */
    public TreeNode inorderSuccessor(TreeNode p) {
        if (p == null) {
            return null;
        }

        TreeNode cur = p.right;

        // 右子树不为空
        if (cur != null) {
            while (cur.left != null) {
                cur = cur.left;
            }
            return cur;
        }

        // 右子树为空
        TreeNode father = p.father;
        while (father != null && father.left != p) {
            p = father;
            father = p.father;
        }
        return father;
    }
}