<template>
  <v-footer height="40" app class="footer-container">
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
  position: fixed
  bottom: 0
  left: 0
  width: 100%
  height: 40px
  display: flex
  justify-content: center
  align-items: center
  background-color: rgba(0, 0, 0, 0.5)
  z-index: 999
</style>
