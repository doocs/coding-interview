import{_ as i,c as t,o as a,ai as p}from"./chunks/framework.TS84ywiI.js";const n="/assets/island-eye-color.C7C5TkMx.jpg",e="/assets/water-cup.BVnbJYGg.jpg",E=JSON.parse('{"title":"《枕边算法书》","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm-stories.md","filePath":"algorithm-stories.md"}'),h={name:"algorithm-stories.md"};function l(d,s,k,r,o,g){return a(),t("div",null,s[0]||(s[0]=[p('<h1 id="《枕边算法书》" tabindex="-1">《枕边算法书》 <a class="header-anchor" href="#《枕边算法书》" aria-label="Permalink to &quot;《枕边算法书》&quot;">​</a></h1><blockquote><p>这里仅挑一些有意思的故事或知识点做个记录。</p></blockquote><ul><li><a href="#红色眼睛与褐色眼睛谜题">“红色眼睛与褐色眼睛”谜题</a></li><li><a href="#找出剩下的一个数">找出剩下的一个数</a></li><li><a href="#说出2199年7月2日是星期几">说出 2199 年 7 月 2 日是星期几</a></li><li><a href="#梅森素数">梅森素数</a></li><li><a href="#杯中的水是否超过一半">杯中的水是否超过一半</a></li></ul><h2 id="红色眼睛与褐色眼睛-谜题" tabindex="-1">“红色眼睛与褐色眼睛”谜题 <a class="header-anchor" href="#红色眼睛与褐色眼睛-谜题" aria-label="Permalink to &quot;“红色眼睛与褐色眼睛”谜题&quot;">​</a></h2><p>从前，有个小岛上只住着和尚。有些和尚的眼睛是红色的，而另一些则是褐色的。红色眼睛的和尚受到诅咒，如果得知自己的眼睛是红色的，那么当晚 12 点必须自行了断，无一例外。</p><p>和尚间有一条不成文的规定，就是彼此不能提起对方眼睛的颜色。小岛上没有一面镜子，也没有任何可以反射自己容貌的物体。因此，没有任何一个和尚能够得知自己眼睛的颜色。出于这些原因，每个和尚都过着幸福的日子。</p><p>有一天，岛上突然来了一位游客，她完全处于状况外。于是，她对和尚们说：“你们当中至少有一位的眼睛是红色的”。</p><p><img src="'+n+`" alt="island-eye-color"></p><p>这名无心的游客当天就离开了小岛，而和尚们却因第一次听到有关眼睛颜色的话题而惴惴不安。当晚，小岛上开始出现了可怕的事情......</p><p>究竟是什么事呢？</p><p>这道题不简单却非常有意思，而一旦知道答案，又会觉得并不太难。这并非是那种荒谬的问题，要想解开需要一些逻辑推理，所以不要试图一下子解开。先花 2 分钟时间独立思考一下吧。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if ((思考时间 &gt; 2 分钟) || (已经知道答案了吗)) {</span></span>
<span class="line"><span>    跳转至下一段</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>    返回上一段，并至少思考 2 分钟</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>下面开始查看正确答案。</p><p>游客说，“至少有一个人”的眼睛是红色的。假如这岛上<strong>没有任何一个和尚的眼睛是红色的</strong>，那么这会导致最糟糕的结果。你想一想，对于和尚们来说，除了自己以外，看到的其它和尚的眼睛都是褐色的。因此，每个和尚都会认为自己的眼睛是红色的，可想而知，所有和尚当晚都会自杀。</p><p>如果<strong>只有一名和尚的眼睛是红色的</strong>，会出现什么结果呢？很简单，这名和尚知道其它和尚眼睛都是褐色的，那么就会判断出自己眼睛的颜色，进而选择自杀。游客的无心之言就这样夺走了一条生命。</p><p>考虑稍微复杂点的情况。假如<strong>有两个红眼和尚</strong>，那么他们各自都知道有一个红眼和尚，都以为说的是对方。这两个和尚心想：“那个红眼的家伙今晚就要自杀喽。”当晚，各自都安心入睡了。第二天，这两个和尚相互碰面，并看到对方没有自杀时，心理备受打击。他们都会意识到，红眼和尚有两个而非一个，而另一个正是自己。除此之外的任何情况都不可能让对方在第一个晚上不自杀而安然入睡。因此，受到极大打击的这两个红眼和尚在第二天晚上<strong>都会悲惨死去</strong>。</p><p>再考虑更复杂的情况。如果有 3 个红眼和尚，又会是怎样呢？平时，这 3 位会看到两个红眼和尚，所以听到游客的话后，都不会选择自杀。第一晚过后，他们又会想，另外两个和尚在第二天晚上都会自杀（就是前面探讨的“有两个红眼和尚”的情形）。到了第三天早上，看到本以为会自杀的另两个和尚并没有自杀时，根本没想到自己也是红眼和尚的这 3 人会同时受到极大的打击。因为，两个红眼和尚第二天晚上也没有自杀，这表明还有一个红眼和尚，而这第三个红眼和尚正是自己。</p><p>这种逻辑会反复循环。因此，该题的答案是“若小岛上共有 n 个红眼和尚，那么第 n 个晚上这些和尚会同时自杀”。例如，小岛上共有 5 个红眼和尚，那么第 5 个晚上，这 5 个红眼和尚会同时自杀。</p><p>这道题其实可以利用递归的方法。假设红眼和尚人数 N 为 10，那么我们可以适用 N 为 9 的逻辑。同理，N 为 8 或 7 时，都适用 <code>N-1</code> 时的逻辑。将 <code>N=1</code>，即 “只有一个红眼和尚” 视为终止条件，即可得出最终结果。这种过程与计算机算法中函数的递归调用过程完全相同。</p><h2 id="找出剩下的一个数" tabindex="-1">找出剩下的一个数 <a class="header-anchor" href="#找出剩下的一个数" aria-label="Permalink to &quot;找出剩下的一个数&quot;">​</a></h2><p>有一个能保存 99 个数值的数组 <code>item[0], item[1],...item[98]</code>。从拥有 <code>1~100</code> 元素的集合 {1,2,3,...,100} 中，随机抽取 99 个元素保存到数组。集合中共有 100 个元素，而数组只能保存 99 个数值，所以集合中会剩下一个元素。编写程序，找出最后剩下的数。</p><p>还是先花 2 分钟想一想吧。</p><p>好了，这个问题其实非常简单，但没能正确理解题意的读者可能认为很难。答案如下代码所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> res </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 5050</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 99</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">i) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    res </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> item[i];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;最后剩下的数是：&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> res);</span></span></code></pre></div><p>如果将集合的 100 个数值累加，会得到 5050。依次从 5050 减去数组中的 99 个数值，最后的数就是没能保存到数组的那个剩余数值。也许很多读者想到了与此相近的算法。即使没有得到正确答案也不用失望，因为真正应该感到失望的人是那些没能找到答案后轻易选择放弃、想要直接查看正确答案的人。</p><h2 id="说出-2199-年-7-月-2-日是星期几" tabindex="-1">说出 2199 年 7 月 2 日是星期几 <a class="header-anchor" href="#说出-2199-年-7-月-2-日是星期几" aria-label="Permalink to &quot;说出 2199 年 7 月 2 日是星期几&quot;">​</a></h2><p>先公布答案吧，2199 年 7 月 2 日是星期二。其实可以靠运气蒙一下，准确率是 1/7。要想真正求出正确答案，过程并不简单。也许有些读者会自己设计精妙算法求出正确答案，但我还是想通过约翰•康威教授的“末日”算法进行说明。</p><p>末日算法虽然不是“游戏”，但在聚会中能够引起初次见面的异性的好奇。因此，为不少“花花公子”踏入数学殿堂做出了很大贡献。例如，“美丽的女士，请告诉我您的生日，让我猜猜是星期几。” “请您随便说一个年份，我会猜出当年的情人节是星期几”。虽然听起来比较肉麻，不过这样就能一下子吸引对方的注意。</p><p>康威教授的末日算法执行环境就是我们今天使用的“<strong>公历</strong>”环境。</p><p>首先，先理清楚<strong>什么是闰年</strong>。闰年是年份能被 4 整除但不能被 100 整除，或者能被 400 整除的年份。闰年 2 月有 29 天，而平年 2 月是 28 天。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 判断是否是闰年</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">boolean</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isLeapYear</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> year) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (year </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 4</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> year </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 100</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> !=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (year </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 400</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>康威末日算法的运行原理非常简单。为了判断不同日期的星期，算法中首先<strong>设立一个必要的“基准”</strong>。然后，<strong>根据星期以 7 为循环的原则和对闰年的考虑</strong>，计算日期对应的星期。</p><p>平年时，将 2.28 日设置为“末日”；到了闰年，将 2.29 日设置为“末日”。只要知道了特殊年份(e.g. 1900 年) “末日”的星期，那么根据康威算法即可判断其它日期的星期。</p><p>我们都知道，星期以 7 为循环，所以与“末日”以 7 的倍数为间隔的日期就和“末日”具有相同的星期。利用这个原理，先记住每个月中总是与“末日”星期相同的一个日期，即可快速算出结果。</p><p>每个月与“末日”具有相同星期的一天分别是：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>4.4、6.6、8.8、10.10、12.12、9.5、5.9、7.11、11.7、3.7</span></span></code></pre></div><p>只需要记住 4、6、8、10、12 这几个月与日的数字相同，然后是 9.5、5.9、7.11、11.7，这几个是对称的，还有一个是 3.7。是不是很容易记住？</p><p>好了，那么我们<strong>只要知道当年的“末日”是星期几，就可以推算出当年的任何一天是星期几了</strong>。</p><p>举个例子吧。2003 年的“末日”是星期五，我们推算一下那一年的圣诞节的星期。由于 2003 年“末日”是星期五，所以 12 月 12 日也是星期五（我们上面记住了每个月与“末日”具有相同星期的一天），那么 <code>12+7*2=26</code>，12 月 26 日也是星期五，所以 12 月 25 日是星期四。</p><p>那么问题来了，<strong>怎么才能知道某一年的“末日”是星期几呢</strong>？</p><p>这种情况下，需要记住“末日”的星期每跨 1 年就会加 1，若遇到闰年就会加 2。</p><p>例如，1900 年的“末日”是星期三，那么 1901 年的“末日”是星期四(+1)，1902 年的“末日”是星期五(+1)，1903 年的“末日”是星期六(+1)，而 1904 年(闰年)的“末日”是“星期一”(+2)。</p><p>就是说，我们记住了 1900 年“末日”是星期三，就可以推算出其它年份的“末日”是星期几了。</p><p>这样一个个推算还是很麻烦，可能一不小心就推错了。为此，康威教授贴心地给我们提供了如下形式的列表。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>6, 11.5, 17, 23, 28, 34, 39.5, 45, 51, 56, 62, 67.5, 73, 79, 84, 90, 95.5</span></span></code></pre></div><p>就是说，1900 年“末日”是星期三，那么 1906，1917，1923... “末日”也是星期三， 11.5 表示 1911 年的“末日”是星期二(-1)，而 1912 年的“末日”是星期四(+1)。记住这个列表，我们就能够算出所有 20 世纪年份的“末日基准”了。</p><p>如果一个美丽的姑娘说“我的生日是 1992.9.13” 时，我们可以马上说出当天的星期。既然康威列表有 90 这个数字，表示 1990 年的“末日”也是星期三，那么 1901 年(平年)“末日”是星期四(+1)，1902 年(闰年)“末日”是星期六(+2)，所以 9.5/9.12 也是星期六，1992.9.13 就是星期日。</p><p>不过，<strong>年份跨越世纪时，康威列表就会失去作用</strong>。</p><p>题目中问的是 2199.7.2 的星期，如果不能得知 2199 年“末日”是星期几，那么这道题很难求解。对于不同世纪的年份，没有什么特别的方法能够猜出“末日”的星期。只能将被 100 整除的年份表示为日历形式时，从中得到一些规律而已。</p><table tabindex="0"><thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead><tbody><tr><td>1599</td><td></td><td>1600</td><td>1601</td><td>1602</td><td></td><td></td></tr><tr><td>1700</td><td>1701</td><td>1702</td><td>1703</td><td></td><td>1704</td><td>1705</td></tr><tr><td></td><td>1796</td><td>1797</td><td>1798</td><td>1799</td><td>1800</td><td>1801</td></tr><tr><td>1897</td><td>1898</td><td>1899</td><td>1900</td><td>1901</td><td>1902</td><td>1903</td></tr><tr><td>1999</td><td></td><td></td><td>2000</td><td>2001</td><td>2002</td><td>2003</td></tr><tr><td>2100</td><td>2101</td><td>2102</td><td>2103</td><td></td><td>2104</td><td>2105</td></tr><tr><td></td><td>2196</td><td>2197</td><td>2198</td><td>2199</td><td>2200</td><td>2201</td></tr></tbody></table><p>这道题看似简单，但其实不仅需要了解“末日”算法，还需要深入了解上述模式。上面的日历中，2199 年的“末日”是星期四，所以 2199.7.11/2199.7.4 也是星期四，所以 2199.7.2 是星期二。</p><p>感受到康威教授末日算法的精妙之处了吧。</p><h2 id="梅森素数" tabindex="-1">梅森素数 <a class="header-anchor" href="#梅森素数" aria-label="Permalink to &quot;梅森素数&quot;">​</a></h2><p>马林•梅森是法国哲学家、修道士。16 世纪，数论领域存在着一个错误的假设，而一直被认为是事实。根据这个假设，对所有素数 p，2<sup>p</sup>-1 也是素数。将素数 2，5，7 带入，结果均为负数。</p><p>从直观角度看，对素数 p，总有 2<sup>p</sup>-1 也是素数的假设成立。不过，仅仅通过几个结果就想判断命题真伪，这在数学中是最“无知”的行为。这种代入几个变量进行的测试往往以程序能够正常运行的“晴天”作为前提条件，如果遇到“雨天”，这种只经过松散测试的程序会发生很多意想不到的问题。算法的内部逻辑应该紧凑，不给 Bug 任何可乘之机。</p><p>后来，人们最终证明，p 为素数时，2<sup>p</sup>-1 的结果不一定是素数。虽然如此，有些人还是好奇，p 是什么样的素数时，2<sup>p</sup>-1 结果将为素数。为了解答这种好奇，梅森在 1644 年发表的论文里提出了如下主张：</p><blockquote><p>“若 p 为 2、3、5、7、13、17、19、31、67、127、257 之一，那么 2<sup>p</sup>-1 的结果是素数。”</p></blockquote><p>梅森一直希望将存在的所有素数都表示为 2<sup>p</sup>-1 这种短小而精简的公式形式。若真能找到那样一个公式，将是美丽得让人窒息的、绝妙的数学发现。不过，梅森的梦想没能实现。</p><p>随着时间的流逝，后世数学家们通过计算得出，应当删除梅森假设中的 67 和 257，而可以添加 61、89、107。就这样，从前简洁而“有理”的命题 “若 p 是素数，则 2<sup>p</sup>-1 也是素数” 已消失不见，而留下的 “p 为某值时，结果为素数，否则不是素数”等杂乱的 if-else 语句正让算法变得越来越杂乱不堪。</p><p>实际编程中，如果越来越复杂的 <code>if-else</code> 语句影响程序简洁性，那么到了某一时刻，程序员就会考虑“重构”，对于算法也是一样。后来，人们将精简的新算法献给一生都在祈祷和学习的修道士梅森：</p><blockquote><p>“如果 p 为素数时 2<sup>p</sup>-1 也是素数，那么此素数为梅森素数。”</p></blockquote><h2 id="杯中的水是否超过一半" tabindex="-1">杯中的水是否超过一半 <a class="header-anchor" href="#杯中的水是否超过一半" aria-label="Permalink to &quot;杯中的水是否超过一半&quot;">​</a></h2><p>空房间中有个圆柱形水杯，杯口和杯底直径相同，里面有半杯左右的水。找出方法，判断杯中水超过一半还是不到一半。空荡荡的房间中没有任何可使用的器具或工具。</p><p>答案本身非常简单，不过能够真正求解的人却寥寥无几。想问题的时候，请不要考虑房间或水的温度，以及化学反应等“不讲理”的方法。另外，不允许喝杯子里的水。</p><p><img src="`+e+'" alt="water-cup"></p><p>即使读完题没能马上想起答案，但看到插图后能够立刻明白，也可以说很有编程的感觉。将杯子倾斜，使水面刚好到达杯口时，查看杯底的水就能得出答案了。</p><p>算法的编写与之大体相同。各位因为找不到突破口而郁闷时，甚至会怀疑给出的问题究竟有没有解。然而找到突破口后，再回首会发现，原来解决之道竟如此简单。</p>',67)]))}const u=i(h,[["render",l]]);export{E as __pageData,u as default};
