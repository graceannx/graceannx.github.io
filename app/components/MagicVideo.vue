<template>
  <div class="magic-video">
    <MagicPlayerProvider :id="id" :options="options">
      <MagicPlayerVideo />
    </MagicPlayerProvider>
  </div>
</template>

<script setup lang="ts">
/**
 * Thin wrapper around MagicPlayer's <MagicPlayerVideo>.
 * Muted, looping, and set to play only while in the viewport and the
 * window is focused — the same behaviour as objectanimal.com.
 */
const props = defineProps<{
  id: string
  src: string
}>()

const options = {
  src: props.src,
  mode: 'video' as const,
  preload: 'metadata',
  autoplay: true,
  loop: true,
  playback: ['viewport', 'window'],
}
</script>
