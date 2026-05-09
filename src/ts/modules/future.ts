import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function future() {
  const futureBox = document.querySelector<HTMLDivElement>('.future__box');

  // *** Version 01 ***
  if (futureBox) {
    gsap.to(futureBox, {
      clipPath: 'circle(110% at 50% 50%)',
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: futureBox,
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: true,
      },
    });
  }

  // *** End of Version 01 ***

  // *** Version 02 - active class ***
  //   if (futureBox) {
  //     gsap.to(futureBox, {
  //       scrollTrigger: {
  //         trigger: futureBox,
  //         start: 'top center',
  //       },

  //       delay: 1,

  //       onStart: () => {
  //         futureBox.classList.add('active');
  //       },
  //     });
  //   }
  // *** End of Version 02 - active class ***
}
