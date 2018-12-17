/**
 * @author bingo
 * @since 2018/12/17
 */

class Solution {

    /**
     * 计算能到达的格子数
     *
     * @param threshold 限定的数字
     * @param rows      行数
     * @param cols      列数
     * @return 能到达的格子数
     */
    public int movingCount(int threshold, int rows, int cols) {
        boolean[][] visited = new boolean[rows][cols];
        return getCount(threshold, rows, cols, 0, 0, visited);
    }

    private int getCount(int threshold, int rows, int cols, int i, int j, boolean[][] visited) {
        if (check(threshold, rows, cols, i, j, visited)) {
            visited[i][j] = true;
            return 1 + getCount(threshold, rows, cols, i + 1, j, visited)
                    + getCount(threshold, rows, cols, i - 1, j, visited)
                    + getCount(threshold, rows, cols, i, j + 1, visited)
                    + getCount(threshold, rows, cols, i, j - 1, visited);
        }
        return 0;
    }

    private boolean check(int threshold, int rows, int cols, int i, int j, boolean[][] visited) {
        return i >= 0 && i < rows && j >= 0 && j < cols && !visited[i][j]
                && (getDigitSum(i) + getDigitSum(j) <= threshold);
    }

    private int getDigitSum(int val) {
        int sum = 0;
        while (val > 0) {
            sum += (val % 10);
            val /= 10;
        }
        return sum;
    }
}