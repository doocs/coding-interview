## 打印从 1 到最大的 n 位数
这一题各个 OJ 平台上都没有。

### 题目描述
输入数字 `n`，按顺序打印出从 `1` 最大的 `n` 位十进制数。比如输入 `3`，则打印出 `1、2、3` 一直到最大的 3 位数即 999。

### 解法
此题需要注意 n 位数构成的数字可能超出最大的 int 或者 long long 能表示的范围。因此，采用字符数组来存储数字。

#### 解法一

- 对字符数组表示的数进行递增操作；
- 输出数字（0开头的需要把0去除）。

```java
/**
 * @author bingo
 * @since 2018/12/18
 */

class Solution {

    /**
     * 打印从1到最大的n位数
     * 
     * @param n n位数
     */
    public void print1ToMaxOfNDigits(int n) {
        if (n < 1) {
            return;
        }
        char[] chars = new char[n];
        Arrays.fill(chars, '0');
        while (increment(chars)) {
            printNumber(chars);
        }
    }


    /**
     * 打印字符数组表示的数字（需要省略前n个0）
     * 
     * @param chars 字符数组
     */
    private void printNumber(char[] chars) {
        int i = 0, n = chars.length;
        for (; i < n; ++i) {
            if (chars[i] != '0') {
                break;
            }
        }
        StringBuilder sb = new StringBuilder();
        for (; i < n; ++i) {
            sb.append(chars[i]);
        }
        System.out.println(sb.toString());
    }

    private boolean increment(char[] chars) {
        int n = chars.length;
        int carry = 1;
        for (int i = n - 1; i >= 0; --i) {
            int sum = chars[i] - '0' + carry;
            if (sum > 9) {
                if (i == 0) {
                    return false;
                }
                chars[i] = '0';
            } else {
                ++chars[i];
                break;
            }
        }
        return true;
    }
}
```

#### 解法二

利用递归全排列，设置每一位，设置完之后，打印出来。

```java
/**
 * @author bingo
 * @since 2018/12/18
 */

class Solution {

    /**
     * 打印从1到最大的n位数
     *
     * @param n n位数
     */
    public void print1ToMaxOfNDigits(int n) {
        if (n < 1) {
            return;
        }
        char[] chars = new char[n];
        print1ToMaxOfNDigits(chars, n, 0);
    }

    private void print1ToMaxOfNDigits(char[] chars, int n, int i) {
        if (i == n) {
            printNumber(chars);
            return;
        }

        // 每一位分别设置从0到9
        for (int j = 0; j < 10; ++j) {
            chars[i] = (char) (j + '0');
            print1ToMaxOfNDigits(chars, n, i + 1);
        }
    }


    /**
     * 打印字符数组表示的数字（需要省略前n个0）
     *
     * @param chars 字符数组
     */
    private void printNumber(char[] chars) {
        int i = 0, n = chars.length;
        for (; i < n; ++i) {
            if (chars[i] != '0') {
                break;
            }
        }
        StringBuilder sb = new StringBuilder();
        for (; i < n; ++i) {
            sb.append(chars[i]);
        }
        System.out.println(sb.toString());
    }
}
```

### 测试用例
1. 功能测试（输入 1、2、3......）；
2. 特殊输入测试（输入 -1、0）。

### 题目导航
1. [返回上一题](/solution/剑指Offer/16_Power/README.md)
2. [进入下一题](/solution/剑指Offer/18_01_DeleteNodeInList/README.md)
3. [回到题目列表](../README.md)