<template>
  <article class="gallery__item">
    <a class="card" :href="project.href || '#'">
      <figure
        class="media reveal"
        :data-project="project.title"
        :data-parallax="isVideo ? undefined : strength"
        :style="{ aspectRatio: project.aspect }"
      >
        <MagicVideo v-if="isVideo" :id="`feed-${index}`" :src="project.src!" />
        <img
          v-else-if="project.src"
          :src="project.src"
          :alt="project.title"
          loading="lazy"
        />
        <div
          v-else
          class="media__placeholder"
          :data-label="`${project.title} — ${project.aspect}`"
        />
      </figure>
      <div class="caption">
        <span class="caption__name">{{ project.name || AUTHOR }}</span>
        <span class="caption__title">{{ project.title }}</span>
      </div>
    </a>
  </article>
</template>

<script setup lang="ts">
import { AUTHOR, type Project } from '~/data/projects'

const props = defineProps<{
  project: Project
  index: number
}>()

const isVideo = computed(
  () => props.project.type === 'video' && !!props.project.src
)

// Subtle parallax; alternate strength for a livelier feed
const strength = computed(() => (0.08 + (props.index % 3) * 0.04).toString())
</script>
