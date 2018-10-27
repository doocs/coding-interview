/**
 * @author bingo
 * @since 2018/10/27
 */

public class Solution {
    /**
     * 将字符串中的所有空格替换为%20
     * 
     * @param str 字符串
     * @return 替换后的字符串
     */
    public String replaceSpace(StringBuffer str) {
        if (str == null || str.length() == 0) {
            return str.toString();
        }
        StringBuilder sb = new StringBuilder();
        int len = str.length();
        for (int i = 0; i < len; ++i) {
            char ch = str.charAt(i);
            sb.append(ch == ' ' ? "%20" : ch);
        }

        return sb.toString();
    }
}