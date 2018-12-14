## [找出数组中重复的数字](https://www.acwing.com/problem/content/14/)

### 题目描述
给定一个长度为 `n` 的整数数组 `nums`，数组中所有的数字都在 `0∼n−1` 的范围内。

数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。

请找出数组中任意一个重复的数字。

**注意**：如果某些数字不在 `0∼n−1` 的范围内，或数组中不包含重复数字，则返回 `-1`；

**样例**
```
给定 nums = [2, 3, 5, 4, 3, 2, 6, 7]。

返回 2 或 3。
```

### 解法
#### 解法一
排序后，顺序扫描，判断是否有重复，时间复杂度为 `O(n²)`。

#### 解法二
利用哈希表，遍历数组，如果哈希表中没有该元素，则存入哈希表中，否则返回重复的元素。时间复杂度为 `O(n)`，空间复杂度为 `O(n)`。

#### 解法三
长度为 `n`，元素的数值范围也为 `n`，如果没有重复元素，那么数组每个下标对应的值与下标相等。

从头到尾遍历数组，当扫描到下标 `i` 的数字 `nums[i]`：
- 如果等于 `i`，继续向下扫描；
- 如果不等于 `i`，拿它与第 `nums[i]` 个数进行比较，如果相等，说明有重复值，返回 `nums[i]`。如果不相等，就把第 `i` 个数 和第 `nums[i]` 个数交换。重复这个比较交换的过程。

此算法时间复杂度为 `O(n)`，因为每个元素最多只要两次交换，就能确定位置（比如把 2 跟 5 交换，此时 2 在正确的位置，而 5 需要再交换一次就能跑到正确的位置）。空间复杂度为 `O(1)`。

```java
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
```

### 测试用例
1. 长度为 n 的数组中包含一个或多个重复的数字；
2. 数组中不包含重复的数字；
3. 无效测试输入用例（输入空指针；长度为 n 的数组中包含 0~n-1 之外的数字）。

### 题目导航
1. [进入下一题](/solution/剑指Offer/03_02_DuplicationInArrayNoEdit/README.md)
2. [回到题目列表](../README.md)