const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const progress = document.querySelector(".progress span");
const reveals = [...document.querySelectorAll(".reveal")];

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
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", button.dataset.expand);
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.expand);
    if (!target) return;
    const isOpening = target.hidden;
    target.hidden = !isOpening;
    button.textContent = button.textContent.replace(isOpening ? "+" : "−", isOpening ? "−" : "+");
    button.setAttribute("aria-expanded", String(isOpening));
  });
});

let ticking = false;
addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { setProgress(); ticking = false; });
}, { passive: true });
setProgress();
