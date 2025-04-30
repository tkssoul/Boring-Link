<template>
  <div>
    <!-- 首页 section -->
    <div class="h-screen bg-black w-100 index-wrapper">
      <div class="computer-container">
        <v-img class="engine" src="/images/工程.svg" width="200" />

        <!-- SVG 容器 - 使用新的渐变尾巴效果 -->
        <svg class="motion-path" viewBox="40 40 220 220">
          <!-- 路径 (参考用，可设为不可见) -->
          <path
            id="circle-path"
            d="M150,50 a100,100 0 1,1 -0.1,0 z"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            stroke-width="2"
          />

          <!-- 光点 -->
          <circle id="glowing-dot" cx="0" cy="0" r="5" fill="#FF8709" />

          <!-- 轨迹尾巴 (使用渐变) -->
        </svg>
      </div>

      <!-- 文本部分 -->
      <div class="d-flex flex-column align-center index-text">
        <h1 class="text-4xl text-white">我的创造</h1>
        <h1 class="text-4xl text-white">从这里开始</h1>
      </div>
    </div>

    <!-- 项目展示部分 -->
    <section
      v-for="(website, i) in websites"
      :key="i"
      :class="i % 2 === 0 ? 'even-section' : 'odd-section'"
      class="overflow-hidden project-section"
    >
      <div class="bg"></div>
      <!-- 文本部分 -->
      <div class="d-flex flex-column align-center w-25 flex-0-1 mx-2">
        <div
          class="project-title"
          :class="i % 2 == 0 ? 'light-text' : 'dark-text'"
        >
          {{ website.title }}
        </div>
        <div
          class="text-body-1"
          style="z-index: 10"
          :class="i % 2 == 0 ? 'light-text' : 'dark-text'"
        >
          {{ website.description }}
        </div>
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
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

defineOptions({
  name: "MyAwards",
  title: "我的奖项",
  icon: "mdi-medal",
});

// 注册插件
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const websites = ref([
  {
    title: "耘仓新平台",
    label: "网站",
    description:
      "基于Vue 3和Springboot的现代化农资交易平台，为农户和商家提供农业资材的在线交易服务。包含商品管理、订单处理、用户认证等功能，支持响应式设计。",
    image: "images/耘仓新平台.webp",
    link: "https://tk-katharsis.us.kg",
    deviceImage: {
      src: "images/MacBook Pro.webp",
      height: "75vh",
      width: "auto",
    },
  },
  {
    title: "深极小程序",
    label: "小程序",
    description:
      "专注于人才招聘与求职的微信小程序平台，为企业和求职者提供便捷的沟通渠道，支持在线简历投递、职位发布、即时沟通等功能。",
    image: "images/深极_手机.webp",
    link: "https://github.com/your-mall-project",
    deviceImage: {
      src: "images/iPhone 16 Pro.webp",
      height: "75vh",
      width: "auto",
    },
  },
  {
    title: "米宠宠物线上健康呵护系统",
    label: "App",
    description:
      "专业的宠物健康管理平台，提供宠物档案管理、疫苗接种提醒、在线问诊等功能。结合AI技术实现宠物疾病初步诊断，帮助宠物主人更好地照顾自己的宠物。",
    image: "images/米宠_手机.png",
    link: "https://github.com/your-mall-project",
    deviceImage: {
      src: "images/iPhone 16 Pro.png",
      height: "auto",
      width: "40vw",
    },
  },
]);

// 判断背景是否为深色
const setBg = () => {
  const sections = document.querySelectorAll(".project-section");
  sections.forEach((section, i) => {
    if (i % 2 === 0) {
      section.classList.add("bg-white");
    } else {
      section.classList.add("bg-black");
    }
  });
};

interface Section extends HTMLElement {
  bg?: HTMLElement | null;
}

// 获取比例的辅助函数
const getRatio = (el: HTMLElement): number =>
  window.innerHeight / (window.innerHeight + el.offsetHeight);

onMounted(() => {
  // 第一部分文本动画
  gsap.set(".index-text", { opacity: 0 });
  gsap.to(".index-text", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".index-wrapper",
      pin: true,
      start: "top top",
      end: "bottom top",
      scrub: 0.1,
      invalidateOnRefresh: true,
    },
  });

  // 光电环绕动画
  const glowingDot = document.getElementById("glowing-dot");

  if (glowingDot) {
    // 创建光点和尾巴动画
    const tl = gsap.timeline({ repeat: -1 });

    // 光点运动
    tl.to(glowingDot, {
      motionPath: {
        path: "#circle-path",
        align: "#circle-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      duration: 10,
      ease: "linear",
    });

    // 光点脉冲效果
    gsap.to(glowingDot, {
      r: 8,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // 发光效果
    gsap.to(glowingDot, {
      filter: "drop-shadow(0 0 10px #FF8709)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
    });
  }

  // 主要动画逻辑
  gsap.utils.toArray<Section>("section").forEach((section, i) => {
    // 获取背景元素
    section.bg = section.querySelector<HTMLElement>(".bg");
    if (section.bg) {
      // 设置随机背景图片
      if (i % 2 == 0) section.bg.classList.add("bg-black");
      else section.bg.classList.add("bg-white");
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
          invalidateOnRefresh: true,
        },
      }
    );

    // 设备图片滑入动画
    const imageWrapper = section.querySelector(`.image-wrapper-${i}`);
    if (imageWrapper) {
      // 初始化位置和动画
      if (i === 2) {
        gsap.set(imageWrapper, {
          y: "-100vh",
          opacity: 0,
        });
        gsap.to(imageWrapper, {
          y: "0",
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      } else if (i % 2 === 0) {
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

setBg();
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

.project-title {
  font-size: 2rem;
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

.bg {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100vh;
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

.computer-container {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
}

.engine {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.motion-path {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}

#glowing-dot {
  filter: drop-shadow(0 0 8px #ff8709);
}

.index-text {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
