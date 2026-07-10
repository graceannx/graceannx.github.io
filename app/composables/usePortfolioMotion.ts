/**
 * Drives the portfolio's scroll behaviour, ported from the original
 * main.js: reveal-on-scroll, image parallax, and the bottom status bar.
 * Runs on the client only and cleans up on unmount.
 */
export function usePortfolioMotion() {
  const currentProject = useState<string>('currentProject', () => 'the moment')

  if (import.meta.server) return { currentProject }

  let raf = 0
  let ticking = false
  let revealObserver: IntersectionObserver | null = null
  const cleanups: Array<() => void> = []

  const prefersReduced = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  type ParallaxNode = {
    wrap: HTMLElement
    media: HTMLElement | null
    strength: number
    current: number
    target: number
  }
  let parallaxNodes: ParallaxNode[] = []
  let projectFigures: HTMLElement[] = []
  let lastProject = ''

  function computeParallaxTargets() {
    const vh = window.innerHeight
    for (const node of parallaxNodes) {
      const rect = node.wrap.getBoundingClientRect()
      if (rect.bottom < -vh || rect.top > vh * 2) continue
      const center = rect.top + rect.height / 2
      const progress = (center - vh / 2) / (vh / 2 + rect.height / 2)
      node.target = -progress * node.strength * rect.height
    }
  }

  function renderParallax() {
    for (const node of parallaxNodes) {
      if (!node.media) continue
      node.current += (node.target - node.current) * 0.12
      node.media.style.transform = `translate3d(0, ${node.current.toFixed(2)}px, 0)`
    }
  }

  function updateStatusBar() {
    const mid = window.innerHeight / 2
    let nearest: HTMLElement | null = null
    let nearestDist = Infinity
    for (const fig of projectFigures) {
      const rect = fig.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) continue
      const dist = Math.abs(rect.top + rect.height / 2 - mid)
      if (dist < nearestDist) {
        nearestDist = dist
        nearest = fig
      }
    }
    if (nearest) {
      const title = nearest.dataset.project
      if (title && title !== lastProject) {
        lastProject = title
        currentProject.value = title
      }
    }
  }

  function onScroll() {
    computeParallaxTargets()
    updateStatusBar()
  }

  function loop() {
    if (!prefersReduced()) renderParallax()
    raf = requestAnimationFrame(loop)
  }

  function scan() {
    parallaxNodes = [...document.querySelectorAll<HTMLElement>('[data-parallax]')].map(
      (el) => {
        // By default we translate the inner media (internal image parallax).
        // With `data-parallax-target`, translate a whole child element instead
        // (e.g. the card) so the image stays put and the block drifts as one.
        const targetSel = el.dataset.parallaxTarget
        const media = targetSel
          ? el.querySelector<HTMLElement>(targetSel)
          : el.querySelector<HTMLElement>('img, video, .media__placeholder')
        return {
          wrap: el,
          media,
          strength: parseFloat(el.dataset.parallax || '') || 0.1,
          current: 0,
          target: 0,
        }
      }
    )
    projectFigures = [...document.querySelectorAll<HTMLElement>('[data-project]')]

    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => revealObserver?.observe(el))
  }

  const scrollHandler = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll()
        ticking = false
      })
      ticking = true
    }
  }

  onMounted(() => {
    // Wait a tick so child components (feed items) are in the DOM.
    nextTick(() => {
      scan()
      window.addEventListener('scroll', scrollHandler, { passive: true })
      window.addEventListener('resize', onScroll)
      cleanups.push(() => window.removeEventListener('scroll', scrollHandler))
      cleanups.push(() => window.removeEventListener('resize', onScroll))
      onScroll()
      if (!prefersReduced()) raf = requestAnimationFrame(loop)
    })
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    revealObserver?.disconnect()
    cleanups.forEach((fn) => fn())
  })

  return { currentProject }
}
