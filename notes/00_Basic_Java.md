# Java 基础知识扫盲

## Java 程序初始化顺序
父类静态变量 -> 父类静态代码块 -> 子类静态变量 -> 子类静态代码块 -> 
父类非静态变量 -> 父类非静态代码块 -> 父类构造函数 -> 
子类非静态变量 -> 子类非静态代码块 -> 子类构造函数

```java
class Base {
    static {
        System.out.println("Base static block");
    }

    {
        System.out.println("Base block");
    }

    public Base() {
        System.out.println("Base constructor");
    }
}

public class Derived extends Base {
    static {
        System.out.println("Derived static block");
    }

    {
        System.out.println("Derived block");
    }

    public Derived() {
        System.out.println("Derived constructor");
    }

    public static void main(String[] args) {
        new Derived();
    }
}

```

程序运行结果为：
```
Base static block
Derived static block
Base block
Base constructor
Derived block
Derived constructor
```

## 为什么 Java 中有些接口没有任何方法
在 Java 中，有些接口内部没有声明任何方法，也就是说，实现这些接口的类不需要重写任何方法。这些没有任何方法声明的接口也被叫做`标识接口`。标识接口对实现它的类没有任何语义上的要求，它仅仅起了标识的作用，用来表明实现它的类属于某个特定类型。Java 类库中已存在的标识接口有 `Cloneable`, `Serializable`。



