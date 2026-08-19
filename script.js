const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const progress = document.querySelector(".progress span");
const reveals = [...document.querySelectorAll(".reveal")];
const heroType = document.querySelector(".hero-type");

if (heroType && !reducedMotion) {
  const textNode = heroType.querySelector(".hero-type-text");
  const fullText = heroType.dataset.fullText || "";
  const characters = Array.from(fullText);
  const duration = 2000;

  textNode.textContent = "";
  document.fonts.ready.then(() => {
    const startedAt = performance.now();
    const typeFrame = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const characterCount = Math.min(Math.ceil(progress * characters.length), characters.length);
      textNode.textContent = characters.slice(0, characterCount).join("");
      if (progress < 1) {
        requestAnimationFrame(typeFrame);
      } else {
        heroType.classList.add("is-complete");
      }
    };
    requestAnimationFrame(typeFrame);
  });
}

const setProgress = () => {
  const distance = document.documentElement.scrollHeight - innerHeight;
  const value = distance > 0 ? scrollY / distance : 0;
  progress?.style.setProperty("transform", `scaleX(${value})`);
};

if (reducedMotion) {
  reveals.forEach((item) => item.classList.add("visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

  reveals.forEach((item, index) => {
    item.style.setProperty("--delay", `${Math.min(index % 4, 3) * 55}ms`);
    observer.observe(item);
  });
}

document.querySelectorAll("[data-expand]").forEach((button) => {
  const closedLabel = "Under the hood +";
  const openLabel = "Close details ↑";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", button.dataset.expand);
  button.textContent = closedLabel;
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.expand);
    if (!target) return;
    const isOpening = target.hidden;
    target.hidden = !isOpening;
    button.textContent = isOpening ? openLabel : closedLabel;
    button.setAttribute("aria-expanded", String(isOpening));
    if (isOpening) {
      requestAnimationFrame(() => target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "nearest"
      }));
    }
  });
});

let ticking = false;
addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { setProgress(); ticking = false; });
}, { passive: true });
setProgress();
