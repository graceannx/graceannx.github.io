<template>
  <div>
    <AppMenu />

    <main id="top">
      <!-- Separate, concert-specific header -->
      <header class="concert-header">
        <NuxtLink class="concert-header__back" to="/">← index</NuxtLink>
        <h1 class="concert-header__title reveal">{{ CONCERT_HEADER.title }}</h1>
      </header>

      <!-- Full-width staggered feed — items split to the left/right of the page -->
      <section class="concert-feed" aria-label="Concert photography">
        <article
          v-for="(photo, i) in concertPhotos"
          :key="i"
          class="concert-feed__item"
        >
          <div class="concert-feed__card">
            <figure
              class="media reveal"
              :data-project="photo.title"
              :data-parallax="photo.type === 'video' ? undefined : (0.1 + (i % 3) * 0.04).toString()"
              :style="{ aspectRatio: photo.aspect }"
            >
              <MagicVideo
                v-if="photo.type === 'video' && photo.src"
                :id="`concert-${i}`"
                :src="photo.src"
              />
              <img
                v-else-if="photo.src"
                :src="photo.src"
                :alt="photo.title"
                loading="lazy"
              />
              <div
                v-else
                class="media__placeholder"
                :data-label="`${photo.title} — ${photo.aspect}`"
              />
            </figure>
            <div class="caption">
              <span class="caption__name">{{ photo.name || AUTHOR }}</span>
              <span class="caption__title">{{ photo.title }}</span>
            </div>
          </div>
        </article>
      </section>
    </main>

    <StatusBar />
  </div>
</template>

<script setup lang="ts">
import { AUTHOR } from '~/data/projects'
import { CONCERT_HEADER, concertPhotos } from '~/data/concert'

// Reuse the shared reveal / parallax / status-bar motion (client only).
usePortfolioMotion()

useHead({
  title: 'Grace Richardson | Live',
})
</script>
