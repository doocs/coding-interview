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