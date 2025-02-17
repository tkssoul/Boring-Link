<template>
  <div class="nav-container">
    <svg
      width="100"
      height="30"
      xmlns="http://www.w3.org/2000/svg"
      class="svg-icon position-fixed"
      @click="scrollToTop"
    >
      <text
        x="20%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif"
        font-size="24"
        font-weight="bold"
        fill="white"
      >
        BL
      </text>
    </svg>
    <v-breadcrumbs bg-color="rgba(0,0,0,0)">
      <div v-for="(item, index) in navItems">
        <v-breadcrumbs-item
          :href="item.link"
          color="grey"
          active-color="#fff"
          :active="currentRoute === item.link"
          @click.prevent="onNavClick(item.link)"
        >
          {{ item.label }}
        </v-breadcrumbs-item>
        <v-breadcrumbs-divider
          v-if="index !== navItems.length - 1"
          divider="/"
          color="grey"
        />
      </div>
    </v-breadcrumbs>
  </div>
</template>

<script setup lang="ts">
// 定义导航项的类型
interface NavItem {
  label: string;
  link: string;
}

// 创建导航项数组
const navItems: NavItem[] = [
  {
    label: "首页",
    link: "/",
  },
  {
    label: "博客",
    link: "/my-works",
  },
  {
    label: "技能",
    link: "/my-skills",
  },
  {
    label: "项目",
    link: "/my-awards",
  },
];

const router = useRouter();
const route = useRoute();
const currentRoute = computed(() => route.path);
const isNavigating = ref(false);

const onNavClick = async (link: string) => {
  if (currentRoute.value === link || isNavigating.value) return;
  try {
    isNavigating.value = true;
    await router.push(link);
  } catch (error) {
    console.error("Navigation failed:", error);
  } finally {
    isNavigating.value = false;
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<style scoped>
.svg-icon {
  left: 16px;
}

.svg-icon:hover {
  cursor: pointer;
}

.nav-container {
  z-index: 999;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
