import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function heading() {
  const headings = document.querySelectorAll<HTMLHeadingElement>('h2');

  headings.forEach(heading => {
    if (
      !heading.classList.contains('skills__title') &&
      !heading.classList.contains('skills__title-sr-only') &&
      !heading.classList.contains('my-process__title')
    ) {
      gsap.to(heading, {
        scrollTrigger: {
          trigger: heading,
          start: 'top 70%',
        },

        onStart: () => {
          const lastChildSpan = heading.lastElementChild;

          if (lastChildSpan instanceof HTMLSpanElement)
            lastChildSpan?.classList.add('active');
        },
      });
    }
  });
}
