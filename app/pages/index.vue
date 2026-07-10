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

// Scroll to a hash target (e.g. arriving from /#gallery on another page).
// Runs on mount so it works for both direct loads and client-side navigation.
const route = useRoute()
onMounted(() => {
  if (!route.hash) return
  // Re-assert the scroll a few times: as the hero media/reveal animations
  // settle the layout shifts, so a single (smooth) scroll gets cancelled.
  const jumpToHash = (attempt = 0) => {
    const el = document.querySelector(route.hash)
    if (el) el.scrollIntoView({ block: 'start' })
    if (attempt < 8) setTimeout(() => jumpToHash(attempt + 1), 80)
  }
  nextTick(() => jumpToHash())
})

useHead({
  title: 'Grace Richardson | Portfolio',
})
</script>
