import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function activity() {
  const activityTitle =
    document.querySelector<HTMLHeadingElement>('.activity__title');
  const activityTitleSpan = document.querySelector<HTMLSpanElement>(
    '.activity__title-span',
  );

  const activityDescription = document.querySelector<HTMLParagraphElement>(
    '.activity__description',
  );

  if (activityTitle) {
    gsap.to(activityTitle, {
      scrollTrigger: {
        trigger: activityTitle,
        start: 'top center',
      },

      onStart: () => {
        activityTitleSpan?.classList.add('active');
      },
    });
  }

  if (activityDescription) {
    gsap.to(activityDescription, {
      scrollTrigger: {
        trigger: activityDescription,
        start: 'top center',
      },

      duration: 2,
      text: 'Exploring, building, and animating digital experiences that tell a story.',
      ease: 'none',
    });
  }
}
