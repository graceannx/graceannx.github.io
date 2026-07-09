<template>
  <div class="statusbar" aria-hidden="true">
    <span class="statusbar__name">grace richardson</span>
    <span class="statusbar__project">{{ currentProject }}</span>
  </div>
</template>

<script setup lang="ts">
const currentProject = useState<string>('currentProject', () => 'the moment')
</script>
