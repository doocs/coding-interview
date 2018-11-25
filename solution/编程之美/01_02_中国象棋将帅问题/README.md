## 中国象棋将帅问题

### 题目描述


### 解法

#### 解法一

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