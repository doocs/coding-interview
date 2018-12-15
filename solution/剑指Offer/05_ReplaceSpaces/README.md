## [替换空格](https://www.acwing.com/problem/content/17/)

### 题目描述
请实现一个函数，把字符串中的每个空格替换成 `"%20"`。

你可以假定输入字符串的长度最大是 `1000`。
注意输出字符串的长度可能大于 `1000`。

**样例**
```
输入："We are happy."

输出："We%20are%20happy."
```

### 解法
#### 解法一
利用正则匹配替换。

```java
/**
 * @author bingo
 * @since 2018/12/15
 */

class Solution {

    /**
     * 将字符串中的所有空格替换为%20
     *
     * @param str 字符串
     * @return 替换后的字符串
     */
    public String replaceSpaces(String str) {
        return str == null ? null : str.replaceAll(" ", "%20");
    }
}
```

#### 解法二
先遍历原字符串，遇到空格，则在原字符串末尾 `append` 任意两个字符，如两个空格。

用指针 `i` 指向原字符串末尾，`j` 指向现字符串末尾，`i`, `j` 从后往前遍历，当 `i` 遇到空格，`j` 位置依次要赋值为 `'0','2','%'`，若不是空格，直接赋值为 `i` 指向的字符。

🤔 **思路扩展：**

在合并两个数组（包括字符串）时，如果从前往后复制每个数字（或字符）需要重复移动数字（或字符）多次，那么我们可以考虑**从后往前**复制，这样就能减少移动的次数，从而提高效率。

```java
/**
 * @author bingo
 * @since 2018/12/15
 */

class Solution {

    /**
     * 将字符串中的所有空格替换为%20
     *
     * @param str 字符串
     * @return 替换后的字符串
     */
    public String replaceSpaces(String str) {
        if (str == null) {
            return null;
        }
        StringBuilder sb = new StringBuilder(str);
        int len = str.length();
        for (int i = 0; i < len; ++i) {
            if (str.charAt(i) == ' ') {
                sb.append("  ");
            }
        }

        int i = len - 1, j = sb.length() - 1;
        for (; i >= 0; --i) {
            char ch = str.charAt(i);
            if (ch == ' ') {
                sb.setCharAt(j--, '0');
                sb.setCharAt(j--, '2');
                sb.setCharAt(j--, '%');
            } else {
                sb.setCharAt(j--, ch);
            }
        }
        return sb.toString();
    }
}
```

### 测试用例
1. 输入的字符串包含空格（空格位于字符串的最前面/最后面/中间；字符串有多个连续的空格）；
2. 输入的字符串中没有空格；
3. 特殊输入测试（字符串是一个空指针；字符串是一个空字符串；字符串只有一个空格字符；字符串中有多个连续空格）。

### 题目导航
1. [返回上一题](/solution/剑指Offer/04_FindInPartiallySortedMatrix/README.md)
2. [进入下一题](/solution/剑指Offer/06_PrintListInReversedOrder/README.md)
3. [回到题目列表](../README.md)