## [不用加减乘除做加法](https://www.acwing.com/problem/content/81/)

### 题目描述
写一个函数，求两个整数之和，要求在函数体内不得使用＋、－、×、÷ 四则运算符号。

**样例**
```
输入：num1 = 1 , num2 = 2

输出：3
```

### 解法
先对两数进行异或，求得相加不仅位的结果。再循环对两数进行按位与运算，并左移一位，直至进位为 0。

```java
/**
 * @author bingo
 * @since 2018/12/13
 */

class Solution {

    /**
     * 不用加减乘除做加法
     *
     * @param num1 数1
     * @param num2 数2
     * @return 两数之和
     */
    public int add(int num1, int num2) {
        int sum, carry;
        while (true) {
            sum = num1 ^ num2;
            carry = (num1 & num2) << 1;
            num1 = sum;
            num2 = carry;
            if (num2 == 0) {
                break;
            }
        }
        return num1;
    }
}
```


### 测试用例
1. 输入正数、负数、0。