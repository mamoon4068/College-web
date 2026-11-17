
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function useGSAPReveal(dependencies = []) {
  const container = useRef(null);
  const revealed = useRef(new WeakSet());

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

      // Data refreshes should reveal new nodes without hiding existing content.
      const newElements = elements.filter((element) => !revealed.current.has(element));
      newElements.forEach((element) => revealed.current.add(element));
      if (!newElements.length) return;

      gsap.fromTo(
        newElements,
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