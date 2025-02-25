<template>
  <div>
    <section
      v-for="(website, i) in websites"
      :key="i"
      :class="i % 2 === 0 ? 'even-section' : 'odd-section'"
    >
      <div class="bg"></div>

      <!-- 文本部分 -->
      <div
        class="project-title"
        :class="{ 'light-text': isDarkBg(i), 'dark-text': !isDarkBg(i) }"
      >
        {{ website.title }}
      </div>

      <!-- 图片部分 -->
      <div
        class="position-relative image-wrapper"
        :class="`image-wrapper-${i}`"
        :style="{
          height: website.deviceImage.height,
          maxWidth: website.deviceImage.width,
        }"
      >
        <v-img
          :src="website.deviceImage.src"
          alt="设备图片"
          class="device-image position-relative"
          cover
        />

        <v-img class="inside-image" :src="website.image" cover width="100%" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

defineOptions({
  name: "MyAwards",
  title: "我的奖项",
  icon: "mdi-medal",
});

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

const websites = ref([
  {
    title: "占位",
    label: "小程序",
    description:
      "基于Vue开发的在线文档系统，支持Markdown格式编辑和预览，具有文档版本控制、协作编辑、实时预览等功能，适合团队文档管理使用。",
    image: "/images/bugatti-chiron.webp",
    link: "https://docs.example.com",
    deviceImage: {
      src: "/images/MacBook Pro深黑色.png",
      height: "75vh",
      width: "auto",
    },
  },
  {
    title: "耘仓新平台",
    label: "网站",
    description:
      "基于Vue 3和Springboot的现代化农资交易平台，为农户和商家提供农业资材的在线交易服务。包含商品管理、订单处理、用户认证等功能，支持响应式设计。",
    image: "/images/耘仓新平台.webp",
    link: "https://tk-katharsis.us.kg",
    deviceImage: {
      src: "/images/MacBook Pro.webp",
      height: "75vh",
      width: "auto",
    },
  },
  {
    title: "深极小程序",
    label: "小程序",
    description:
      "专注于人才招聘与求职的微信小程序平台，为企业和求职者提供便捷的沟通渠道，支持在线简历投递、职位发布、即时沟通等功能。",
    image: "/images/深极_手机.png",
    link: "https://github.com/your-mall-project",
    deviceImage: {
      src: "/images/iPhone 16 Pro.webp",
      height: "75vh",
      width: "auto",
    },
  },
]);

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
const bgPics = [
  "/images/lamborghini.webp",
  "/images/纯黑.webp",
  "/images/纯白.jpeg",
];

// 判断背景是否为深色
const isDarkBg = (index: number) => {
  // 根据背景图片确定使用深色还是浅色文本
  // 这里简单根据图片路径判断，实际项目可能需要更复杂的逻辑
  const bgPath = bgPics[index];
  return (
    bgPath.includes("纯黑") ||
    bgPath.includes("lamborghini") ||
    bgPath.includes("bugatti")
  );
};

interface Section extends HTMLElement {
  bg?: HTMLElement | null;
}

// 获取比例的辅助函数
const getRatio = (el: HTMLElement): number =>
  window.innerHeight / (window.innerHeight + el.offsetHeight);

onMounted(() => {
  // 主要动画逻辑
  gsap.utils.toArray<Section>("section").forEach((section, i) => {
    // 获取背景元素
    section.bg = section.querySelector<HTMLElement>(".bg");
    console.log("section.bg = ", section.bg);
    if (section.bg) {
      // 设置随机背景图片
      section.bg.style.backgroundImage = `url(${bgPics[i]})`;
    }
    // 创建滚动触发的背景动画
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

    // 设备图片滑入动画
    const imageWrapper = section.querySelector(`.image-wrapper-${i}`);
    if (imageWrapper) {
      // 初始化位置和动画
      if (i % 2 === 0) {
        // 偶数索引 - 图片从右侧滑入
        gsap.set(imageWrapper, {
          x: "100%",
          opacity: 0,
        });
        gsap.to(imageWrapper, {
          x: "0",
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "center center",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      } else {
        // 奇数索引 - 图片从左侧滑入
        gsap.set(imageWrapper, {
          x: "-100%",
          opacity: 0,
        });
        gsap.to(imageWrapper, {
          x: "0",
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "center center",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }

    // 文本动画
    const projectTitle = section.querySelector(".project-title");
    if (projectTitle) {
      if (i % 2 === 0) {
        // 偶数索引 - 文本从左侧滑入
        gsap.set(projectTitle, {
          x: "-100%",
          opacity: 0,
        });
      } else {
        // 奇数索引 - 文本从右侧滑入
        gsap.set(projectTitle, {
          x: "100%",
          opacity: 0,
        });
      }

      gsap.to(projectTitle, {
        x: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "top 20%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }
  });
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
  justify-content: space-between;
  padding: 0 5vw;
}

.even-section {
  flex-direction: row; /* 文本在左，图片在右 */
}

.odd-section {
  flex-direction: row-reverse; /* 文本在右，图片在左 */
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

.project-title {
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  z-index: 10;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1;
  padding: 2rem;
  max-width: 30vw;
}

.image-wrapper {
  height: fit-content;
  width: 50%;
  z-index: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  flex: 1;
}

.device-image {
  z-index: 3;
}

.inside-image {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 2;
}

.light-text {
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.dark-text {
  color: #222222;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.5);
}

/* 适配小屏幕 */
@media (max-width: 1024px) {
  .project-title {
    font-size: 3.5rem;
  }
}

@media (max-width: 768px) {
  .even-section,
  .odd-section {
    flex-direction: column;
    justify-content: center;
  }

  .project-title {
    font-size: 3rem;
    max-width: 90%;
    margin-bottom: 2rem;
  }

  .image-wrapper {
    width: 90%;
  }
}
</style>
