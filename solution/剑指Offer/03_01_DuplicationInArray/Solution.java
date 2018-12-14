/**
 * @author bingo
 * @since 2018/12/13
 */

class Solution {
    
    /**
     * 查找数组中的重复元素
     * 
     * @param nums 数组
     * @return 其中一个重复的元素
     */
    public int duplicateInArray(int[] nums) {
        if (nums == null || nums.length < 2) {
            return -1;
        }

        int n = nums.length;
        for (int e : nums) {
            if (e < 0 || e > n - 1) {
                return -1;
            }
        }
        for (int i = 0; i < n; ++i) {
            while (nums[i] != i) {
                int val = nums[nums[i]];
                if (nums[i] == val) {
                    return val;
                }
                swap(nums, i, nums[i]);
            }
        }
        return -1;
    }

    private void swap(int[] nums, int i, int j) {
        int t = nums[i];
        nums[i] = nums[j];
        nums[j] = t;
    }
}