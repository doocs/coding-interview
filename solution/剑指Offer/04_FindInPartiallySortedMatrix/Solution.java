/**
 * @author bingo
 * @since 2018/12/15
 */

class Solution {

    /**
     * 二维数组中的查找
     *
     * @param array 二维数组
     * @param target 要查找的值
     * @return 是否找到该值
     */
    public boolean searchArray(int[][] array, int target) {
        if (array == null || array.length < 1) {
            return false;
        }
        int m = array.length, n = array[0].length;
        int i = 0, j = n - 1;
        while (i < m && j >= 0) {
            if (array[i][j] == target) {
                return true;
            }
            if (array[i][j] < target) {
                ++i;
            } else {
                --j;
            }
        }
        return false;
    }
}