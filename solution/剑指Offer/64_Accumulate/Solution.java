import java.util.stream.IntStream;

/**
 * @author bingo
 * @since 2018/12/13
 */

class Solution {

    /**
     * 求1+2+…+n（不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C））
     *
     * @param n 1~n
     * @return 1~n的和
     */
    public int getSum(int n) {
        return IntStream.rangeClosed(1, n).sum();
    }
}