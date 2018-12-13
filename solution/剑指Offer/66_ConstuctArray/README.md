## [构建乘积数组](https://www.acwing.com/problem/content/82/)

### 题目描述
给定一个数组 `A[0, 1, …, n-1]`，请构建一个数组 `B[0, 1, …, n-1]`，其中 `B` 中的元素 `B[i]=A[0]×A[1]×… ×A[i-1]×A[i+1]×…×A[n-1]`。

不能使用除法。

**样例**
```
输入：[1, 2, 3, 4, 5]

输出：[120, 60, 40, 30, 24]
```

**思考题：**

- 能不能只使用常数空间？（除了输出的数组之外）

### 解法
把 B 的每个元素 `B[i]` 看成两半的乘积，即 `A[0]xA[1]x...xA[i-1]` 和 `A[i+1]xA[i+2]xA[n-1]`。

- 对于左半部分：B[i] = B[i - 1] * A[i - 1]


```java
/**
 * @author bingo
 * @since 2018/12/13
 */

class Solution {
    
    /**
     * 构建乘积数组
     * 
     * @param A 数组A
     * @return 乘积数组B
     */
    public int[] multiply(int[] A) {
        if (A == null || A.length < 1) {
            return A;
        }
        int n = A.length;
        int[] B = new int[n];
        B[0] = 1;
        for (int i = 1; i < n; ++i) {
            B[i] = B[i - 1] * A[i - 1];
        }

        int t = 1;
        for (int i = n - 2; i >= 0; --i) {
            t *= A[i + 1];
            B[i] *= t;
        }

        return B;

    }
}
```


### 测试用例
1. 功能测试（输入数组包含正数、负数、一个 0、多个 0）；
2. 边界值测试（输入数组长度为 0）。