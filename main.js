/* =============================================================
   Personal portfolio — behaviour
   Inspired by objectanimal.com/talent (fonts, scattered layout,
   parallax + reveal scroll animation, bottom status bar).
   ============================================================= */

/* -------------------------------------------------------------
   1. YOUR MEDIA
   Each entry becomes a slot in the scattered gallery.
   - title     : caption shown on the right + in the bottom bar
   - name      : caption shown on the left (defaults to "your name")
   - aspect    : CSS aspect-ratio for the media box (e.g. "3 / 4")
   - variant   : layout flavour → "" | "offset" | "offset-lg" |
                 "wide" | "narrow" | "left"
   - src       : optional media path. Leave empty for a placeholder.
   - type      : "image" | "video" (defaults to image)
   ------------------------------------------------------------- */
const projects = [
  { title: "project one", aspect: "3 / 4", variant: "" },
  { title: "project two", aspect: "16 / 9", variant: "offset" },
  { title: "project three", aspect: "4 / 5", variant: "narrow" },
  { title: "project four", aspect: "16 / 9", variant: "offset-lg" },
  { title: "project five", aspect: "16 / 9", variant: "wide" },
  { title: "project six", aspect: "3 / 4", variant: "offset" },
  { title: "project seven", aspect: "4 / 5", variant: "" },
  { title: "project eight", aspect: "3 / 4", variant: "narrow" },
  { title: "project nine", aspect: "16 / 9", variant: "offset-lg" },
  { title: "project ten", aspect: "4 / 5", variant: "" },
];

const AUTHOR = "grace richardson";

/* -------------------------------------------------------------
   2. Render the gallery
   ------------------------------------------------------------- */
const gallery = document.getElementById("gallery");

function buildMedia(project) {
  const type = project.type || "image";
  if (!project.src) {
    // Placeholder — user swaps this out later.
    return `<div class="media__placeholder" data-label="${project.title} — ${project.aspect}"></div>`;
  }
  if (type === "video") {
    return `<video src="${project.src}" autoplay muted loop playsinline></video>`;
  }
  return `<img src="${project.src}" alt="${project.title}" loading="lazy" crossorigin="anonymous" />`;
}

projects.forEach((project, i) => {
  const item = document.createElement("article");
  item.className = "gallery__item";

  // Subtle parallax; alternate strength for a livelier feed
  const strength = 0.08 + (i % 3) * 0.04;

  item.innerHTML = `
    <a class="card" href="${project.href || "#"}">
      <figure class="media reveal" data-parallax="${strength}"
              data-project="${project.title}" style="aspect-ratio:${project.aspect}">
        ${buildMedia(project)}
      </figure>
      <div class="caption">
        <span class="caption__name">${project.name || AUTHOR}</span>
        <span class="caption__title">${project.title}</span>
      </div>
    </a>
  `;
  gallery.appendChild(item);
});

/* -------------------------------------------------------------
   3. Reveal on scroll (IntersectionObserver)
   ------------------------------------------------------------- */
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);
revealEls.forEach((el) => revealObserver.observe(el));

/* -------------------------------------------------------------
   4. Parallax on the images inside overflow-hidden containers.
   Media is 118% tall; we translate it based on how far the
   container has travelled through the viewport. rAF + lerp
   keeps it smooth and gives that fluid "scroll animation" feel.
   ------------------------------------------------------------- */
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const parallaxNodes = [...document.querySelectorAll("[data-parallax]")].map((el) => ({
  wrap: el,
  media: el.querySelector("img, video, .media__placeholder"),
  strength: parseFloat(el.dataset.parallax) || 0.1,
  current: 0,
  target: 0,
}));

function computeParallaxTargets() {
  const vh = window.innerHeight;
  for (const node of parallaxNodes) {
    const rect = node.wrap.getBoundingClientRect();
    if (rect.bottom < -vh || rect.top > vh * 2) continue;
    // progress: -1 (below fold) → 1 (above fold), 0 at center
    const center = rect.top + rect.height / 2;
    const progress = (center - vh / 2) / (vh / 2 + rect.height / 2);
    node.target = -progress * node.strength * rect.height;
  }
}

function renderParallax() {
  for (const node of parallaxNodes) {
    if (!node.media) continue;
    node.current += (node.target - node.current) * 0.12; // lerp
    node.media.style.transform = `translate3d(0, ${node.current.toFixed(2)}px, 0)`;
  }
}

/* -------------------------------------------------------------
   5. Bottom status bar — show the project nearest the centre.
   ------------------------------------------------------------- */
const currentProjectEl = document.getElementById("current-project");
const projectFigures = [...document.querySelectorAll("[data-project]")];
let lastProject = "";

function updateStatusBar() {
  const mid = window.innerHeight / 2;
  let nearest = null;
  let nearestDist = Infinity;
  for (const fig of projectFigures) {
    const rect = fig.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
    const dist = Math.abs(rect.top + rect.height / 2 - mid);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = fig;
    }
  }
  if (nearest) {
    const title = nearest.dataset.project;
    if (title && title !== lastProject) {
      lastProject = title;
      currentProjectEl.style.opacity = "0";
      setTimeout(() => {
        currentProjectEl.textContent = title;
        currentProjectEl.style.opacity = "1";
      }, 180);
    }
  }
}

/* -------------------------------------------------------------
   6. Single rAF loop drives parallax + status bar
   ------------------------------------------------------------- */
let ticking = false;
function onScroll() {
  computeParallaxTargets();
  updateStatusBar();
}
function loop() {
  if (!prefersReduced) renderParallax();
  requestAnimationFrame(loop);
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
window.addEventListener("resize", onScroll);

onScroll();
if (!prefersReduced) requestAnimationFrame(loop);

/* -------------------------------------------------------------
   7. Theme toggle (light / dark)
   ------------------------------------------------------------- */
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  root.classList.remove("light");
  root.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  const isDark = root.classList.toggle("dark");
  root.classList.toggle("light", !isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/* -------------------------------------------------------------
   8. Misc
   ------------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();
