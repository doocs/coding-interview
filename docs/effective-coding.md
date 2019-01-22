# 《Effective Coding——阿里巴巴 Java 开发手册》

## 第一章 编程规约
### 命名风格
1. 包名统一采用**单数**形式，但是类名如果有复数含义，则类名可以使用复数形式。e.g. `com.alibaba.ai.util.MessageUtils`

### 常量定义
1. 如果一个变量值仅在一个范围内变化，则用 enum 类型来定义。

### 代码格式
1. `if/for/while/switch/do` 等保留字与括号之间都**必须加空格**。
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
1. ArrayList 的 subList 结果不可强转成 ArrayList，否则会抛出 `ClassCastException` 异常。<br>**说明**：subList 是 ArrayList 的一个视图，对于 subList 子列表的所有操作最终会反映到原列表上。
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
1. 在一个 switch 块内，每个 case 要么通过 break/return 等来终止，要么注释说明程序将继续执行到哪一个 case 为止；在一个 switch 块内，**都必须**包含一个 default 语句并且放在最后，即使它什么代码都没有。
1. 在高并发场景中，**避免使用**“等于”判断作为中断或退出的条件。<br>**说明**：如果并发控制没有处理好，容易产生等值判断被击穿的情况，应使用大于或小于的区间判断条件来代替。
1. 不要在条件判断中执行其它复杂的语句，可将复杂逻辑判断的结果赋值给一个**有意义的布尔变量名**，以提高可读性。

### 注释规约
1. 特殊注释标记。TODO 实际上是一个 Javadoc 的标签，虽然目前的 Javadoc 还没有实现，但已经被广泛使用，且**只能应用于类、接口和方法上**。在注释中用 FIXME 标记某代码是错误的，而且不能工作，需要及时纠正。

### 其他
1. 注意 Math.random() 这个方法返回的是 double 类型，取值范围 x ∈ [0, 1)，如果想获得整数类型的随机数，不要将 x 放大 10 的若干倍然后取整，直接使用 Random 对象的 nextInt 或者 nextLong 方法。

## 第二章 异常日志
### 异常处理
1. catch 时请分清稳定代码和不稳定代码。稳定代码指的是无论如何都不会出错的代码。对于非稳定代码的 catch，尽可能在进行异常类型的区分后，再做对应的异常处理。
1. 不要在 finally 块中使用 return。<br>**说明**：当 finally 块中的 return 返回后方法结束执行，不会再执行 try 块中的 return 语句。
1. 定义时区分 unchecked/checked 异常，避免直接抛出 new RuntimeException()，更不允许抛出 Exception 或者 Throwable，应使用有业务含义的自定义异常。推荐业界已定义过的自定义异常，如 DAOException/ServiceException 等。

### 日志规约
1. 应用中不可直接使用日志系统（Log4j、Logback）中的 API，而应依赖使用日志框架 SLF4J 中的 API。使用门面模式的日志框架，有利于维护和各个类的日志处理方式统一。

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

private static final Logger logger = LoggerFactory.getLogger(Abc.class);
```

2. 谨慎地记录日志。生产环境禁止输出 debug 日志；有选择地输出 info 日志；如果使用 warn 记录刚上线时的业务行为信息，一定要注意日志输出量的问题，避免把服务器磁盘撑爆，并及时删除这些观察日志。

## 第三章 单元测试
1. 单元测试是可重复执行的，不能受到外界环境的影响。
1. 和数据库相关的单元测试，可以设定自动回滚机制，不给数据库造成脏数据。
1. 单元测试作为一种质量保障手段，不建议项目发布后补充单元测试用例，建议在项目提测前完成单元测试。

## 第四章 安全规约
1. 针对发帖、评论、发送即时消息等用户生成内容的场景，必须实现防刷、文本内容违禁词过滤等风控策略。

## 第五章 MySQL 数据库
### 建表规约
1. 表达是与否概念的字段，必须使用 is_xxx 的方式命名，数据类型为 `unsigned tinyint`。<br> **说明**：任何字段如果为非负数，则必须是 unsigned。
1. 字段允许适当冗余，以提高查询性能，但必须考虑数据一致。e.g. 商品类目名称使用频率高，字段长度短，名称基本一成不变，可在相关联的表中冗余存储类目名称，**避免关联查询**。冗余字段遵循：
    - 不是频繁修改的字段；
    - 不是 varchar 超长字段，更不能是 text 字段。

### 索引规约
1. 在 varchar 字段上建立索引时，必须指定索引长度，没必要对全字段建立索引，根据实际文本区分度决定索引长度即可。
1. 页面搜索严禁左模糊或者全模糊，如果需要请通过搜索引擎来解决。<br> **说明**：索引文件具有 B-Tree 的**最左前缀匹配特性**，如果左边的值未确定，那么无法使用此索引。
1. 如果有 order by 的场景，请注意利用索引的有序性。order by 最后的字段是组合索引的一部分，并且放在索引组合顺序的最后，避免出现 file_sort 的情况，影响查询性能。
    - **正例**：where a=? and b=? order by c; 索引: a_b_c。
    - **反例**：索引中有范围查找，那么索引有序性无法利用，如 WHERE a>10  ORDER BY b; 索引 a_b 无法排序。
1. 利用延迟关联或者子查询优化超多分页场景。<br>**说明**：MySQL 并不是跳过 offset 行，而是取 offset+N 行，然后返回放弃前 offset 的行，返回 N 行。当 offset 特别大的时候，效率会非常的低下，要么控制返回的总页数，要么对超过阈值的页数进行 SQL 改写。
1. 建组合索引的时候，区分度最高的在最左边。
1. SQL 性能优化的目标，至少要达到 range 级别，要求是 ref 级别，最好是 consts。

### SQL 语句
1. 不要使用 count(列名) 或 count(常量) 来替代 count(\*)，count(\*) 是 SQL92 定义的标准统计行数的语句，跟数据库无关，跟 NULL 和非 NULL 无关。<br>**说明**：count(\*) 会统计值为 NULL 的行，而 count(列名) 不会统计此列为 NULL 值的行。
1. `count(distinct column)` 计算该列除 NULL 外的不重复行数。注意，`count(distinct column1,column2)` 如果其中一列全为 NULL，那么即使另一列用不同的值，也返回为 0。
1. 当某一列的值全为 NULL 时，`count(column)` 的返回结果为 0，但 `sum(column)` 的返回结果为 NULL，因此使用 sum() 时需注意 NPE 问题。<br> 可以使用如下方式来避免 sum 的 NPE 问题。

```sql
SELECT IF(ISNULL(SUM(g), 0, SUM(g))) FROM table;
```

4. 使用 `ISNULL()` 来判断是否为 NULL 值。<br>**说明**：NULL 与任何值的直接比较都为 NULL。
1. 不得使用外键与级联，一切外键概念必须在应用层解决。<br>**说明**：以学生和成绩的关系为例，学生表的 student_id 是主键，成绩表的 student_id 则为外键。如果更新学生表中的 student_id，同时触发成绩表中的 student_id 更新，即为**级联更新**。外键与级联更新适用于单机低并发，不适合分布式、高并发集群；级联更新是强阻塞，存在数据库更新风暴的风险；外键影响数据库的插入速度。
1. **禁止使用存储过程**。存储过程难以调试和扩展，更没有移植性。
1. `in` 操作能避免则避免。若实在避免不了，需要仔细评估 in 后面的集合元素数量，控制在 1000 个之内。

### ORM 映射
1. POJO 类的布尔属性不能加 is，而数据库字段必须加 is_，要求在 resultMap 中进行字段与属性的映射。
1. `sql.xml` 配置参数使用：`#{}, #param#`，不要使用 ${}，此种方式容易出现 SQL 注入。
1. `@Transactional` 事务不要滥用。事务会影响数据库的 QPS。另外，使用事务的地方需要考虑各方面的回滚方案，包括缓存回滚、搜索引擎回滚、消息补偿、统计修正等。

## 第六章 工程结构
### 应用分层
1. 在 DAO 层，产生的异常类型有很多，无法用细粒度的异常进行 catch，因此使用 `catch(Exception e)` 方式，并 throw new `DAOException(e)`，不需要打印日志，因为日志在 Manager/Service 层，一定需要捕获并写到日志文件中去。如果同台服务器再写日志，会浪费性能和存储。

### 二方库依赖
1. 定义 GAV 遵从以下规则：
    - GroupID 格式：com.{公司/BU}.业务线.\[子业务线\]，最多 4 级。e.g. `com.taobao.jstorm`
    - ArtifactID 格式：产品线名-模块名。语义不重复不遗漏。e.g. `dubbo-client、fastjson-api、jstorm-tool`
    - Version 格式：主版本号.次版本号.修订号。
1. 线上应用不要依赖 SNAPSHOT 版本。<br>**说明**：不依赖 SNAPSHOT 版本是保证应用发布的幂等性。另外，也可以加快编译时的打包构建。

### 服务器
1. 高并发服务器建议调小 TCP 协议的 time_wait 超时时间。<br>**说明**：操作系统默认 240s 后才会关闭 time_wait 状态的连接。在高并发访问下，服务器端会因为处于 time_wait 的连接数过多，而无法建立新的连接，所以需要在服务器上调小此等待值。
1. 给 JVM 设置 `-XX:+HeapDumpOnOutOfMemoryError` 参数，让 JVM 碰到 OOM 场景时输出 dump 信息。<br>**说明**：OOM 的发生是有概率的，甚至有规律地相隔数月才出现一例，出现时的现场信息对查错非常有价值。
1. 在线上生产环境，JVM 的 Xms 和 Xms 设置一样大小的内存容量，避免在 GC 后调整堆大小带来的压力。

## 第七章 设计规约
1. 谨慎使用继承的方式进行扩展，优先使用**聚合或组合**的方式来实现。<br>**说明**：若一定要继承，则必须符合里氏代换原则。此原则要求在父类能够出现的地方子类一定能够出现。
1. 在系统设计时，根据依赖倒置原则，尽量依赖抽象类与接口，有利于扩展与维护。
1. 注意对扩展开放，对修改闭合。