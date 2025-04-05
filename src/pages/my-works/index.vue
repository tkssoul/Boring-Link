<template>
  <v-container
    fluid
    class="mx-4 fill-height bg-grey-lighten-5 rounded-xl content-wrapper"
  >
    <!-- 博客 -->
    <div
      class="overflow-x-auto overflow-y-hidden px-11 hide-scrollbar width-100 mx-2"
    >
      <v-row
        justify="start"
        class="fit-height mt-2 pt-3"
        style="flex-wrap: nowrap; align-items: baseline"
      >
        <v-col v-for="(blog, i) in blogs" :key="i" cols="auto">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card
                v-bind="props"
                color="white"
                class="mx-2 rounded-xl magnify cursor-pointer"
                :elevation="isHovering ? 8 : 4"
                style="width: 280px; min-height: 400px"
                @click="openLink(blog.link)"
              >
                <v-card-item>
                  <v-img
                    :src="blog.image"
                    cover
                    height="200"
                    class="rounded-t-xl"
                  />
                  <template #title>
                    <div class="text-caption position-relative">
                      {{ blog.description }}
                    </div>
                  </template>
                  <div>
                    <div class="text-overline mb-1">
                      {{ blog.website }}
                    </div>
                    <div class="text-h7 mb-1">{{ blog.title }}</div>
                  </div>
                </v-card-item>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";

const show = ref(false);

const MyWorks = defineComponent({
  name: "MyWorks",
  // 这里的 meta 可以根据你的实际需求使用，比如在路由配置中获取这些信息
  meta: {
    title: "我的作品",
    icon: "mdi-folder-multiple-image",
  },
});

// 如果需要向外暴露组件名称，可以使用以下方式
defineExpose({
  MyWorks,
});

// 添加打开链接的方法
const openLink = (url: string) => {
  window.open(url, "_blank");
};

const blogs = ref([
  {
    title: "利用GSAP简单实现页面横向背景平滑无缝切换",
    description: "技术分享与心得",
    image: "images/GSAP-logo.webp",
    website: "腾讯云开发者社区/CSDN",
    link: "https://cloud.tencent.com/developer/article/2494201?shareByChannel=link",
  },
  {
    title: "uni-id配置以及出现的问题分析",
    description: "技术分享与心得",
    image: "images/uniapp-logo.webp",
    website: "CSDN",
    link: "https://blog.csdn.net/Katharsis_Tk/article/details/143371763?fromshare=blogdetail&sharetype=blogdetail&sharerId=143371763&sharerefer=PC&sharesource=Katharsis_Tk&sharefrom=from_link",
  },
  {
    title: "uni-id-pages分包解决微信小程序vendor.js过大",
    description: "Web开发最佳实践",
    image: "images/uniapp-logo.webp",
    website: "CSDN",
    link: "https://blog.csdn.net/Katharsis_Tk/article/details/143368412?fromshare=blogdetail&sharetype=blogdetail&sharerId=143368412&sharerefer=PC&sharesource=Katharsis_Tk&sharefrom=from_link",
  },
  {
    title: "macOS使用docker封装openGauss并用Dbeaver管理",
    description: "数据库管理与开发",
    image: "images/apple-logo.webp",
    website: "CSDN",
    link: "https://blog.csdn.net/Katharsis_Tk/article/details/138305306?fromshare=blogdetail&sharetype=blogdetail&sharerId=138305306&sharerefer=PC&sharesource=Katharsis_Tk&sharefrom=from_link",
  },
]);
</script>

<style scoped>
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.fit-height {
  height: calc(320px * 1.1 + 170px);
}

.magnify {
  transform: scale(1);
  &:hover {
    transform: scale(1.1);
  }
  transition: transform 0.3s ease-in-out;
}

.content-wrapper {
  width: 96.5vw;
  align-self: center;
}
</style>
