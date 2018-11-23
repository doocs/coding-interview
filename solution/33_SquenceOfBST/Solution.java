/**
 * @author bingo
 * @since 2018/11/23
 */

public class Solution {
    /**
     * 判断数组是否是某个二叉搜索树的后序遍历序列
     * 
     * @param sequence 数组
     * @return 是否属于某二叉搜索树的后序遍历序列
     */
    public boolean VerifySquenceOfBST(int[] sequence) {
        if (sequence == null) {
            return false;
        }

        return verify(sequence, 0, sequence.length - 1);
    }

    private boolean verify(int[] sequence, int start, int end) {
        if (start == end) {
            return true;
        }
        if (start > end) {
            return false;
        }
        int val = sequence[end];
        int i = start - 1;
        for (; i < end; ++i) {
            if (sequence[i + 1] >= val) {
                break;
            }
        }

        int j = i + 1;
        for (; j < end; ++j) {
            if (sequence[j] < val) {
                return false;
            }
        }

        if (i == start - 1 || i == end - 1) {
            return verify(sequence, start, end - 1);
        }

        return verify(sequence, 0, i) && verify(sequence, i + 1, end - 1);
    }
}