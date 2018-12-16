/**
 * @author bingo
 * @since 2018/12/16
 */

class Solution {

    /**
     * 求斐波那契数列的第n项，n从0开始
     *
     * @param n 第n项
     * @return 第n项的值
     */
    public int Fibonacci(int n) {
        if (n < 2) {
            return n;
        }

        int a = 1, b = 1;
        for (int i = 2; i < n; ++i) {
            b = a + b;
            a = b - a;
        }
        return b;
    }
}