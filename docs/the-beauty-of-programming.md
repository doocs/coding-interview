# 编程之美题解

## 1.2 中国象棋将帅问题

### 题目描述
中国象棋里，“将”、“帅”不能照面。现假设棋盘上只有“将” `A`和“帅” `B`二子。

A、B 二子被限制在己方 `3*3` 的格子里运动。请写处一个程序，输出 A、B 所有合法位置。要求在代码中**只能使用一个变量**。

### 解法
程序的大致框架如下：
```
遍历 A 的位置
    遍历 B 的 位置
        判断 A、B 的位置组合是否满足要求，若满足，则输出。
```

本题的难点在于如何只用一个变量来实现。

对于本题，每个子只需要 9 个数字就可以表达它的全部位置。
```
1   -   2   -   3
|       |       |
4   -   5   -   6
|       |       |
7   -   8   -   9
```

#### 解法一
一个 8 位的 byte 类型能够表达 `2^8=256` 个值，所以可以用前 4 个 bit 表示 A 的位置，用后面的 4 bit 表示 B 的位置。

```java
public class Solution {

    private final int GRIDW = 3;

    public void printAll() {
        byte b = 1;
        for (b = lSet(b, 1); lGet(b) <= GRIDW * GRIDW; b = lSet(b, lGet(b) + 1)) {
            for (b = rSet(b, 1); rGet(b) <= GRIDW * GRIDW; b = rSet(b, rGet(b) + 1)) {
                if (lGet(b) % GRIDW != rGet(b) % GRIDW) {
                    System.out.println("A=" + lGet(b) + ", B=" + rGet(b));
                }
            }
        }
    }

    public byte lSet(byte b, int x) {
        return (byte) ((b & 0xf) | (x << 4));
    }

    public byte lGet(byte b) {
        return (byte) ((b >>> 4) & 0xf);
    }

    public byte rSet(byte b, int x) {
        return (byte) ((b & 0xf0) | x);
    }

    public byte rGet(byte b) {
        return (byte) (b & 0xf);
    }
}
```

#### 解法二

```java
public class Solution {
     public void printAll() {
        byte b = 81;
        while (b > 0) {
            if (b % 9 % 3 != b / 9 % 3) {
                System.out.println("A=" + (b % 9 + 1) + ", B=" + (b / 9 + 1));
            }
            --b;
        }
    }
}
   
```

#### 解法三
这是 C 语言的实现的另一个解法。

```c
#include <stdio.h>

struct {
	unsigned char a;
	unsigned char b;
} i;

int main() {
	for (i.a = 1; i.a <= 9; i.a++) {
		for (i.b = 1; i.b <= 9; i.b++) {
			if (i.a % 3 != i.b % 3) {
				printf("A = %d, B = %d\n", i.a, i.b);
			}
		}
	}
} 
```