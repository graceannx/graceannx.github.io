<template>
  <section class="gallery" id="gallery" aria-label="Selected work">
    <FeedItem
      v-for="(project, i) in projects"
      :key="i"
      :project="project"
      :index="i"
    />
  </section>
</template>

<script setup lang="ts">
import { projects } from '~/data/projects'
</script>
