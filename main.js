const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;

const navbar = document.getElementById("navbar");
const introLoader = document.getElementById("introLoader");
const revealEls = [...document.querySelectorAll(".reveal")];
const yearEl = document.getElementById("year");
const particleRoot = document.getElementById("heroParticles");
const heroSection = document.getElementById("hero");
const heroSpotlight = document.getElementById("heroSpotlight");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const holoCards = [...document.querySelectorAll(".holo-card")];
const miniCards = [...document.querySelectorAll(".mini-card")];
const magneticEls = [...document.querySelectorAll("[data-magnetic]")];

if (yearEl) yearEl.textContent = String(new Date().getFullYear());
if (introLoader && !reduceMotion) {
  window.setTimeout(() => introLoader.classList.add("is-hidden"), 700);
} else if (introLoader) {
  introLoader.classList.add("is-hidden");
}

let lastScrollY = window.scrollY;
const onScroll = () => {
  const currentY = window.scrollY;
  const shouldShrink = currentY > 12;
  navbar.classList.toggle("scrolled", shouldShrink);
  if (heroSection) {
    heroSection.style.setProperty("--heroShift", `${Math.min(currentY * 0.35, 120)}px`);
  }
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const shift = Math.max(-8, Math.min(8, (window.innerHeight - rect.top) * 0.012 - 4));
    section.style.setProperty("--sectionShift", `${shift.toFixed(2)}px`);
  });

  if (currentY > lastScrollY && currentY > 140) {
    navbar.style.transform = "translate3d(0,-120%,0)";
  } else {
    navbar.style.transform = "translate3d(0,0,0)";
  }
  lastScrollY = currentY;
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (!reduceMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
  );

  revealEls.forEach((el, idx) => {
    el.style.setProperty("--delay", `${Math.min(idx * 35, 260)}ms`);
    io.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

if (!reduceMotion && !coarsePointer && particleRoot) {
  const particleCount = 18;
  for (let i = 0; i < particleCount; i += 1) {
    const node = document.createElement("span");
    node.className = "particle";
    const startX = Math.random() * 100;
    const startY = 100 + Math.random() * 18;
    const size = 2 + Math.random() * 4;
    const duration = 13 + Math.random() * 13;
    const delay = Math.random() * -14;

    node.style.left = `${startX}vw`;
    node.style.top = `${startY}vh`;
    node.style.width = `${size}px`;
    node.style.height = `${size}px`;
    node.style.animationDuration = `${duration}s`;
    node.style.animationDelay = `${delay}s`;

    particleRoot.appendChild(node);
  }
}

if (!reduceMotion && !coarsePointer && cursorDot && cursorRing) {
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let ringX = targetX;
  let ringY = targetY;

  const onMove = (ev) => {
    targetX = ev.clientX;
    targetY = ev.clientY;
    cursorDot.style.opacity = "1";
    cursorRing.style.opacity = "1";
    cursorDot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate3d(-50%, -50%, 0)`;
    if (heroSection && heroSpotlight) {
      const rect = heroSection.getBoundingClientRect();
      const inside = ev.clientY >= rect.top && ev.clientY <= rect.bottom;
      if (inside) {
        const x = ((ev.clientX - rect.left) / rect.width) * 100;
        const y = ((ev.clientY - rect.top) / rect.height) * 100;
        heroSection.style.setProperty("--spotX", `${x}%`);
        heroSection.style.setProperty("--spotY", `${y}%`);
      }
    }
  };

  const animateRing = () => {
    ringX += (targetX - ringX) * 0.14;
    ringY += (targetY - ringY) * 0.14;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate3d(-50%, -50%, 0)`;
    requestAnimationFrame(animateRing);
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "0";
    cursorRing.style.opacity = "0";
  });
  requestAnimationFrame(animateRing);
}

if (!reduceMotion && !coarsePointer && magneticEls.length > 0) {
  for (const el of magneticEls) {
    el.addEventListener("mousemove", (ev) => {
      const rect = el.getBoundingClientRect();
      const x = ev.clientX - rect.left - rect.width / 2;
      const y = ev.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate3d(${x * 0.14}px, ${y * 0.14}px, 0)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  }
}

if (!reduceMotion && !coarsePointer) {
  for (const card of holoCards) {
    let raf = null;
    let localX = 0;
    let localY = 0;

    const paint = () => {
      raf = null;
      const rect = card.getBoundingClientRect();
      const px = (localX / rect.width) * 100;
      const py = (localY / rect.height) * 100;
      const rotateY = (px - 50) / 6.5;
      const rotateX = (50 - py) / 6.5;

      card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0,-3px,0)`;
      card.style.setProperty("--mx", `${px}%`);
      card.style.setProperty("--my", `${py}%`);
    };

    card.addEventListener("mouseenter", () => {
      card.style.setProperty("--shimmerX", "-110%");
    });

    card.addEventListener("mousemove", (ev) => {
      const rect = card.getBoundingClientRect();
      localX = ev.clientX - rect.left;
      localY = ev.clientY - rect.top;
      if (!raf) raf = requestAnimationFrame(paint);
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "50%");
      card.style.setProperty("--shimmerX", "-120%");
    });
  }
}

if (!reduceMotion && !coarsePointer && miniCards.length > 0) {
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  const start = performance.now();
  const tick = (now) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const normX = (pointerX / vw - 0.5) * 2;
    const normY = (pointerY / vh - 0.5) * 2;
    const t = (now - start) * 0.001;

    miniCards.forEach((card, idx) => {
      const depth = Number(card.dataset.depth || 1);
      const floatY = Math.sin(t * (0.8 + idx * 0.12) + idx * 1.7) * (11 + idx * 1.6);
      const floatX = Math.cos(t * (0.6 + idx * 0.08) + idx) * (6 + idx * 1.2);
      const swayX = normY * (5 + idx) * depth + Math.sin(t + idx) * 3;
      const swayY = normX * (7 + idx) * depth + Math.cos(t * 0.8 + idx) * 4;
      const driftX = normX * 9 * depth;
      const driftY = normY * 7 * depth;

      card.style.transform = `translate3d(${driftX + floatX}px, ${driftY + floatY}px, 0) rotateX(${swayX}deg) rotateY(${swayY}deg)`;
      card.style.setProperty("--mx", `${50 + normX * 24}%`);
      card.style.setProperty("--my", `${50 + normY * 24}%`);
    });
    requestAnimationFrame(tick);
  };

  window.addEventListener(
    "mousemove",
    (ev) => {
      pointerX = ev.clientX;
      pointerY = ev.clientY;
    },
    { passive: true }
  );
  requestAnimationFrame(tick);
}
