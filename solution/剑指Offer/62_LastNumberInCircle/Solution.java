/**
 * @author bingo
 * @since 2018/12/13
 */

class Solution {

    /**
     * 求圆圈最后一个数字
     *
     * @param n n个数 [0..n-1]
     * @param m 每次删除第 m 个数
     * @return 最后一个数字
     */
    public int lastRemaining(int n, int m) {
        if (n < 1 || m < 1) {
            return -1;
        }
        int res = 0;
        for (int i = 2; i <= n; ++i) {
            res = (res + m) % i;
        }
        return res;
    }
}