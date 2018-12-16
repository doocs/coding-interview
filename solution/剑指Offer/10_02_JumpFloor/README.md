## [跳台阶](https://www.nowcoder.com/practice/8c82a5b80378478f9484d87d1c5f12a4?tpId=13&tqId=11161&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)

### 题目描述
一只青蛙一次可以跳上`1`级台阶，也可以跳上`2`级。求该青蛙跳上一个`n`级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

### 解法
跳上 `n` 级台阶，可以从 `n-1` 级跳 `1` 级上去，也可以从 `n-2` 级跳 `2` 级上去。所以
```
f(n) = f(n-1) + f(n-2)
```

```java
/**
 * @author bingo
 * @since 2018/12/16
 */

class Solution {

    /**
     * 青蛙跳台阶
     *
     * @param target 跳上的那一级台阶
     * @return 多少种跳法
     */
    public int JumpFloor(int target) {
        if (target < 3) {
            return target;
        }
        int a = 1, b = 2;
        for (int i = 3; i <= target; ++i) {
            b = a + b;
            a = b - a;
        }
        return b;
    }
}
```

### 测试用例
1. 功能测试（如输入 3、5、10 等）；
2. 边界值测试（如输入 0、1、2）；
3. 性能测试（输入较大的数字，如 40、50、100 等）。

### 题目导航
1. [返回上一题](/solution/剑指Offer/10_01_Fibonacci/README.md)
2. [进入下一题](/solution/剑指Offer/10_03_JumpFloorII/README.md)
3. [回到题目列表](../README.md)