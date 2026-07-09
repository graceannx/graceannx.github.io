<template>
  <footer class="footer">
    <div class="footer__group">
      <div class="footer__col">
        <span class="footer__label">connect</span>
        <ol>
          <li><a href="mailto:hello@yourname.com">hello@yourname.com</a></li>
          <li><a href="#" target="_blank" rel="noopener">instagram</a></li>
        </ol>
      </div>
    </div>
    <div class="footer__group">
      <div class="footer__col">
        <span class="footer__label">info</span>
        <ol>
          <li>© {{ year }} grace richardson</li>
          <li>all rights reserved</li>
        </ol>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
