## [矩阵中的路径](https://www.acwing.com/problem/content/21/)

### 题目描述
请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。

路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。

如果一条路径经过了矩阵中的某一个格子，则之后不能再次进入这个格子。

**注意**：

- 输入的路径不为空；
- 所有出现的字符均为大写英文字母。

**样例**
```
matrix=
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

str="BCCE" , return "true" 

str="ASAE" , return "false"
```

### 解法
回溯法。首先，任选一个格子作为路径起点。假设格子对应的字符为 ch，并且对应路径上的第 i 个字符。若相等，到相邻格子寻找路径上的第 i+1 个字符。重复这一过程。

```java
/**
 * @author bingo
 * @since 2018/12/17
 */

class Solution {

    /**
     * 判断矩阵中是否包含某条路径
     *
     * @param matrix 矩阵
     * @param str 路径
     * @return 是否包含某条路径
     */
    public boolean hasPath(char[][] matrix, String str) {
        if (matrix ==  null || matrix.length == 0 || str == null) {
            return false;
        }

        int m = matrix.length, n = matrix[0].length;

        boolean[][] visited = new boolean[m][n];
        int pathLength = 0;
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (hasPath(matrix, str, i, j, visited, pathLength)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean hasPath(char[][] matrix, String str, int i, int j, boolean[][] visited, int pathLength) {
        if (pathLength == str.length()) {
            return true;
        }
        boolean hasPath = false;
        if (i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length
                && !visited[i][j] && matrix[i][j] == str.charAt(pathLength)) {
            ++pathLength;
            visited[i][j] = true;
            hasPath = hasPath(matrix, str, i + 1, j, visited, pathLength)
                    || hasPath(matrix, str, i - 1, j, visited, pathLength)
                    || hasPath(matrix, str, i, j + 1, visited, pathLength)
                    || hasPath(matrix, str, i, j - 1, visited, pathLength);
            if (!hasPath) {
                --pathLength;
                visited[i][j] = false;
            }
        }
        return hasPath;
    }
}
```

### 测试用例
1. 功能测试（在多行多列的矩阵中存在或者不存在路径）；
2. 边界值测试（矩阵只有一行或者一列；矩阵和路径中的所有字母都是相同的）；
3. 特殊输入测试（输入空指针）。

### 题目导航
1. [返回上一题](/solution/剑指Offer/11_MinNumberInRotatedArray/README.md)
2. [进入下一题](/solution/剑指Offer/13_RobotMove/README.md)
3. [回到题目列表](../README.md)