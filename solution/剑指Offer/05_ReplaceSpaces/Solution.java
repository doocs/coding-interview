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