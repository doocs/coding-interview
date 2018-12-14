/**
 * @author bingo
 * @since 2018/12/13
 */

class Solution {

    /**
     * 不修改数组查找重复的元素，没有则返回0
     *
     * @param nums 数组
     * @return 重复的元素
     */
    public int duplicateInArray(int[] nums) {
        if (nums == null || nums.length < 2) {
            return 0;
        }
        int start = 1, end = nums.length - 1;
        while (start <= end) {
            int mid = start + ((end - start) >> 1);
            int cnt = getCountRange(nums, start, mid);
            if (start == end) {
                if (cnt > 1) {
                    // 找到重复的数字
                    return start;
                }
                break;
            }
            if (cnt > mid - start + 1) {
                end = mid;
            } else {
                start = mid + 1;
            }
        }
        return 0;
    }

    /**
     * 计算整个数组中有多少个数的取值在[from, to] 之间
     *
     * @param nums 数组
     * @param from 左边界
     * @param to   右边界
     * @return 数量
     */
    private int getCountRange(int[] nums, int from, int to) {
        int cnt = 0;
        for (int e : nums) {
            if (e >= from && e <= to) {
                ++cnt;
            }
        }
        return cnt;
    }
}