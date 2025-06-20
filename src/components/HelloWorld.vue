<template>
  <div
    class="flex-fill align-center justify-center container"
    :class="containerBg"
  >
    <v-container class="fill-height">
      <v-responsive
        class="d-flex align-center justify-center fill-height mx-auto text-center"
        max-width="900"
      >
        <v-avatar size="200">
          <v-img
            class="bg-surface-variant mx-auto"
            aspect-ratio="1/1"
            lazy-src="/images/hero.webp"
            src="/images/hero.webp"
          />
        </v-avatar>

        <div class="text-center">
          <h1 class="text-h1 font-weight-bold mb-4 text-effect">Boring Link</h1>

          <div
            v-if="contentText == 'text-black'"
            class="text-body-1 font-weight-light mb-1"
          >
            这是一个因为无聊而创作的网站
          </div>
          <div v-else class="text-body-1 font-weight-light mb-1">迷途漫漫</div>

          <div
            v-if="contentText == 'text-black'"
            class="text-body-1 font-weight-light mb-n1"
          >
            但这个网站或许并不无聊
          </div>
          <div v-else class="text-body-1 font-weight-light mb-n1">
            但终能点亮
          </div>
        </div>
      </v-responsive>
    </v-container>
    <AppFooter class="position-fixed" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
const containerBg = ref("bg-black");
const contentText = computed(() => {
  return containerBg.value === "bg-black" ? "text-white" : "text-black";
});
onMounted(() => {
  const circle: HTMLElement | null = document.querySelector(".container");
  if (circle != null) {
    circle.onmousemove = (e) => {
      const rect = circle.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      circle.style.setProperty("--x", `${x}px`);
      circle.style.setProperty("--y", `${y}px`);
    };

    circle.onclick = (e) => {
      if (containerBg.value === "bg-black") {
        circle.style.setProperty("--dis", "none");
        circle.style.setProperty("--size", "300vh");
        setTimeout(() => {
          containerBg.value = "bg-white";
        }, 1);
      }
    };
  }
});
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  height: calc(100vh - 40px);
  transition: 1s, top 0s, left 0s;
  z-index: 9999;
  --size: 700px;
  --clr: white;
  --dis: "block";
}

.text-effect {
  width: 100%;
  height: 150px;
  overflow: hidden;
  background-color: black;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  position: relative;
  z-index: 1;
}

.container::before {
  display: var(--dis);
  content: "";
  position: absolute;
  top: var(--y);
  left: var(--x);
  transform: translate(-50%, -50%);
  width: var(--size);
  height: var(--size);
  background: radial-gradient(var(--clr), transparent, transparent);
  z-index: 0;
}

.container::after {
  display: var(--dis);
  content: "";
  position: absolute;
  inset: 2px;
  background: rgba(0, 0, 0, 0.4);
}
</style>
