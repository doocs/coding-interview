/**
 * @author bingo
 * @since 2018/12/17
 */

class Solution {

    /**
     * 获取旋转数组的最小元素
     *
     * @param nums 旋转数组
     * @return 数组中的最小值
     */
    public int findMin(int[] nums) {
        if (nums == null || nums.length == 0) {
            return -1;
        }
        int start = 0, end = nums.length - 1;

        if (nums[start] < nums[end]) {
            // 说明这是一个单调递增数组
            return nums[start];
        }
        while (end - start > 1) {
            int mid = start + ((end - start) >> 1);
            if (nums[start] == nums[end] && nums[mid] == nums[start]) {
                // 三个数都相等，只能在[start, end)区间遍历，找出最小值
                return findMin(nums, start, end);
            }
            if (nums[mid] >= nums[start]) {
                start = mid;
            } else {
                end = mid;
            }
        }
        return nums[end];
    }

    private int findMin(int[] nums, int start, int end) {
        int min = Integer.MAX_VALUE;
        for (int i = start; i < end; ++i) {
            min = Math.min(min, nums[i]);
        }
        return min;
    }
}