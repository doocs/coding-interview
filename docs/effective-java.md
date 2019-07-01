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
