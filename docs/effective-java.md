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