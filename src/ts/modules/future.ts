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
      gsap.fromTo(
        futureBox,
        {
          clipPath: 'circle(0% at center)',
        },
        {
          clipPath: 'circle(105% at center)',

          scrollTrigger: {
            trigger: futureBox,
            start: 'top center',
            end: 'bottom center',
            scrub: 2,
          },
        },
      );
    });

    //   // *** Cleanup ***
    return () => futureBoxDesktopContext.revert();
    // *** End of Cleanup ***
  });
  // *** Match Media | Responsive Design ***
  // *** End of Desktop ***
}
