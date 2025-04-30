<template>
  <!-- <AppHeader /> -->
  <!-- 内容层 -->

  <!-- 翻页器 -->
  <v-fade-transition>
    <div v-show="showLeftTurner" class="page-turner left-0">
      <div class="turner-content-wrapper left-0">
        <v-icon icon="mdi-chevron-left" size="x-large" color="primary"></v-icon>
      </div>
    </div>
  </v-fade-transition>

  <v-fade-transition>
    <div v-show="showRightTurner" class="page-turner right-0">
      <div class="turner-content-wrapper right-0">
        <v-icon
          icon="mdi-chevron-right"
          size="x-large"
          color="primary"
        ></v-icon>
      </div>
    </div>
  </v-fade-transition>

  <!-- 左侧触发区 -->
  <div
    class="trigger-area left-0"
    @click="navigateToPreviousPage"
    @mouseover="showLeftTurner = true"
    @mouseout="showLeftTurner = false"
  ></div>

  <!-- 右侧触发区 -->
  <div
    class="trigger-area right-0"
    @click="navigateToNextPage"
    @mouseover="showRightTurner = true"
    @mouseout="showRightTurner = false"
  ></div>

  <v-main>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <div class="page-wrapper fill-height">
          <Transition>
            <div>
              <component :is="Component" />
            </div>
          </Transition>
        </div>
      </keep-alive>
    </router-view>
  </v-main>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 导航顺序映射
const pageOrder = ["/", "/my-blogs", "/my-skills", "/my-projects"];

// 控制翻页器显示状态
const showLeftTurner = ref(false);
const showRightTurner = ref(false);

// 获取当前页面在导航顺序中的索引
const getCurrentPageIndex = () => {
  return pageOrder.indexOf(route.path);
};

// 导航到上一个页面
const navigateToPreviousPage = () => {
  const currentIndex = getCurrentPageIndex();
  if (currentIndex > 0) {
    router.push(pageOrder[currentIndex - 1]);
  } else {
    // 如果当前是第一个页面，则导航到最后一个页面（循环）
    router.push(pageOrder[pageOrder.length - 1]);
  }
};

// 导航到下一个页面
const navigateToNextPage = () => {
  const currentIndex = getCurrentPageIndex();
  if (currentIndex < pageOrder.length - 1) {
    router.push(pageOrder[currentIndex + 1]);
  } else {
    // 如果当前是最后一个页面，则导航到第一个页面（循环）
    router.push(pageOrder[0]);
  }
};

// 当路由变化时隐藏翻页器
watch(
  () => route.path,
  () => {
    showLeftTurner.value = false;
    showRightTurner.value = false;
  }
);
</script>

<style scoped>
.page-turner {
  position: fixed;
  z-index: 9998;
  top: 0;
  height: calc(100vh - 40px);
  width: 80px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  pointer-events: auto; /* 确保元素可点击 */
}

.left-turner:hover {
  background: linear-gradient(to right, rgba(0, 0, 0, 1), transparent);
}

.right-turner:hover {
  background: linear-gradient(to left, rgba(0, 0, 0, 0.5), transparent);
}

.turner-content-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.trigger-area {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 80px; /* 增加触发区域宽度 */
  z-index: 9999; /* 增加优先级 */
}

.page-wrapper {
  position: relative;
  z-index: 1;
}
</style>
