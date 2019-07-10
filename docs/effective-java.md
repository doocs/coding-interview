# 《Effective Java》

## 第二章 创建和销毁对象

### 第 1 条：考虑用静态工厂方法代替构造器
静态工厂方法相比构造器，优势有以下几个：

1. 静态工厂方法有名称，能更确切地描述正被返回的对象，更易于阅读。构造器方法名称都是固定的，只能通过改变参数列表来构造不同对象。
1. 不必在每次调用时都创建一个对象，可以先将对象缓存起来，需要时直接返回，避免创建不必要的重复对象。比较时可以直接用 `==` 操作符。
1. 可以返回原返回类型的任何子类对象，更加灵活。适用于基于接口的框架。
1. 在创建参数化实例时，代码更加简洁。

不需要接连两次提供类型参数：

```java
Map<String, List<String>> m = new HashMap<String, List<String>>();
```

只需要提供一个静态工厂方法：

```java
public static <K, V> Hash<K, V> newInstance() {
    return new HashMap<K, V>;
}

Map<String, List<String>> m = HashMap.newInstance();
```

但是，静态工厂方法也有一些缺点：

1. 类如果只包含私有构造器，那么就不能被子例化（继承）。但这样也许也会因祸得福，因为它鼓励使用复合，而不是继承；
1. 静态工厂方法与其它静态方法没什么区别，无法像构造器一样在 API 文档中明确标识出来。但是，静态工厂方法有一些惯用名称，如 `valueOf`, `of`, `getInstance`, `newInstance`......

### 第 2 条：遇到多个构造器参数时要考虑用构建器
考虑用一个类表示包含食品外面显示的营养成分标签。这些标签有几个域是必需的，还有超过 20 个可选域。大多数产品在某几个可选域中都会有非零的值。

对于这样的类，应该用哪种构造器或者静态方法来编写呢？

1. 重叠构造器模式

第一种方式是**重复构造器模式**。先提供一个只有必要参数的构造器，再提供一个有一个可选参数的构造器，接着是两个可选参数的构造器，依次类推，最后一个构造器包含所有可选参数。

```java
public class NutritionFacts {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;
    private final int carbohydrate;

    public NutritionFacts(int servingSize, int servings) {
        this(servingSize, servings, 0);
    }

    public NutritionFacts(int servingSize, int servings, int calories) {
        this(servingSize, servings, calories, 0);
    }

    public NutritionFacts(int servingSize, int servings, int calories, int fat) {
        this(servingSize, servings, calories, fat, 0);
    }

    public NutritionFacts(int servingSize, int servings, int calories, int fat, int sodium) {
        this(servingSize, servings, calories, fat, sodium, 0);
    }

    public NutritionFacts(int servingSize, int servings, int calories, int fat, int sodium, int carbohydrate) {
        this.servingSize = servingSize;
        this.servings = servings;
        this.calories = calories;
        this.fat = fat;
        this.sodium = sodium;
        this.carbohydrate = carbohydrate;
    }
}
```

想要创建实例的时候，就利用参数列表最短的构造器，但该列表中包含了要设置的所有参数：

```java
NutritionFacts cocaCola = new NutritionFacts(240, 8, 100, 0, 35, 27);
```

这个构造器通常需要许多你本不想设置的参数，但还是不得不为它们传递值。随着参数数目的增多，很快就会失去了控制。客户端代码也会很难编写，可读性也不好。


2. JavaBean 模式

第二种模式是 **JavaBean** 模式，在这种模式下，创建一个无参构造器来创建对象，然后调用 setter 方法设置每个必要的参数。这种模式，弥补了重叠构造器模式的不足，代码读起来也很容易，很多读者应该都很熟悉了。

```java
NutritionFacts cocaCola = new NutritionFacts();
cocaCola.setServingSize(200);
cocaCola.setServings(8);
cocaCola.setCalories(100);
cocaCola.setSodium(35);
cocaCola.setCarbohydrate(27);
```

遗憾的是，JavaBean 模式自身有很严重的缺点。因为构造过程被分到了几个调用中，在构造过程中 JavaBean 可能处于不一致的状态。若试图使用处于不一致状态的对象，将会导致失败，调试起来也十分困难。程序员需要付出额外的努力来确保它的线程安全。

3. Builder 模式

有第三种替代方法，既能保证像重叠构造器模式那样的安全性，也能保证像 JavaBean 模式一样，有很好的可读性，就是 **Builder** 模式。

```java
public class NutritionFacts {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;
    private final int carbohydrate;

    public static class Builder {
        // Required params
        private final int servingSize;
        private final int servings;

        // Optional params
        private int calories = 0;
        private int fat = 0;
        private int sodium = 0;
        private int carbohydrate = 0;

        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings = servings;
        }

        public Builder calories(int val) {
            this.calories = val;
            return this;
        }
        public Builder fat(int val) {
            this.fat = val;
            return this;
        }
        public Builder sodium(int val) {
            this.sodium = val;
            return this;
        }
        public Builder carbohydrate(int val) {
            this.carbohydrate = val;
            return this;
        }
        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }

    // 私有构造器
    private NutritionFacts(Builder builder) {
        servingSize = builder.servingSize;
        servings = builder.servings;
        calories = builder.calories;
        fat = builder.fat;
        sodium = builder.sodium;
        carbohydrate = builder.carbohydrate;
    }
}
```

客户端代码就很容易编写了，更为重要的是，易于阅读。

```java
NutritionFacts cocaCola = new NutritionFacts.Builder(240, 8)
    .calories(100)
    .sodium(35)
    .carbohydrate(27)
    .build();
```

Builder 模式也有它自身的不足。为了创建对象，必须先创建它的构建器。虽然创建构建器的开销在实践种可能不那么明显，但是在某些十分注重性能的情况下，可能就成了问题了。Builder 模式还比重叠构造器模式更加冗长，因此它只在有很多参数的时候才使用，比如 4 个或者更多个参数。

简而言之，如果类的构造器或者静态工厂中具有多个参数，设计这种类时，Builder 模式就是种不错的选择，特别是当大多数参数都是可选的时候。它较传统的重叠构造器模式相比，更易于阅读；而较 JavaBean 模式，更加安全。

### 第 3 条：用私有构造器或者枚举类型强化 Singleton 属性
1. 公有静态成员

```java
public class Singleton {
    public static final Singleton INSTANCE = new Singleton();
    private Singleton() {}
}
```

2. 静态工厂方法

```java
public class Singleton {
    private static final Singleton INSTANCE = new Singleton();
    private Singleton() {}

    public static Singleton getInstance() {
        return INSTANCE;
    }
}
```

这两种方法都能保证 Singleton 的全局唯一性。但是，享有特权的客户端可以借助 `AccessibleObject.setAccessible` 方法，通过反射机制调用私有构造器。如果需要抵御这种攻击，可以修改构造器，让它在被要求创建第二个实例的时候抛出异常。

为了使利用这其中一种方法实现的 Singleton 类变成可序列化的，仅仅在声明中加上 `implements Serializable` 是不够的。为了维护并保证 Singleton，必须声明所有实例域都是瞬时(transient)的，并提供一个 `readResolve` 方法。否则，每次反序列化一个序列化的实例时，都会创建一个新的实例。

```java
priavte Object readResolve() {
    return INSTANCE;
}
```

3. 单元素枚举

Java 1.5 版本开始，实现 Singleton 有了第三种方法。只需编写一个包含单个元素的枚举类型：

```java
public enum Singleton {
    INSTANCE;

    public void otherMethods() {...}
}
```

这种方法更加简洁，无偿提供了序列化机制，绝对防止多次实例化，是实现 Singleton 的最佳方式。

### 第 4 条：通过私有构造器强化不可实例化的能力
我们在项目开发过程中，有时候肯定会遇到一些工具类，我们不希望它们被实例化，因为它们的方法可能都被 `static` 来修饰，所以实例对它们没有任何的意义；然而我们在编码的过程中，可能往往对一些工具类的编写都没有注意，没有去写构造方法，这时候，在缺少显式的构造器的情况下，编译器会提供一个共有的、无参的缺省构造器（`default constructor`）。对于用户而言，这个构造器和其它的构造器没有任何区别。所以在一些已发行的 API 里面我们经常会看到一些被无意识实例化的类。

**企图通过讲类做成抽象类来强制该类不可被实例化，这是行不通的。** 因为抽象类可以被子类化，子类也可以被实例化。同时定义为抽象类，还会误导用户，以为这种类是专门为了继承而设计的。那怎样才可以确保类不被实例化呢，因为只有当类不包含显示的构造器时，编译器才会生成缺省的构造器，所以我们只要给这个类构建私有的构造器，它就不会被实例化了：

```java
// Noninstantiable utility class
public class UtilityClass {
    // Suppress default constructor for noninstantiability
    private UtilityClass() {
        throw new AssertionError();
    }

    ... // Remainder omitted
}
```

如上，由于显示的构造器是私有的，则不会在类的外部被实例化。 AssertionError 不是必须的，但是这样写，可以避免在类的内部调用构造器。它保证该类在任何情况下都不会被实例化。

**注意** 这种用法也有副作用，它使得一个类不能被子类化。因为所有的构造器都必须显式或隐式地调用超类（superclass）构造器，在上面这种情况下，子类就没有可访问的超类构造器去调用了。

### 第 5 条：避免创建不必要的对象
一般来说，最好不要在每次需要的时候都创建一个功能相同的新对象而是重用对象。重用方式既快速，又流行。如果对象是不可变的（immutable），它就始终可以被重用。
下面举一个极端的反面例子，考虑下面的语句：

```java

String s = new String("stringette");  // Don't do this!

```

上面的语句每次被执行的时候都会创建一个新的 String 实例，但是这些创建对象的动作全都是不必要的。传递给 String 构造器的参数（"stringette"）本身就是一个 String 实例，功能方面等同于构造器创建的所有对象。想一想 ，如果该用法在一个循环中，或者是在一个被频繁调用的方法中，就会创建出成千上万个不必要的 String 实例。

改进后的版本如下所示：

```java

String s = "stringette";

```

上面版本只用了一个 String 实例，而不是每次执行的时候都创建一个新的 String 实例。并且，它还可以保证，对于所有在同一台虚拟机中运行的代码，只要它们包含相同的字符串字面常量，该对象就会被重用[JLS，3.10.5]。

对于同时提供了静态工厂方法（见第 1 条）和构造器的不可变类，通常应该使用静态工厂方法而不是构造器，这样可以避免创建不必要的对象。构造器在每次被调用的时候都会创建一个新的对象，而静态工厂方法重来不要求这样做，实际上也不会这么做。

除了重用不可变对象之外，也可以重用那些已知不会被修改的可变对象。下面通过我们熟悉的可变 Date 对象来实现一个比较微妙、也比较具体的反面例子，由于 Date 对象一旦计算出来之后就不再改变。

```java

public class Person {

    private final Date birthDate;

    public Person(Date birthDate) {
        this.birthDate = birthDate;
    }

    // Other fields, methods, and constructor omitted
    // Don't do this!
    public boolean isBabyBoomer() {
        // Unnecessary allocation of expensive object
        Calendar gmtCal = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
        gmtCal.set(1946, Calendar.JANUARY, 1, 0, 0, 0);
        Date boomStart = gmtCal.getTime();
        gmtCal.set(1965, Calendar.JANUARY, 1, 0, 0, 0);
        Date boomEnd = gmtCal.getTime();

        return birthDate.compareTo(boomStart) >= 0 &&
                birthDate.compareTo(boomEnd) < 0;
    }

}

```

上面的类建立了一个模型：其中有一个人，并有一个 isBabyBoomer 方法，用来检验这个人是否为一个 “baby boomber（生育高峰期出生的小孩）” ，相当于就是检测这个人是否出生于 1946 年至 1964 年之间。

通过上述代码可以发现，isBabyBoomer 方法每次都调用的时候，都会创建一个新的  Calendar、一个 TimeZone 和两个 Date 实例，这其实是不必要的。下面我们通过一个改进的版本，用一个静态的初始化器（`initializer`），避免了这种效率低下的情况：

```java

public class Person {
    private final Date birthDate;

    public Person(Date birthDate) {
        this.birthDate = birthDate;
    }
    // Other fields, methods, and constructor omitted

    // The starting and ending dates of the baby boom
    private static final Date BOOM_START;
    private static final Date BOOM_END;

    static {
        Calendar gmtCal = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
        gmtCal.set(1946, Calendar.JANUARY, 1, 0, 0, 0);
        BOOM_START = gmtCal.getTime();
        gmtCal.set(1965, Calendar.JANUARY, 1, 0, 0, 0);
        BOOM_END = gmtCal.getTime();
    }

    public boolean isBabyBoomer() {
        return birthDate.compareTo(BOOM_START) >= 0 &&
                birthDate.compareTo(BOOM_END) < 0;
    }
}

```

改进后的 Person 类只在初始化的时候创建 Calendar、 TimeZone 和 Date 实例一次，而不是在每次调用 isBabyBoomer 的时候都会创建这些实例。如果 isBabyBoomer 方法被频繁地调用，改进后的方法将会显著的提高性能。就比如我们要检查 1000 万人是否出生在 1946 年和 1964 年之间，经过测试，原来的版本需要 32000ms，而改进后的只需要 130ms，大约快了 250 倍。但是这种优化带来的效果不总是那么明显，因为 Calendar 实例的创建代价特别昂贵。但是改进后的版本在数据量大的情况下就会有明显的性能提升，并且代码更加的清晰，因为 BOOM_START 和 BOOM_END 很明显应该被作为常量来对待。

在本条目前面的例子中，所讨论到的对象显然都是能够被重用的，因为它们被初始化后就不会再改变。其它有些情形则并不总是那么明显了。考虑适配器（`adapter`）的情形，有时也叫做视图（`view`）。适配器是指这样一个对象：它把功能委托给一个后备对象（`backing object`），从而为后备对象提供一个可以替代的接口。由于适配器除了后备对象之外，没有其它的状态信息，所以针对某个给定对象的特定适配器而言，它不需要创建多个适配器实例。

例如，Map 接口的 keySet 方法返回该 Map 对象的 Set 视图，其中包含该 Map 中所有的键（`key`）。表面看起来，好像每次调用 keySet 都应该创建一个新的 Set 实例，但是，对于一个给定的 Map 对象，实际上每次调用 keySet 方法都会返回同样的 Set 实例。虽然被返回的 Set 实例一般是可改变的，但是所有返回的对象在功能上是等同的：当其中一个返回对象发生变化的时候，所有其它的返回对象也要发生变化，因为它们是有同一个 Map 实例支撑的。虽然创建 keySet 视图对象的多个实例并无害处，却也是没有必要的。

在 Java 1.5 发行版本中，有一种创建多余对象的新方法，称为自动装箱（`autoboxing`），它允许程序员将基本类型和装箱基本类型（`Boxed Primitive Type`）混用，按需要自动装箱和拆箱。自动装箱使得基本类型和装箱基本类型的差别变得很模糊，但是并没有完全消除。它们在语义上有着微妙的差别，在性能上也有着比较明显的差别（见第 49 条）。考虑下面的程序，它计算所有 int 正值的总和。为此，程序必须使用 long 类型，因为 int 不够大，无法容纳所有 int 正值的总和：

```java

// Hideously slow program! Can you spot the object creation?
public static void mian(String[] args) {
    Long sum = 0L;
    for (long i = 0; i < Integer.MAX_VALUE; i++) {
        sum += i;
    }
    System.out.println(sum);
}

```

这段程序程序算出的答案是正确的，但是比实际情况要更慢一些，只因为打错一个字符。变量 sum 被声明成 Long 而不是 long，意味着程序构造了大约 2^31 个多余的 Long 实例（大约每次往 Long sum 中增加 long 时构造一个实例）。将 sum 的声明从 Long 改成 long，运行时间从 43 秒减少到 6.8 秒。结论很明显：**要优先使用基本类型而不是装箱基本类型，要当心无意识的自动装箱。**

当然，我们也不要错误地认为本条目所介绍的内容暗示着“创建对象的代价非常昂贵，我们应该尽可能地避免创建对象”。相反，由于小对象的构造器只做很少量的显式工作，所以，小对象的创建和回收动作是非常廉价的，特别是在现代的 JVM 实际上更是如此。通过创建附加的对象，提升程序的清晰性、简洁性和功能性，这通常是件好事。

反之，通过维护自己的对象池（`object pool`）来避免创建对象并不是一种好的做法，除非池中的对象是非常重量级的。真正正确使用对象池的典型对象示例就是数据库连接池。建立数据库连接的代价是非常昂贵的，因此重用这些对象是非常有意义。而且，数据库的许可可能限制你只能使用一定数量的连接。但是，一般而言，维护自己的对象池必定会把代码弄得很乱，同时增加内存占用（`footprint`），并且还会损害性能。所以我们要慎用对象池。

与本条目对应的是第 39 条中有关的“保护性拷贝（`defensive copying`）”的内容。本条目提及“当你应该重用现有对象的时候，请不要创建新的对象”，而第 39 条则说“当你应该创建新的对象的时候，请不要重用现有的对象”。注意，在提倡使用保护性拷贝的时候，是因为重用对象而付出的代价要远远大于因创建对象而付出的代价。必要时如果没能实施保护性拷贝，会导致潜在的错误和安全漏洞；而不必要的创建对象则只会影响程序的风格和性能。

**总结来说，就是应该按情况具体分析，该创建对象还是重用对象；通过分析，我们应该知道没有保护的重用对象，需要特别注意，不然可能会导致错误和安全漏洞。**

### 第 6 条：消除过期的对象引用
当你从手工管理内存的语言（比如 C 或 C++）转换到具有垃圾回收功能的语言（比如 Java 或 Go）的时候，程序员的工作会变得更加的容易，因为当你用完了对象之后，它们会被自动回收。当你由 C 或 C++ 语言转换到 Java 编程语言第一次经历对象回收功能的时候，会觉得有点不可思议。这很容易给你留下不需要自己考虑内存管理的印象，其实不然。

考虑下面这个简单的栈实现的例子：

```java

// Can you spot the "memory leak"
public class Stack {
    private Object[] elements;
    private int size = 0;
    private static final int DEFAULT_INITIAL_CAPACITY = 16;

    public Stack() {
        elements = new Object[DEFAULT_INITIAL_CAPACITY];
    }

    public void push(Object e) {
        ensureCapacity();
        elements[size++] = e;
    }

    public Object pop() {
        if (size == 0) 
            throw new EmptyStackException();
        return elements[--size];
    }

    /**
     * Ensure space for at least one more element, roughly
     * doubling the capacity each time the array needs to grow.
     */
    private void ensureCapacity() {
        if (elements.length == size) {
            elements = Arrays.copyOf(elements, 2 * size + 1);
        }
    }

}
 
```

这段程序（它的泛型版本请见第 26 条）中并没有很明显的错误。但是这个程序中隐藏着一个问题。不严格地讲，这段程序有一个“内存泄漏”，随着垃圾回收器活动的增加，或者由于内存占用的不断增加，程序性能的降低会逐渐表现出来。在极端的情况下，这种内存泄漏会导致磁盘交换（`Disk Paging`），甚至导致程序失败（`OutOfMemoryError`错误），但是这种失败情形相对比较少见。

那么，程序中在哪里发生了泄漏呢？如果一个栈先是增长，然后再收缩，那么，从栈中弹出来的对象将不会被当作垃圾回收，即使使用栈的程序不再引用这些对象，它们也不会被回收。这是因为，栈内部维护着对这些对象的过期引用（`Obsolete refence`）。所谓的过期引用，是指永远也不会再被解除的引用。在本例中，凡是在 elements 数组的“活动部分（`active portion`）”之外的任何引用都是过期的。活动部分是指 elements 中小标小于 size 的那些元素。

在支持垃圾回收的语言中，内存泄漏是非常隐蔽的（称这类内存泄漏为“无意识的对象保持（`unintentional object retention`）“更为恰当）。如果一个对象引用被无意识的保留起来了，那么，垃圾回收机制不仅不会处理这个对象，而且也不会处理被这个对象所引用的所有其它对象。即使只有少量的几个对象被无意识的保留下来，也会有许许多多的对象排除在垃圾回收机制之外，从而对性能造成潜在的重大影响。

这类问题的修复方法很简单：一旦对象引用已经过期，只要清空这些引用即可。对于上述的 Stack 类而言，只要一个单元被弹出栈，指向它的引用就已经过期了。pop 方法的改进版如下：

```java

public Object pop() {
    if (size == 0) 
        throw new EmptyStackException();
        elements[size] = null; // Eliminate obsolete reference
    return elements[--size];
}

```

清空过期引用的另一个好处是，如果它们以后又被错误的解除引用，程序就会立即抛出 NullPointerException 异常，而不是悄悄地错误运行下去。尽快的检测出程序中的错误往往是有益的。

当程序员第一次被类似这样的问题困扰的时候，他们往往会过分小心：对于每一个对象引用，一旦程序不再用到它，就把它清空。其实这样做即没必要，也不是我们所期望的，因为这样做会把我们的程序弄的很乱。**清空对象引用应该是一种例外，而不是一种规范行为**  。消除过期引用最好的方法是让包含该引用的变量结束其生命周期。如果你是在最紧凑（最小）的作用域范围定义每一个变量（见第 45 条），这种情形就会自然而然的发生。

那么，何时应该清空引用呢？Stack 类的哪方面特性使它易于遭受内存泄漏的影响呢？简而言之，问题在于，Stack 类自己管理内存（`manage its own memory`）。存储池（`storage pool`）包含了 elements 数组（对象应用单元，而不是对象本身）的元素。数组活动区域（同前面的定义）中的元素是已分配的（`allocated`），而数组其余部分的元素则是自由的（`free`）。但是垃圾回收器并不知道这一点；对于垃圾回收器而言，elements 数组中所有的对象引用都同等有效。只有程序员知道数组的非活动部分是不重要的。程序员可以把这个情况告知垃圾回收器，做法很简单：一旦数组元素变成了非活动部分的一部分，程序员就手工清空这些数组元素。

一般而言，**只要类是自己管理内存，程序员就应该警惕内存泄漏问题**。一旦元素被释放掉，则该元素中包含的任何对象引用都应该被清空。

**内存泄漏的另一个常见来源是缓存**。一旦你把对象引用放到缓存中，它就很容易被遗忘掉，从而使用它不再有用很长一段时间内仍然留在缓存中。对于这个问题，有几种可能的解决方案。如果你正好要实现这样的缓存：只要在缓存之外存在对某个项的键的引用，该项就有意义，那就可以用 WeakHashMap 代表缓存；当缓存中的项过期之后，它们就会自动被删除。记住只有当所要的缓存项的生命周期是由该键的外部引用而不是由键的值决定时候，WeakHashMap 才有用处。

更为常见的情形则是，“缓存项的生命周期是否有意义”并不是很容易确定，随着时间的推移，其中的项的价值变得越来越没有价值。在这种情况下，缓存应该时不时的清空掉无用的项。清除工作可以由一个后台线程（可能是 Timer 或者 ScheduledThreadPoolExecutor）来完成，或者也可以给缓存添加新数据的时候顺便进行清理。LinkedHashMap 利用其 removeEldestEntry 方法可以很容易地实现后一种方案。对于更加复杂的缓存，必须直接使用 java.lang.ref。

**内存泄漏的第三个常见来源是监听器和其它回调**。如果你实现了一个 API，客户端在这个 API 中注册回调，却没有显示地取消注册，那么除非你采取某些动作，否则它们就会聚集。确保回调立即被当作垃圾回收的最佳方法是只保存它们的软引用（`weak reference`），例如，只将它们保存成 WeakHashMap 中的键。

由于内存泄漏通常不会表现成明显的失败，所以它们可以在一个系统中存在很多年。往往只有通过代码检查，或者借助于 Heap 剖析工具（`Heap Profiler`）才可以发现内存泄漏问题。所以，如果我们能在内存泄漏发生之前就知道如何预测和分析此类问题，并预防和阻止它们发生，那是最好不过了。

### 第 7 条：避免使用终结方法
**终结方法（`finalizer`）通常是不可预测的，也是很危险的，一般情况下是不必要的**。使用终结方法会有很多缺点：会导致行为不稳定、降低性能，以及可移植性问题。当然，终结方法也有其可用之处，该条目后面会进行介绍；但是根据经验，还是应该避免使用终结方法。

C++ 程序员被告知“不要把终结方法当作是 C++ 中析构器（`destructors`）的对应物”。在 C++ 中，析构器是回收一个对象所占用资源的常规方法，是构造器所必须的对应物。在 Java 中，当一个对象变得不可到达时，垃圾回收器会回收与该对象相关联的存储空间，并不需要程序员做专门的工作。C++ 中的析构器也可以被用来回收其他的内存资源。而在 Java 中，一般用 try-finally 块来完成类似的工作。

终结方法的缺点在于不能保证会被及时地执行[JLS，12.6]。从一个对象变得不可到达开始，到它的终结方法被执行，所花费的这段时间是任意长的。这意味着，注重时间（`time-critical`）的任务是不应该由终结方法来完成。例如，用终结方法来关闭已经打开的文件，这是严重错误，因为打开文件的描述符是一种有限的资源。由于 JVM 会延时执行终结方法，所以大量的文件会保留在打开状态，当一个程序再不能打开文件的时候，它可能会运行失败。

及时地执行终结方法正是垃圾回收算法的一个主要功能，这种算法在不同的 JVM 实现中会大相径庭。如果程序依赖于终结方法被执行的时间点，那么这个程序在不同的 JVM 运行的表现可能会截然不同。一个程序可能在你测试的 JVM 平台上运行的非常好，但是在你最重要顾客的 JVM 平台上却根本无法运行，这是完成可能的。

延迟终结过程并不只是一个理论问题。在很少见的情况下，为类提供终结方法，可能会随意地延迟其实例的回收过程。一位同事最近在调试一个长期运行的 GUI 应用程序的时候，该应用程序莫名其妙地出现 OutOfMemoryError 错误而死掉。分析表明，该应用程序死掉的时候，其终结方法队列中有数千个图像对象正在被等待终结和回收。遗憾的是，终结方法线程的优先级比该程序的其它线程的要低很多，所以，图形对象的终结速度达不到进入队列的速度。Java 语言规范并不保证哪个线程将会执行终结方法，所以，除了不使用终结方法以外，并没有很轻便的办法能够避免这样的问题。

Java 语言规范不仅不保证终结方法会被及时地执行，而且根本就不保证它们会被执行。当一个程序终止的时候，某些已经无法访问的对象上的终结方法却根本没有被执行，这是完全有可能的。结论是：**不应该依赖终结方法来更新重要的持久状态**。例如，依赖终结方法来解释共享资源（比如数据库）上的永久锁，很容易让整个分布式系统垮掉。

不要被 System.gc 和 System.runFinalization 这两个方法所诱惑，它们确实增加了终结方法被执行的机会，但是它们并不保证终结方法一定会被执行。唯一声称保证终结方法被执行的方法是 System.runFinalizersOnExit，以及它臭名昭著的孪生兄弟 RunTime.runFinalizersOnExit。这两个方法都有致命的缺陷，已经被废弃了[ThreadStop]。

当你并不确定是否应该避免使用终结方法的时候，这里还有一种值得考虑的情形：如果未被捕获的异常在终结方法中被抛出来，那么这种异常可以被忽略，并且该对象的终结过程也会终止[JLS，12.6]。未被捕获的异常会使对象处于破坏的状态（a corrupt state），如果另一个线程企图使用这种被破坏的对象，则可能发生任何不确定的行为。在正常情况下，未被捕获的异常会使线程终止，并打印出栈轨迹（`Stack Trace`），但是，如果发生在终结方法之中，则不会如此，甚至连警告都不会打印出来。

还有一点：**使用终结方法有一个非常严重的（`Severe`）性能损失**。在我的机器上，创建和销毁一个简单对象的时间大约是 5.6ns，增加一个终结方法使时间增加到了 2400ns。换句话说，用终结方法创建或销毁对象大约慢了 430 倍。

那么，如果类中封装的资源（例如文件或者线程）确实需要终止，应该怎么做才能不编写终结方法呢？只需**提供一个显示的终止方法**，并要求该类的客户端在每个实例不再有用的时候调用这个方法。值得提及的一个细节是，该实例必须记录下自己是否已经被终结了：显示的终止方法必须在一个私有域中记录下“该对象已经不再有效”。如果这些方法是在对象已经被终止之后调用，其它的方法就必须检查这个域，并抛出 IllegalStateException 异常。

显示终止方法的典型例子是 InputStream、OutputStream 和 java.sql.Connection 上的 close 方法。另一个例子是 java.utils.Timer 上的 cancel 方法，它执行必要的状态改变，使得与 Timer 实例相关联的该线程温和地终止自己。java.awt 中的例子还包括 Graphics.dispose 和 Window.dispose。这些方法通常由于性能不好而不被人们关注。一个相关的方法是 Image.flush，它会释放所有与 Image 实例相关的资源，但是该实例仍然处于可用的状态，如果有必要的话，会重新分配资源。

**显示的终止方法通常与 try-finally 结构联合起来使用，以确保及时终止**。在 finally 子句内部调用显示的终止方法，可以确保即使在使用对象的时候有异常抛出，该终止方法也会执行：

```java

// try-finally block guarantees execution of termination method
Foo foo = new Foo(...);
try {
    // Do what must be done with foo
    ...
} finally {
    foo.terminate(); // Explicitt termination method
}

```

那么终结方法有什么好处呢？它们有两种合法用途。第一种用途是，当对象的所有者忘记调用前面段落建议的显示终止方法时，终结方法可以充当“安全网（`safety net`）”。虽然这样做并不是保证终结方法会被及时的调用，但是在客户端无法通过调用显式的终止方法来正常结束操作的情况下（希望这种情况尽可能少地发生），迟一点释放关键资源总比永远不释放要好。但是如果终结方法发现资源还未被终止，则应该在日志中记录一条警告，因为这表示客户端代码中的一个 Bug，应该得到修复。如果你正考虑编写这样的安全网终结方法，就要认真考虑清楚，这种额外的保护是否值得你付出这份额外的代价。

显示终止方法模式的示例中所示的四个类（`FileInputStream`、`FileOutputStream`、`Timer` 和 `Connection`），都具有终结方法，当它们的终止方法未能被调用的情况下，这些终止方法充当了安全网。

终结方法的第二种合理用途与对象的本地对等体（`native peer`）有关。本地对等体是一个本地对象（`native object`），普通方法通过本地方法（`native method`）委托给一个本地对象。因为本地对等体不是一个普通对象，所以垃圾回收器不会知道它，当它的 Java 对等体回收的时候，它不会被回收。在本地对等体并不拥有关键资源的前提下，终结方法正是执行这项任务最合适的工具。如果本地对等体拥有被及时终止的资源，那么该类就应该拥有一个显式的终止方法，如前所述。终止方法应该完成完成所有必要的工作以便释放关键的资源。终止方法可以是本地方法，或则它也可以调用本地方法。

值得注意的最重要的一点是，“终结方法链（`finalizer chaining`）”并不会被自动执行。如果类（不是 Object）有终结方法，并且子类覆盖了终结方法，子类的终结方法就必须手工调用超类的终结方法。你应该在一个 try 块中终结子类，并在相应的 finally 块中调用超类的终结方法。这样做可以保证：即使子类的终结过程抛出异常，超类的终结方法也会得到执行。反之亦然。代码示例如下。注意这个示例使用了 Override 注解（`@Override`），这是 Java 1.5 发行版本将它增加到 Java 平台中的。你现在可以不管 Override 注解，或者到第 36 条查阅一下它们是什么意思：

```java

// Manual finalizer chaining
@Override
protected void finalize() throws Throwable {
    try {
        // Finalize subclass state
    } finally {
        super.finalize();
    }
}

```

如果子类实现者覆盖了超类的终结方法，但是忘了手工调用超类的终结方法（或者有意选择不调用超类的终结方法），那么超类的终结方法将会永远也不会被调用到。要防范这样粗心大意或者恶意的子类是有可能的，代价就是为每个被终结的对象创建了一个附加的对象。不是把终结方法放在要求终结处理的类中，而是把终结方法在一个匿名的类（见第 22 条）中，该匿名类的唯一用途就是终结它的外围实例（`enclosing instance`）。该匿名类的单个实例被称为**终结方法守卫者（`finalizer guardian`）**，外围类的每个实例都会创建这样一个守卫者。外围实例在它的私有实例域中保存这一个对其终结方法守卫者的唯一引用，因此终结方法守卫者与外围实例可以同时启动终结过程。当守卫者被终结的时候，它执行外围实例所期望的终结行为，就好像它的终结方法是外围对象上的一个方法一样：

```java

// Finalizer Guardian idiom
public class Foo {
    // Sole purpose of this object is to finalize outer Foo object 
    private  final object finalizerGuardian = new Object() {
        @Override
        protect void finalize() throws Throwable {
            ... // Finalize outer Foo object 
        }
    };

    ... // Remainder omitted
}

```

注意，共有类 Foo 并没有终结方法（除了它从 Object 中继承了一个无关紧要的之外），所以子类的终结方法是否调用 super.finalize() 并不重要。对于每一个带有终结方法的非 final 共有类，都应该考虑使用这种方法。

总之，除非是作为安全网，或者是为了终止非关键的本地资源，否则请不要使用终结方法。在很少见的情况下，既然使用了终结方法，就要记住调用 super.finalize。如果用终结方法作为安全网，要记得记录终结方法的非法用法。最后，如果需要把终结方法与共有的非  final 类关联起来，请考虑使用终结方法守卫者，以确保即使子类的终结方法未能调用 super.finalize，该终结方法也会被执行。

## 第三章 对于所有对象都通用的方法

### 第 8 条：覆盖 equals 时请遵守通用约定
覆盖 equals 方法看起来很简单，但是有很多覆盖方式会导致错误，并且后果非常严重。最容易避免这类问题的方法就是不覆盖 equals 方法，在这种情况下，类的每个实例都只能与它自身相等。如果满足了一下任何一个条件，这就正是所期望的结果：

- **类的每个实例本质上都是唯一的**。对于代表活动实体而不是值（`value`）的类来说确实如此，例如 Thread。Object 提供的 equals 实现对这些类来说正是正确的行为。

- **不关心类是否提供了“逻辑相等（`logical equality`）”的测试功能**。例如，java.util.Random 覆盖了 equals，以检查两个 Random 实例产生相同的随机数序列，但是设计者并不认为客户需要或者期望这样的功能。在这样的情况下，从 Object 继承得到的 equals 实现已经足够了。

- **超类已经覆盖了 equals,从超类继承过来的行为对于子类也是合适的**。例如，大多数 Set 实现都从 AbstractSet 继承 equals 实现，List 实现从 AbstractList 继承 equals 实现，Map 实现从 AbstractMap 继承实现。

-  **类是私有的或是包级私有的，可以确定它的 equals 方法永远不会被调用**。在这种情况下，无疑是应该覆盖 equals 方法的，以防它被意外调用：

```java

@Override
public boolean equals(Object o) {
    throw new AssertionError(); // Method is never called
}

```

那么什么时候应该覆盖 Object.equals 呢？如果类具有自己特有的“逻辑相等”概念（不同于对象等同的概念），而且超类还没有覆盖 equals 以实现期望的行为，这是我们就需要覆盖 equals 方法。