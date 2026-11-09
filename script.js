document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Subtle parallax/fade timeline for both media and text layers
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#pinnedSection",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
    }
  });

  // Step 1: Layer 1 -> Layer 2
  tl.to(".media-layer.layer-1", { opacity: 0, scale: 1.08, duration: 1 })
    .to(".text-layer.layer-1", { opacity: 0, y: -30, duration: 0.8 }, "<")
    .to(".media-layer.layer-2", { opacity: 1, scale: 1, duration: 1 }, "<")
    .to(".text-layer.layer-2", { opacity: 1, y: 0, duration: 1 }, "<+=0.2")

  // Step 2: Layer 2 -> Layer 3
    .to(".media-layer.layer-2", { opacity: 0, scale: 1.08, duration: 1 }, "+=0.4")
    .to(".text-layer.layer-2", { opacity: 0, y: -30, duration: 0.8 }, "<")
    .to(".media-layer.layer-3", { opacity: 1, scale: 1, duration: 1 }, "<")
    .to(".text-layer.layer-3", { opacity: 1, y: 0, duration: 1 }, "<+=0.2");

  // Force ScrollTrigger to recalculate positions once images finish loading
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

  // Countdown Timer
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 14); // Adjust to your exact launch date

  function updateTimer() {
    const daysEl = document.getElementById("days");
    if (!daysEl) return; // Safely exit if countdown HTML isn't on the page

    const now = new Date().getTime();
    const diff = launchDate - now;
    if (diff <= 0) return;

    daysEl.innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
    document.getElementById("hours").innerText = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    document.getElementById("minutes").innerText = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
    document.getElementById("seconds").innerText = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
  }
  setInterval(updateTimer, 1000);
  updateTimer();
});