## [求1+2+…+n](https://www.acwing.com/problem/content/80/)

### 题目描述
求 `1+2+…+n`,要求不能使用 `乘除法、for、while、if、else、switch、case` 等关键字及条件判断语句 `A?B:C`。

**样例**
```
输入：10

输出：55
```

### 解法
利用 Stream API。

```java
import java.util.stream.IntStream;

/**
 * @author bingo
 * @since 2018/12/13
 */

class Solution {

    /**
     * 求1+2+…+n（不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C））
     *
     * @param n 1~n
     * @return 1~n的和
     */
    public int getSum(int n) {
        return IntStream.rangeClosed(1, n).sum();
    }
}
```

### 测试用例
1. 功能测试（输入 5、10）；
2. 边界值测试（输入 0 和 1）。