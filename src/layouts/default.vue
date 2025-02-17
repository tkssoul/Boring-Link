<template>
  <AppHeader />
  <!-- 背景容器 -->
  <div class="background-container">
    <div
      v-for="(page, index) in pageOrder"
      :key="index"
      class="background-item"
    >
      <video
        v-if="backgrounds[page].src.endsWith('.mp4')"
        preload="auto"
        autoplay
        muted
        loop
        height="100%"
        width="100%"
      >
        <source :src="backgrounds[page].src" type="video/mp4" />
      </video>
      <v-img
        v-else
        preload
        :src="backgrounds[page].src"
        lazy-src="/images/windows-11.webp"
        cover
        height="100%"
        width="100%"
        alt="背景图片"
      />
    </div>
  </div>

  <!-- 内容层 -->
  <v-main>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <div class="page-wrapper fill-height">
          <Transition @enter="enter" @leave="leave" mode="out-in">
            <div>
              <component :is="Component" />
            </div>
          </Transition>
        </div>
      </keep-alive>
    </router-view>
  </v-main>

  <!-- <AppFooter /> -->
</template>

<script setup lang="ts">
import gsap from "gsap";

interface Background {
  src: string;
}

const route = useRoute();

// 背景媒体映射
const backgrounds: Record<string, Background> = {
  "/": {
    // src: new URL("/images/computer.mp4", import.meta.url).href,
    src: new URL("/images/kgc67-6sgw2.mp4", import.meta.url).href,
  },
  "/my-works": {
    src: new URL("/images/lamborghini.webp", import.meta.url).href,
  },
  "/my-skills": {
    src: new URL("/images/bugatti-chiron.webp", import.meta.url).href,
  },
  "/my-awards": {
    src: new URL("/images/apple-logo.webp", import.meta.url).href,
  },
};

// 预加载资源
const preloadResources = () => {
  Object.values(backgrounds).forEach((background) => {
    if (background.src.endsWith(".webp")) {
      // 图片预加载
      const img = new Image();
      img.src = background.src;
    } else if (background.src.endsWith(".mp4")) {
      // 视频预加载
      const video = document.createElement("video");
      video.src = background.src;
      video.preload = "auto";
      video.load();
    }
  });
};

// 导航顺序映射
const pageOrder = ["/", "/my-works", "/my-skills", "/my-awards"];

// 修改路由监听方式
watch(
  () => route.path,
  (toPath) => {
    const toIndex = pageOrder.indexOf(toPath);

    gsap.to(".background-item", {
      x: `-${toIndex * 100}%`,
      duration: 0.8,
      ease: "power1.inOut",
    });
  }
);

// 页面切换动画
const leave = (el: Element) => {
  gsap.to(el, {
    duration: 0.8,
    opacity: 0,
    ease: "power1.inOut",
  });
};

const enter = (el: Element) => {
  gsap.set(el, {
    opacity: 0,
    x: "0%",
  });
  gsap.to(el, {
    opacity: 1,
    x: "0%",
    duration: 1,
    ease: "power1.in",
  });
};

onMounted(() => {
  gsap.set(".background-item", {
    x: `-${pageOrder.indexOf(route.path) * 100}%`,
  });

  preloadResources();
});
</script>

<style scoped>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 400%; /* 4个页面 */
  height: 100%;
  display: flex;
  /* z-index: -1; */
}

.background-item {
  flex: 0 0 25%; /* 100% ÷ 4 */
  height: 100%;
}

.page-wrapper {
  position: relative;
  z-index: 1;
}
</style>
