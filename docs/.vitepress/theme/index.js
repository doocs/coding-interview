import DefaultTheme from "vitepress/theme";
import giscusTalk from "vitepress-plugin-comment-with-giscus";
import { useData, useRoute } from "vitepress";
import { toRefs } from "vue";
import Layout from "./Layout.vue";

export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
  },
  setup() {
    const { frontmatter } = toRefs(useData());
    const route = useRoute();

    giscusTalk(
      {
        repo: "doocs/coding-interview",
        repoId: "MDEwOlJlcG9zaXRvcnkxNTQ5MTMxODI=",
        mapping: "pathname",
        category: "Announcements",
        categoryId: "IC_kwDOCTvJns4CpHBe",
        inputPosition: "top",
        lang: "zh-CN",
        homePageShowComment: true,
        loading: "lazying",
        lightTheme: "light",
        darkTheme: "transparent_dark",
      },
      {
        frontmatter,
        route,
      },
      true
    );
  },
};