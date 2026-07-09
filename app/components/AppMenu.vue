<template>
  <MagicMenuProvider id="app-menu" :options="{ mode: 'dropdown' }">
    <nav class="app-menu" aria-label="Primary">
      <div class="app-menu__box">
        <MagicMenuView>
          <MagicMenuTrigger as-child>
            <button class="app-logo" type="button" aria-label="Open menu">
              <span>grace</span><span>richardson</span>
            </button>
          </MagicMenuTrigger>
          <MagicMenuContent class="app-menu__content" transition="magic-menu-content--fade">
            <MagicMenuItem class="magic-menu-item">
              <a href="#top">index</a>
            </MagicMenuItem>
            <MagicMenuItem class="magic-menu-item">
              <a href="#gallery">work</a>
            </MagicMenuItem>
            <MagicMenuItem class="magic-menu-item">
              <a href="mailto:hello@yourname.com">contact</a>
            </MagicMenuItem>
            <MagicMenuItem class="magic-menu-item">
              <a href="#" target="_blank" rel="noopener">instagram</a>
            </MagicMenuItem>
          </MagicMenuContent>
        </MagicMenuView>
      </div>
    </nav>
  </MagicMenuProvider>
</template>
