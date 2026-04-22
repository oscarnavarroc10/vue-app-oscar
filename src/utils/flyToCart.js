export async function flyToCart(sourceEl, targetEl) {
  if (!sourceEl || !targetEl) return;

  const from = sourceEl.getBoundingClientRect();
  const to = targetEl.getBoundingClientRect();

  const ghost = sourceEl.cloneNode(true);

  ghost.style.position = "fixed";
  ghost.style.left = `${from.left}px`;
  ghost.style.top = `${from.top}px`;
  ghost.style.width = `${from.width}px`;
  ghost.style.height = `${from.height}px`;
  ghost.style.margin = "0";
  ghost.style.zIndex = "9999";
  ghost.style.pointerEvents = "none";
  ghost.style.transformOrigin = "center center";
  ghost.style.transition =
    "transform 650ms cubic-bezier(0.22, 1, 0.36, 1), opacity 650ms ease, filter 650ms ease";
  ghost.style.boxShadow = "0 24px 60px rgba(2, 6, 23, 0.28)";
  ghost.style.opacity = "0.95";

  document.body.appendChild(ghost);

  await new Promise((resolve) => requestAnimationFrame(resolve));

  const deltaX = to.left + to.width / 2 - (from.left + from.width / 2);
  const deltaY = to.top + to.height / 2 - (from.top + from.height / 2);

  ghost.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.18)`;
  ghost.style.opacity = "0";
  ghost.style.filter = "blur(6px)";

  await new Promise((resolve) => setTimeout(resolve, 680));

  ghost.remove();

  if (targetEl.animate) {
    targetEl.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.12)" },
        { transform: "scale(0.98)" },
        { transform: "scale(1)" },
      ],
      {
        duration: 320,
        easing: "ease",
      },
    );
  }
}