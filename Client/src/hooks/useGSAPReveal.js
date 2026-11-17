
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function useGSAPReveal(dependencies = []) {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(
        "[data-gsap-reveal]"
      );

      if (
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      ) {
        gsap.set(elements, {
          clearProps: "all",
        });
        return;
      }

      gsap.fromTo(
        elements,
        {
          autoAlpha: 0,
          y: 24,
          scale: 0.98,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "all",
        }
      );
    }, container);

    return () => ctx.revert();
  }, dependencies);

  return container;
}