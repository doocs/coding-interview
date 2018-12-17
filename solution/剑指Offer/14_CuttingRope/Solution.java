/**
 * @author bingo
 * @since 2018/12/17
 */

class Solution {

    /**
     * 剪绳子求最大乘积
     *
     * @param length 绳子长度
     * @return 乘积最大值
     */
    public int maxProductAfterCutting(int length) {
        if (length < 4) {
            return length - 1;
        }

        int timesOf3 = length / 3;
        if (length % 3 == 1) {
            --timesOf3;
        }
        int timesOf2 = (length - timesOf3 * 3) >> 1;
        return (int) (Math.pow(2, timesOf2) * Math.pow(3, timesOf3));
    }
}