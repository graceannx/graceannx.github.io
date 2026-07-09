<template>
  <div>
    <AppMenu />

    <main id="top">
      <FeaturedHero />
      <DescriptionSection />
      <FeedGrid />
    </main>

    <StatusBar />
  </div>
</template>

<script setup lang="ts">
// Reveal-on-scroll, parallax and status-bar behaviour (client only).
usePortfolioMotion()

useHead({
  title: 'Grace Richardson | Portfolio',
})
</script>
