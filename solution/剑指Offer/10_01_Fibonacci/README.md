## [斐波那契数列](https://www.acwing.com/problem/content/19/)

### 题目描述
输入一个整数 n ，求斐波那契数列的第 n 项。

假定从 0 开始，第 0 项为 0。`(n<=39)`

**样例**
```
输入整数 n=5 

返回 5
```

### 解法
#### 解法一
采用递归方式，简洁明了，但效率很低，存在大量的重复计算。

```
                  f(10)
               /        \
            f(9)         f(8)
          /     \       /    \
       f(8)     f(7)  f(7)   f(6)
      /   \     /   \ 
   f(7)  f(6)  f(6) f(5)
```

```java
/**
 * @author bingo
 * @since 2018/12/16
 */

class Solution {

    /**
     * 求斐波那契数列的第n项，n从0开始
     *
     * @param n 第n项
     * @return 第n项的值
     */
    public int Fibonacci(int n) {
        if (n < 2) {
            return n;
        }
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
}
```

#### 解法二
从下往上计算，递推，时间复杂度 `O(n)`。可以用数组存储，空间复杂度 `O(n)`；也可以用变量存储，空间复杂度 `O(1)`。

```java
/**
 * @author bingo
 * @since 2018/12/16
 */

class Solution {

    /**
     * 求斐波那契数列的第n项，n从0开始
     *
     * @param n 第n项
     * @return 第n项的值
     */
    public int Fibonacci(int n) {
        if (n < 2) {
            return n;
        }

        int a = 1, b = 1;
        for (int i = 2; i < n; ++i) {
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
1. [返回上一题](/solution/剑指Offer/09_02_StackWithTwoQueues/README.md)
2. [进入下一题](/solution/剑指Offer/10_02_JumpFloor/README.md)
3. [回到题目列表](../README.md)