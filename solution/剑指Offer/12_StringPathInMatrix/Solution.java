/**
 * @author bingo
 * @since 2018/12/17
 */

class Solution {

    /**
     * 判断矩阵中是否包含某条路径
     *
     * @param matrix 矩阵
     * @param str    路径
     * @return 是否包含某条路径
     */
    public boolean hasPath(char[][] matrix, String str) {
        if (matrix == null || matrix.length == 0 || str == null) {
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
        if (i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length && !visited[i][j]
                && matrix[i][j] == str.charAt(pathLength)) {
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