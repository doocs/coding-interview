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