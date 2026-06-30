import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function future() {
  // *** Desktop ***
  const futureBox = document.querySelector<HTMLDivElement>('.future__box');
  if (!futureBox) return;

  // *** Match Media | Responsive Design ***
  const gsapMatchMedia = gsap.matchMedia();

  gsapMatchMedia.add('(min-width: 850px)', () => {
    const futureBoxDesktopContext = gsap.context(() => {
      gsap.to(futureBox, {
        clipPath: 'circle(110% at 50% 50%)',

        scrollTrigger: {
          trigger: futureBox,
          start: 'top center',
          end: 'bottom center',
          scrub: 2,
        },
      });
    });

    //   // *** Cleanup ***
    return () => futureBoxDesktopContext.revert();
    // *** End of Cleanup ***
  });
  // *** Match Media | Responsive Design ***
  // *** End of Desktop ***
}
