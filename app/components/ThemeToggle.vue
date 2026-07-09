<template>
  <button
    class="theme-toggle"
    type="button"
    aria-label="Toggle light / dark"
    @click="toggle"
  >
    light / dark
  </button>
</template>

<script setup lang="ts">
const { toggle } = useTheme()
</script>
