import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerCinematicGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 760px)").matches;
}

export function pinnedScrubVars(
  trigger: HTMLElement,
  viewportEnds: number,
  scrub = 1,
): ScrollTrigger.Vars {
  return {
    trigger,
    pin: true,
    pinSpacing: true,
    start: "top top",
    end: () => `+=${Math.max(window.innerHeight, Math.round(window.innerHeight * viewportEnds))}`,
    scrub,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    fastScrollEnd: true,
  };
}

export function refreshScrollTriggers() {
  if (typeof window === "undefined") return;
  registerCinematicGsap();
  ScrollTrigger.refresh();
}

export function refreshTriggersAfterImages(root: HTMLElement | null) {
  if (!root) return () => {};

  const images = Array.from(root.querySelectorAll("img"));
  let cancelled = false;
  let frame = 0;

  const refresh = () => {
    if (cancelled) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      if (!cancelled) refreshScrollTriggers();
    });
  };

  if (images.length === 0) {
    refresh();
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }

  let remaining = images.length;

  const finish = () => {
    remaining -= 1;
    if (remaining > 0 || cancelled) return;
    refresh();
  };

  images.forEach((image) => {
    if (image.complete) {
      finish();
      return;
    }
    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });
  });

  return () => {
    cancelled = true;
    cancelAnimationFrame(frame);
    images.forEach((image) => {
      image.removeEventListener("load", finish);
      image.removeEventListener("error", finish);
    });
  };
}
