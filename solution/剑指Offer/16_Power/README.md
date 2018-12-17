## [数值的整数次方](https://www.acwing.com/problem/content/26/)

### 题目描述
实现函数 double Power(double base, int exponent)，求 base 的  exponent 次方。

不得使用库函数，同时不需要考虑大数问题。

**注意**：

- 不会出现底数和指数同为 0 的情况。

**样例1**
```
输入：10 ，2

输出：100
```

**样例2**
```
输入：10 ，-2  

输出：0.01
```

### 解法
注意判断值数是否小于 0。另外 0 的 0 次方没有意义，也需要考虑一下，看具体题目要求。

#### 解法一
时间复杂度 `O(N)`。

```java
/**
 * @author bingo
 * @since 2018/12/17
 */

class Solution {

    /**
     * 计算数值的整数次方
     *
     * @param base 底数
     * @param exponent 指数
     * @return 数值的整数次方
     */
    public double Power(double base, int exponent) {
        if (exponent == 0) {
            return 1;
        }
        if (exponent == 1) {
            return base;
        }

        double res = 1;
        for (int i = 0; i < Math.abs(exponent); ++i) {
            res *= base;
        }

        return exponent > 0 ? res : 1 / res;
    }
}
```

#### 解法二
![odd-even](/img/odd-even.png)

递归求解，每次 exponent 缩小一半，时间复杂度为 `O(log N)`。

```java
/**
 * @author bingo
 * @since 2018/12/17
 */

class Solution {

    /**
     * 计算数值的整数次方
     *
     * @param base 底数
     * @param exponent 指数
     * @return 数值的整数次方
     */
    public double Power(double base, int exponent) {
        if (exponent == 0) {
            return 1;
        }
        if (exponent == 1) {
            return base;
        }

        double res = Power(base, Math.abs(exponent) >> 1);
        res *= res;
        if ((exponent & 1) == 1) {
            res *= base;
        }
        return exponent > 0 ? res : 1 / res;
    }
}
```

### 测试用例
1. 把底数和指数分别设为正数、负数和零。

### 题目导航
1. [返回上一题](/solution/剑指Offer/15_NumberOf1InBinary/README.md)
2. [进入下一题](/solution/剑指Offer/17_Print1ToMaxOfNDigits/README.md)
3. [回到题目列表](../README.md)