/**
 * @author bingo
 * @since 2018/12/17
 */

class Solution {

    /**
     * 求二进制中1的个数
     * 
     * @param n 整数
     * @return 该整数的二进制中1的个数
     */
    public int NumberOf1(int n) {
        int cnt = 0;
        while (n != 0) {
            ++cnt;
            n &= (n - 1);
        }
        return cnt;
    }
}