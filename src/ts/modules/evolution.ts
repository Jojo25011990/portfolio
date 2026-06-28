import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function evolution() {
  // *** Desktop ***
  const evolutionContainer = document.querySelector<HTMLOListElement>(
    '.evolution__timeline',
  );

  const evolutionPhaseLine02 = document.querySelector<HTMLLIElement>(
    '.evolution__line-02',
  );

  const gsapMatchMedia = gsap.matchMedia();

  gsapMatchMedia.add('(min-width: 850px)', () => {
    const evolutionDesktopLineContext = gsap.context(() => {
      gsap.to(evolutionPhaseLine02, {
        scaleY: 1,

        scrollTrigger: {
          trigger: evolutionContainer,
          start: 'top center',
          end: 'bottom 55%',
          scrub: 2,
        },
      });
    });

    // *** Cleanup ***
    return () => evolutionDesktopLineContext.revert();
    // *** End of Cleanup ***
  });
  // *** End of Desktop ***
}
