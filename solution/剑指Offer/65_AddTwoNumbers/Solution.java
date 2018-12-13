/**
 * @author bingo
 * @since 2018/12/13
 */

class Solution {

    /**
     * 不用加减乘除做加法
     *
     * @param num1 数1
     * @param num2 数2
     * @return 两数之和
     */
    public int add(int num1, int num2) {
        int sum, carry;
        while (true) {
            sum = num1 ^ num2;
            carry = (num1 & num2) << 1;
            num1 = sum;
            num2 = carry;
            if (num2 == 0) {
                break;
            }
        }
        return num1;
    }
}