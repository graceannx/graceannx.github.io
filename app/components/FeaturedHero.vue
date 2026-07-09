<template>
  <section class="hero">
    <a class="feature" href="#gallery" aria-label="View selected work">
      <figure class="media reveal" data-project="vandal corto.alto">
        <MagicVideo id="hero" :src="src" />
      </figure>
      <div class="caption">
        <span class="caption__name">grace richardson</span>
        <span class="caption__title">vandal corto.alto</span>
      </div>
    </a>
  </section>
</template>

<script setup lang="ts">
const src =
  'https://stream.mux.com/a2qGg72l29P8iacoQ7ioXtEQcCrMzkrztECwE1jtYeo.m3u8'
</script>
