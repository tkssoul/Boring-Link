<template>
  <!-- 开发 -->
  <section v-for="(website, i) in websites" :key="i" class="test">
    <div class="bg"></div>
    <v-hover v-slot:default="{ isHovering, props }">
      <v-card
        v-bind="props"
        class="mx-auto height-auto elevation-12 rounded-xl"
        width="600"
        color="white"
      >
        <v-img color="surface-variant" height="250" :src="website.image" cover>
          <Transition @enter="overlayEnter" @leave="overlayLeave" :css="false">
            <div>
              <v-overlay
                :model-value="!!isHovering"
                class="align-end justify-center"
                contained
                scrim="black"
                opacity="0.6"
              >
                <v-card-text>
                  <div class="text-high-emphasis ms-1">
                    {{ website.description }}
                  </div>
                </v-card-text></v-overlay
              >
            </div></Transition
          ></v-img
        >

        <div class="justify-space-between d-flex">
          <v-card-text>
            <div class="font-weight-bold ms-1 mb-2">
              {{ website.title }}
            </div>
            <div class="text-caption ms-1">{{ website.label }}</div>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              icon="mdi-arrow-top-right"
              @click="openLink(website.link)"
            ></v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-hover>
  </section>
</template>

<script lang="ts">
export default {
  name: "MyAwards",
  meta: {
    title: "我的奖项",
    icon: "mdi-medal",
  },
};
</script>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

const websites = ref([
  {
    title: "耘仓新平台",
    label: "网站",
    description:
      "这是一个专为农业管理设计的一体化平台，集成了农产品管理、库存追踪、订单处理等多个功能模块，帮助农业企业实现数字化转型。",
    image: "/images/耘仓新平台.webp",
    link: "https://tk-katharsis.us.kg",
  },
  {
    title: "深极小程序",
    label: "小程序",
    description:
      "专注于人才招聘与求职的微信小程序平台，为企业和求职者提供便捷的沟通渠道，支持在线简历投递、职位发布、即时沟通等功能。",
    image: "/images/深极.webp",
    link: "https://github.com/your-mall-project",
  },
  {
    title: "项目 3",
    label: "小程序",
    description:
      "基于Vue开发的在线文档系统，支持Markdown格式编辑和预览，具有文档版本控制、协作编辑、实时预览等功能，适合团队文档管理使用。",
    image: "/images/bugatti-chiron.webp",
    link: "https://docs.example.com",
  },
  {
    title: "项目 4",
    label: "小程序",
    description:
      "使用Vue和Node.js开发的现代化博客系统，具有文章管理、评论系统、用户认证等功能，支持响应式设计，提供良好的阅读体验。",
    image: "/images/lamborghini.webp",
    link: "https://blog.example.com",
  },
]);

// 添加打开链接的方法
const openLink = (url: string) => {
  window.open(url, "_blank");
};

// 修改遮罩层动画
const overlayEnter = (el: Element) => {
  gsap.fromTo(
    el,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.2,
      ease: "power1.out",
      clearProps: "all", // 动画结束后清除属性
    }
  );
};

const overlayLeave = (el: Element, done: () => void) => {
  gsap.to(el, {
    opacity: 0,
    duration: 0.2,
    ease: "power1.in",
    onComplete: done,
  });
};

// 为每个 section 添加背景
const bgPics = ["/images/耘仓新平台.webp", "/images/深极.webp"];

interface Section extends HTMLElement {
  bg?: HTMLElement | null;
}

// 获取比例的辅助函数
const getRatio = (el: HTMLElement): number =>
  window.innerHeight / (window.innerHeight + el.offsetHeight);

// 主要动画逻辑
gsap.utils.toArray<Section>("section").forEach((section, i) => {
  // 获取背景元素
  section.bg = section.querySelector<HTMLElement>(".bg");
  console.log("section.bg = ", section.bg);
  if (section.bg) {
    // 设置随机背景图片
    section.bg.style.backgroundImage = `url(${bgPics[i]})`;
  }
  // 创建滚动触发的动画
  gsap.fromTo(
    section.bg,
    {
      backgroundPosition: () =>
        i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px",
    },
    {
      backgroundPosition: () =>
        `50% ${window.innerHeight * (1 - getRatio(section))}px`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: () => (i ? "top bottom" : "top top"),
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true, // 使其具有响应性
      },
    }
  );
});
</script>

<style scoped>
/* 隐藏滚动条 */
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.content-wrapper {
  width: 96.5vw;
  align-self: center;
}

.cursor-pointer {
  cursor: pointer;
}

section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
