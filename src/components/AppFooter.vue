<template>
  <v-footer height="40" app>
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
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

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px"
    >
      <a
        class="text-decoration-none on-surface"
        rel="noopener noreferrer"
        target="_blank"
      >
        联系我
      </a>
    </div>
  </v-footer>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
