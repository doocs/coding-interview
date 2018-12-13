/**
 * @author bingo
 * @since 2018/12/13
 */

class Solution {
    /**
     * 股票的最大利润
     * 
     * @param nums 数组
     * @return 最大利润
     */
    public int maxDiff(int[] nums) {
        if (nums == null || nums.length < 2) {
            return 0;
        }
        int min = nums[0];
        int maxGap = nums[1] - nums[0];
        for (int i = 2, n = nums.length; i < n; ++i) {
            min = Math.min(min, nums[i - 1]);
            maxGap = Math.max(maxGap, nums[i] - min);
        }
        return maxGap > 0 ? maxGap : 0;
    }
}