## [变态跳台阶](https://www.nowcoder.com/practice/22243d016f6b47f2a6928b4313c85387?tpId=13&tqId=11162&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

### 题目描述
一只青蛙一次可以跳上`1`级台阶，也可以跳上`2`级……它也可以跳上`n`级。求该青蛙跳上一个`n`级的台阶总共有多少种跳法。

### 解法
#### 解法一：数学推导
跳上 `n-1` 级台阶，可以从 `n-2` 级跳 `1` 级上去，也可以从 `n-3` 级跳 `2` 级上去...那么
```
f(n-1) = f(n-2) + f(n-3) + ... + f(0)
```

跳上 `n` 级台阶，可以从 `n-1` 级跳 `1` 级上去，也可以从 `n-2` 级跳 `2` 级上去...那么
```
f(n) = f(n-1) + f(n-2) + ... + f(0)
```

综上可得

```
f(n) - f(n-1) = f(n-1)
```

即
```
f(n) = 2f(n-1)
```

所以 f(n) 是一个等比数列：

```java
/**
 * @author bingo
 * @since 2018/12/16
 */

class Solution {

    /**
     * 青蛙跳台阶II
     *
     * @param target 跳上的那一级台阶
     * @return 多少种跳法
     */
    public int JumpFloorII(int target) {
        return (int) Math.pow(2, target - 1);
    }
}
```

#### 解法二：动态规划
每当计算 res[i]，把前面所有结果累加起来。

```java
/**
 * @author bingo
 * @since 2018/12/16
 */

class Solution {

    /**
     * 青蛙跳台阶II
     *
     * @param target 跳上的那一级台阶
     * @return 多少种跳法
     */
    public int JumpFloorII(int target) {
        if (target < 3) {
            return target;
        }
        int[] res = new int[target + 1];
        Arrays.fill(res, 1);
        for (int i = 2; i <= target; ++i) {
            for (int j = 1; j < i; ++j) {
                res[i] += res[j];
            }
        }
        return res[target];
    }
}
```

### 测试用例
1. 功能测试（如输入 3、5、10 等）；
2. 边界值测试（如输入 0、1、2）；
3. 性能测试（输入较大的数字，如 40、50、100 等）。

### 题目导航
1. [返回上一题](/solution/剑指Offer/10_02_JumpFloor/README.md)
2. [进入下一题](/solution/剑指Offer/10_04_RectCover/README.md)
3. [回到题目列表](../README.md)