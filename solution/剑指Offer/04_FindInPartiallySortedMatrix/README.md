## [二维数组中的查找](https://www.acwing.com/problem/content/16/)

### 题目描述
在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。

请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

**样例**
```
输入数组：

[
  [1,2,8,9]，
  [2,4,9,12]，
  [4,7,10,13]，
  [6,8,11,15]
]

如果输入查找数值为7，则返回true，

如果输入查找数值为5，则返回false。
```

### 解法
从二维数组的右上方开始查找：
- 若元素值等于 `target`，返回 `true`；
- 若元素值大于 `target`，砍掉这一列，即 `--j`；
- 若元素值小于 `target`，砍掉这一行，即 `++i`。

也可以从二维数组的左下方开始查找，以下代码使用左下方作为查找的起点。

注意，不能选择左上方或者右下方的数字，因为这样无法缩小查找的范围。

```java
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
```

### 测试用例
1. 二维数组中包含查找的数字（查找的数字是数组中的最大值和最小值；查找的数字介于数组中的最大值和最小值之间）；
2. 二维数组中没有查找的数字（查找的数字大于/小于数组中的最大值；查找的数字在数组的最大值和最小值之间但数组中没有这个数字）；
3. 特殊输入测试（输入空指针）。

### 题目导航
1. [返回上一题](/solution/剑指Offer/03_02_DuplicationInArrayNoEdit/README.md)
2. [进入下一题](/solution/剑指Offer/05_ReplaceSpaces/README.md)
3. [回到题目列表](../README.md)