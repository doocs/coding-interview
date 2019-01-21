# 《Effective Coding 阿里巴巴 Java 开发手册》

## 第一章 编程规约
### 命名风格
1. 包名统一采用**单数**形式，但是类名如果有复数含义，则类名可以使用复数形式。e.g. `com.alibaba.ai.util.MessageUtils`

### 常量定义
1. 如果一个变量值仅在一个范围内变化，则用 enum 类型来定义。

### 代码格式
1. if/for/while/switch/do 等保留字与括号之间都**必须加空格**。
1. 采用 4 个空格缩进，禁止使用 Tab 控制符。
1. 注释的双斜线与注释内容之间**有且仅有一个空格**。e.g. `// 这是示例注释`
1. 单行字符数不超过 120 个，超出则需要换行，换行遵循：
    - 第二行相对第一行**缩进 4 个空格**，从第三行开始，不再缩进。
    - 运算符与下文一起换行。
    - 方法调用的点符号与下文一起换行。
    - 方法调用的点符号与下文一起换行时，在逗号后进行。
    - 在括号前不要换行。
```java
// 正例
StringBuffer sb = new StringBuffer();
sb.append("zi").append("xin")...
    .append("huang")...
    .append("huang")...
    .append("huang");

// 反例
StringBuffer sb = new StringBuffer();
sb.append("ge").append("cheng")...append
    ("no line break here");

// 方法参数超过 120 个字符时，不要在逗号前换行
method(args1, args2, args3, ...
    , argsX);
```
5. IDE 的 text file encoding 设置为 UTF-8；IDE 文件的换行符使用 UNIX 格式，不要使用 Windows 格式。
1. **没有必要**增加若干空格来使某一行的字符与上一行对应位置的字符对齐。

### OOP 规约
1. 对外部正在调用的接口，不允许修改方法签名，以避免对接口调用方产生影响。若接口过时，必须加 `@Deprecated` 注解，并清晰地说明采用的新接口或者新服务是什么。

### 集合处理
1. **所有**相同类型的包装类对象之间值的比较，全部使用 equals 方法。
1. 构造方法里面**禁止**加入任何业务逻辑，如果有初始化逻辑，请放在 init 方法中。
1. 慎用 Object 的 clone 方法来拷贝对象。<br>**说明**：对象的 clone 方法**默认是浅拷贝**，若想实现深拷贝，需要重写 clone 方法。
1. 关于 hashCode 和 equals 的处理，遵循如下规则：
    - 只要重写 equals，就必须重写 hashCode；
    - 因为 Set 存储的是不重复对象，依据 hashCode 和 equals 进行判断，所以 Set 存储的对象必须重写这两个方法。
    - 如果自定义对象作为 Map 的键，那么必须重写这两个方法。
    - **说明**：String 重写了 hashCode 和 equals 方法，所以我们可以非常愉快地将 String 对象作为 key 来使用。
1. ArrayList 的 subList 结果不可强转成 ArrayList，否则会抛出 ClassCastException 异常。<br>**说明**：subList 是 ArrayList 的一个视图，对于 subList 子列表的所有操作最终会反映到原列表上。
1. 在 subList 场景中，高度注意对原集合元素个数的修改，会导致子列表的遍历、增加、删除均产生 `ConcurrentModificationException`。
```java
List<Integer> list = new ArrayList<>();
int count = 5;
for (int i = 0; i < count; ++i) {
    list.add(i + 1);
}

// 子列表
List<Integer> subList = list.subList(0, list.size() - 1);

// 对原集合元素个数修改
list.add(11);

// 导致子列表异常
// Exception in thread "main" java.util.ConcurrentModificationException
System.out.println(subList);
```
7. 在使用工具类 Arrays.asList() 把数组转换成集合时，不能使用其修改集合相关的方法，否则会抛出 `UnsupportedOperationException` 异常。<br>**说明**：asList 的返回对象是一个 Arrays 内部类，并没有实现集合的修改方法。体现的是适配器模式，只是转换接口，后台的数据仍是数组。
```java
String[] str = new String[] {"you", "wu"};
List list = Arrays.asList(str);

// list.add("bingo") 运行时异常

str[0] = "bingo";
// list.get(0) 也会随着修改。
```
8. 在集合初始化时，指定集合初始值大小。若 HashMap 需要放置 1024 个元素，由于没有设置初始大小（默认 16），随着元素不断增加，容量被迫扩大 7 次，resize 需要重建 hash 表，这严重影响性能。
1. 使用 entrySet 遍历 Map 类集合 K/V，而不是 keySet 方式遍历。如果时 JDK8，使用 Map.foreach() 方法。
1. **高度注意** Map 类集合 K/V 能不能存储 null 值的情况。由于 HashMap 的干扰，很多人认为 ConcurrentHashMap 是可以置入 null 值的，而事实上，存储 null 值时会抛出 NPE 异常。

| 集合类 | Key | Value | Supper | 说明 |
|---|---|---|---|---|
| Hashtable | 不允许为 null | 不允许为 null | Dictionary | 线程安全 |
| ConcurrentHashMap | **不允许**为 null | **不允许**为 null | AbstractMap | 锁分段技术 |
| TreeMap | 不允许为 null | 允许为 null | AbstractMap | 线程不安全 |
| HashMap | 允许为 null | 允许为 null | AbstractMap | 线程不安全 |

11. 利用 Set 元素唯一的特性，可以快速对一个集合进行去重操作，避免使用 List 的 contains 方法进行遍历、对比、去重操作。

### 并发处理
1. 在创建线程或线程池时，请指定有意义的线程名称，方便出错时回溯。
```java
public class TimeTaskThread extends Thread {
    public TimeTaskThread() {
        super.setName("TimeTaskThread");
        // ...
    }
}
```
2. 线程资源必须通过线程池提供，不允许在应用中自行显式创建线程。<br>**说明**：使用线程池的好处是减少在创建和销毁线程上所消耗的时间及系统资源，解决资源不足的问题。如果不使用线程池，有可能造成系统创建大流量同类线程而导致消耗完内存或者“过度切换”的问题。
1. 在对多个资源、数据库表、对象同时加锁时，需要保持一致的加锁顺序，否则**可能会造成死锁**。<br>**说明**：如果线程一需要对表 A/B/C 依次加锁后才可以进行更新操作，那么线程二的加锁顺序也必须是 A/B/C，否则可能出现死锁。
1. volatile 解决多线程内存不可见问题。对于一写多读，可以解决变量同步问题，但是如果多写，同样无法解决线程安全问题。

### 控制语句
1. 在一个 switch 快内，每个 case 要么通过 break/return 等来终止，要么注释说明程序将继续执行到哪一个 case 为止；在一个 switch 块内，**都必须**包含一个 default 语句并且放在最后，即使它什么代码都没有。
1. 在高并发场景中，**避免使用**“等于”判断作为中断或退出的条件。<br>**说明**：如果并发控制没有处理好，容易产生等值判断被击穿的情况，应使用大于或小于的区间判断条件来代替。
1. 不要在条件判断中执行其它复杂的语句，可将复杂逻辑判断的结果赋值给一个**有意义的布尔变量名**，以提高可读性。

### 注释规约
1. 特殊注释标记。TODO 实际上是一个 Javadoc 的标签，虽然目前的 Javadoc 还没有实现，但已经被广泛使用，且**只能应用于类、接口和方法上**。在注释中用 FIXME 标记某代码是错误的，而且不能工作，需要及时纠正。

### 其他
1. 注意 Math.random() 这个方法返回的是 double 类型，取值范围 x ∈ [0, 1)，如果想获得整数类型的随机数，不要将 x 放大 10 的若干倍然后取整，直接使用 Random 对象的 nextInt 或者 nextLong 方法。