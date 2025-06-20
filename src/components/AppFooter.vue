<template>
  <v-footer height="40" app class="footer-container">
    <div>
      <a
        href="https://beian.miit.gov.cn"
        class="text-caption text-decoration-none"
        style="color: grey;"
        >浙ICP备2025167963号</a
      >
    </div>
    <div
      class="text-caption text-disabled d-flex ga-3"
      style="position: absolute; right: 16px"
    >
      <text>Email:2495830486@qq.com</text>
    </div>
  </v-footer>
</template>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)

.footer-container
  bottom: 0
  left: 0
  width: 100%
  height: 40px
  opacity: 0.8
  display: flex
  justify-content: center
  align-items: center
  z-index: 999
</style>
