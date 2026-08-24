import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "coding-interview",
  description: "互联网公司 IT 技术面试题集",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '题解', link: '/coding-interview' },
      { text: '编程之美', link: '/the-beauty-of-programming' },
      { text: '代码整洁之道', link: '/clean-code' },
      { text: '阿里巴巴 Java 开发手册', link: '/effective-coding' },
      { text: '枕边算法书', link: '/algorithm-stories' },
      { text: 'Effective Java', link: '/effective-java' }
    ],
    search: {
      provider: 'local'
    },
    logo: '/favicon-32x32.png',
    footer: {
      message: 'Released under the CC-BY-SA-4.0 license.',
      copyright: `版权所有 © 2018-${new Date().getFullYear()} <a href="https://github.com/doocs">Doocs</a>`
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    editLink: {
      pattern: 'https://github.com/doocs/coding-interview/edit/main/docs/:path',
      text: '在 GitHub 编辑'
    },
    sidebar: [
      {
        text: '📚 题解',
        items: [
          { text: '剑指 Offer', link: '/coding-interview' },
          { text: '编程之美', link: '/the-beauty-of-programming' }
        ]
      },
      {
        text: '📝 代码整洁',
        items: [
          { text: '代码整洁之道', link: '/clean-code' },
          { text: '阿里巴巴 Java 开发手册', link: '/effective-coding' }
        ]
      },
      {
        text: '📖 其他书籍',
        items: [
          { text: '枕边算法书', link: '/algorithm-stories' },
          { text: 'Effective Java', link: '/effective-java' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/doocs/coding-interview' }
    ]
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }],
  ],
  cleanUrls: true,
  sitemap: {
    hostname: 'https://interview.doocs.org'
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
    },
  },
})
