<template>
  <div class="bg-img flex-fill align-center justify-center">
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
          <div class="text-body-2 font-weight-light mb-n1">欢迎来到</div>

          <h1 class="text-h2 font-weight-bold mb-4">Boring Link</h1>

          <div class="text-body-1 font-weight-light mb-1">
            这是一个因为无聊而创作的网站
          </div>

          <div class="text-body-1 font-weight-light mb-n1">
            但这个网站或许并不无聊
          </div>
        </div>
      </v-responsive>
    </v-container>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style scoped>
.bg-img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
