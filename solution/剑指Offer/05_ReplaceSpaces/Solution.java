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
    public String replaceSpaces(StringBuffer str) {
        if (str == null) {
            return null;
        }
        
        int len = str.length();
        for (int i = 0; i < len; ++i) {
            if (str.charAt(i) == ' ') {
                str.append("  ");
            }
        }

        int i = len - 1, j = str.length() - 1;
        for (; i >= 0; --i) {
            char ch = str.charAt(i);
            if (ch == ' ') {
                str.setCharAt(j--, '0');
                str.setCharAt(j--, '2');
                str.setCharAt(j--, '%');
            } else {
                str.setCharAt(j--, ch);
            }
        }
        return str.toString();
    }
}