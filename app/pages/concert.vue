<template>
  <div>
    <AppMenu />

    <main id="top">
      <!-- Separate, concert-specific header -->
      <header class="concert-header">
        <NuxtLink class="concert-header__back" to="/">← index</NuxtLink>
        <h1 class="concert-header__title reveal">{{ CONCERT_HEADER.title }}</h1>
        <p class="concert-header__subtitle reveal">
          {{ CONCERT_HEADER.subtitle }}
        </p>
        <p class="concert-header__intro reveal">{{ CONCERT_HEADER.intro }}</p>
      </header>

      <!-- Full-width stacked photo feed with reveal + parallax -->
      <section class="concert-feed" aria-label="Concert photography">
        <article
          v-for="(photo, i) in concertPhotos"
          :key="i"
          class="concert-feed__item"
        >
          <figure
            class="media reveal"
            :data-project="photo.title"
            :data-parallax="(0.1 + (i % 3) * 0.04).toString()"
            :style="{ aspectRatio: photo.aspect }"
          >
            <img
              v-if="photo.src"
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
