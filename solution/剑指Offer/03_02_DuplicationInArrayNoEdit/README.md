## [不修改数组找出重复的数字](https://www.acwing.com/problem/content/15/)

### 题目描述
给定一个长度为 `n+1` 的数组 `nums`，数组中所有的数均在 `1∼n` 的范围内，其中 `n≥1`。

请找出数组中任意一个重复的数，但不能修改输入的数组。

**样例**
```
给定 nums = [2, 3, 5, 4, 3, 2, 6, 7]。

返回 2 或 3。
```

**思考题**：如果只能使用 `O(1)` 的额外空间，该怎么做呢？


### 解法
#### 解法一
创建长度为 `n+1` 的辅助数组，把原数组的元素复制到辅助数组中。如果原数组被复制的数是 `m`，则放到辅助数组第 `m` 个位置。这样很容易找出重复元素。空间复杂度为 `O(n)`。

#### 解法二
数组元素的取值范围是 `[1, n]`，对该范围对半划分，分成 `[1, middle]`, `[middle+1, n]`。计算数组中有多少个(count)元素落在 `[1, middle]` 区间内，如果 count 大于 middle-1+1，那么说明这个范围内有重复元素，否则在另一个范围内。继续对这个范围对半划分，继续统计区间内元素数量。

时间复杂度 `O(n * log n)`，空间复杂度 `O(1)`。

注意，此方法无法找出所有重复的元素。

```java
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
     * @param to 右边界
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
```

### 测试用例
1. 长度为 n 的数组中包含一个或多个重复的数字；
2. 数组中不包含重复的数字；
3. 无效测试输入用例（输入空指针）。

### 题目导航
1. [返回上一题](/solution/剑指Offer/03_01_DuplicationInArray/README.md)
2. [进入下一题](/solution/剑指Offer/04_FindInPartiallySortedMatrix/README.md)
3. [回到题目列表](../README.md)