/**
 * @author bingo
 * @since 2018/12/17
 */

class Solution {

    /**
     * 计算数值的整数次方
     *
     * @param base 底数
     * @param exponent 指数
     * @return 数值的整数次方
     */
    public double Power(double base, int exponent) {
        if (exponent == 0) {
            return 1;
        }
        if (exponent == 1) {
            return base;
        }

        double res = Power(base, Math.abs(exponent) >> 1);
        res *= res;
        if ((exponent & 1) == 1) {
            res *= base;
        }
        return exponent > 0 ? res : 1 / res;
    }
}