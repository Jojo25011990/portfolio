import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function evolving() {
  const evolvingTitle =
    document.querySelector<HTMLHeadingElement>('.evolving__title');
  const evolvingTitleSpan = document.querySelector<HTMLSpanElement>(
    '.evolving__title-span',
  );

  const evolvingDescription = document.querySelector<HTMLParagraphElement>(
    '.evolving__description',
  );

  if (evolvingTitle) {
    gsap.to(evolvingTitle, {
      scrollTrigger: {
        trigger: evolvingTitle,
        start: 'top center',
      },

      onStart: () => {
        evolvingTitleSpan?.classList.add('active');
      },
    });
  }

  if (evolvingDescription) {
    gsap.to(evolvingDescription, {
      scrollTrigger: {
        trigger: evolvingDescription,
        start: 'top center',
      },

      duration: 2,
      text: 'Exploring, building, and animating digital experiences that tell a story.',
      ease: 'none',
    });
  }
}
