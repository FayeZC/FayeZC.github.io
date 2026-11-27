// Decorative depth only: text never receives pointer transforms.
const motion = matchMedia("(prefers-reduced-motion: reduce)");
const fine = matchMedia("(pointer: fine)");
const artifacts = [...document.querySelectorAll("[data-depth]")];
const control = document.querySelector(".motion-control");
let paused = false,
  frame = 0,
  pointerX = 0,
  pointerY = 0;
function sync() {
  const off = paused || motion.matches;
  document.body.classList.toggle("motion-paused", off);
  control?.setAttribute("aria-pressed", String(off));
  if (control)
    control.textContent = off ? control.dataset.off : control.dataset.on;
  for (const el of artifacts) {
    el.style.setProperty("--dx", "0px");
    el.style.setProperty("--dy", "0px");
  }
}
function update() {
  frame = 0;
  if (paused || motion.matches || !fine.matches) return;
  for (const el of artifacts) {
    const depth = Number(el.dataset.depth);
    el.style.setProperty("--dx", `${pointerX * depth}px`);
    el.style.setProperty("--dy", `${pointerY * depth}px`);
  }
}
window.addEventListener(
  "pointermove",
  (e) => {
    if (
      paused ||
      motion.matches ||
      !fine.matches ||
      window.scrollY > innerHeight
    )
      return;
    pointerX = e.clientX / innerWidth - 0.5;
    pointerY = e.clientY / innerHeight - 0.5;
    if (!frame) frame = requestAnimationFrame(update);
  },
  { passive: true },
);
control?.addEventListener("click", () => {
  paused = !paused;
  sync();
});
motion.addEventListener("change", sync);
sync();
for (const button of document.querySelectorAll(".news-toggle")) {
  const list = document.getElementById(button.getAttribute("aria-controls"));
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    list
      ?.querySelectorAll("li[data-older]")
      .forEach((li) => (li.hidden = !open));
    button.setAttribute("aria-expanded", String(open));
    button.textContent =
      (open ? button.dataset.less : button.dataset.more) + (open ? " ↑" : " ↓");
  });
}
