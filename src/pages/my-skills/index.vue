<template>
  <v-container
    fluid
    class="mx-4 fill-height bg-grey-lighten-5 rounded-xl content-wrapper"
  >
    <!-- 雷达图 -->
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" elevation="2">
          <v-card-text>
            <SkillChart />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- 层叠滑动容器 -->
  <v-row
    class="cards-container d-flex flex-no-wrap h-screen"
    :style="{ width: `${(panels.length - 1) * 70 + 100}%` }"
  >
    <v-card
      v-for="(panel, index) in panels"
      :key="index"
      :class="`panel-${index}`"
      :color="panel.color"
      class="card-panel"
      :style="{
        left: `${index * 70}vw`,
        width: `${index === panels.length - 1 ? 100 : 70}vw`,
      }"
    >
      <div class="d-flex h-100">
        <div class="left-section">
          <v-img :src="panel.logo" class="logo mb-8" max-height="200" contain />
          <v-card-title class="text-h2">{{ panel.labels }}</v-card-title>
        </div>
        <v-divider vertical></v-divider>
        <v-card-text
          class="right-section"
          :style="{ background: panel.logoColor }"
        >
          <div class="skill-grid w-100">
            <span
              v-for="skill in panel.content"
              :key="skill"
              class="skill-item"
            >
              {{ skill }}
            </span>
          </div>
        </v-card-text>
      </div>
    </v-card>
  </v-row>
</template>

<script setup lang="ts">
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const panels = ref([
  {
    logo: "images/logo/Vue.svg",
    logoColor: "#4FC08D",
    color: "#FFFFFF",
    labels: "Vue.js",
    content: [
      "性能优化",
      "组件化开发",
      "状态管理 (Vuex/Pinia)",
      "Vue Router 路由管理",
      "生命周期钩子应用",
      "组件通信方案",
    ],
  },
  {
    logo: "images/logo/ArcoDesign.svg",
    logoColor: "#2F54EB",
    color: "#061178",
    labels: "组件框架",
    content: ["Vuetify", "Arco Design", "ColorUI", "Element Plus"],
  },
  {
    logo: "images/logo/GSAP.svg",
    logoColor: "#88ce02",
    color: "#333333",
    labels: "GSAP",
    content: [
      "动画Timeline管理",
      "ScrollTrigger 插件应用",
      "补间动画制作",
      "动画序列控制",
      "交错动画效果",
      "路径动画实现",
      "动画缓动函数",
      "3D 变换动画",
    ],
  },
]);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const cards = gsap.utils.toArray(".card-panel");

  let scrollTween = gsap.to(cards, {
    xPercent: -70 * (cards.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".cards-container",
      pin: true,
      scrub: 1,
      end: `+=${(cards.length - 1) * 70 + 100}%`,
    },
  });
});
</script>

<style scoped>
.cards-container {
  position: relative;
}

.card-panel {
  position: absolute;
  left: 0;
  height: 100%;
  padding: 2rem;
  will-change: transform;
}

.left-section {
  width: 30vw;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.right-section {
  padding: 2rem;
  display: flex;
  align-items: center;
}

.logo {
  width: 100%;
  object-fit: contain;
}

.skill-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

.skill-item {
  background: rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}
</style>
