## 正则表达式匹配

### 题目描述
请实现一个函数用来匹配包括 `'.'` 和 `'*'` 的正则表达式。

模式中的字符 `'.'` 表示任意一个字符，而 `'*'` 表示它前面的字符可以出现任意次（含 0 次）。

在本题中，匹配是指字符串的所有字符匹配整个模式。

例如，字符串 `"aaa"` 与模式 `"a.a"` 和 `"ab*ac*a"` 匹配，但是与 `"aa.a"` 和 `"ab*a"` 均不匹配。

**样例**
```
输入：

s="aa"
p="a*"

输出:true
```

### 解法
判断模式中第二个字符是否是 `*`：

- 若是，看如果模式串第一个字符与字符串第一个字符是否匹配：
    - 若不匹配，在模式串上向右移动两个字符`j+2`，相当于 a* 被忽略
    - 若匹配，字符串后移`i+1`。此时模式串可以移动两个字符`j+2`，也可以不移动`j`。
- 若不是，看当前字符与模式串的当前字符是否匹配，即 `str[i] == pattern[j] || pattern[j] == '.'`：
    - 若匹配，则字符串与模式串都向右移动一位，`i+1`，`j+1`。
    - 若不匹配，返回 false。

```java
/**
 * @author bingo
 * @since 2018/12/18
 */

class Solution {

    /**
     * 判断字符串是否与模式串匹配
     *
     * @param s 字符串
     * @param p 模式串
     * @return 是否匹配
     */
    public boolean isMatch(String s, String p) {
        if (s == null || p == null) {
            return false;
        }
        char[] str = s.toCharArray();
        char[] pattern = p.toCharArray();
        return match(str, 0, str.length, pattern, 0, pattern.length);
    }

    private boolean match(char[] str, int i, int len1, char[] pattern, int j, int len2) {
        if (i == len1 && j == len2) {
            return true;
        }

        // pattern已经走到最后，而str还有未匹配的
        // str走到最后，而pattern还没走完，此时是允许的
        if (j == len2) {
            return false;
        }

        if (j + 1 < len2 && pattern[j + 1] == '*') {
            if (i < len1 && (str[i] == pattern[j] || pattern[j] == '.')) {
                return match(str, i, len1, pattern, j + 2, len2)
                        || match(str, i + 1, len1, pattern, j, len2)
                        || match(str, i + 1, len1, pattern, j + 2, len2);
            }
            return match(str, i, len1, pattern, j + 2, len2);
        }

        if (i < len1 && (str[i] == pattern[j] || pattern[j] == '.')) {
            return match(str, i + 1, len1, pattern, j + 1, len2);
        }
        return false;

    }
}
```

### 测试用例
1. 功能测试（模式字符串里包含普通字符、`.`、`*`；模式字符串和输入字符串匹配/不匹配）；
2. 特殊输入测试（输入字符串和模式字符串是空指针、空字符串）。

### 题目导航
1. [返回上一题](/solution/剑指Offer/18_02_DeleteDuplicatedNode/README.md)
2. [进入下一题](/solution/剑指Offer/20_NumericStrings/README.md)
3. [回到题目列表](../README.md)