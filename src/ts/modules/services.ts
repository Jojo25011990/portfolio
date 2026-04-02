import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function services() {
  const servicesDescription = document.querySelector<HTMLParagraphElement>(
    '.services__description',
  );

  const servicesItems =
    document.querySelectorAll<HTMLLIElement>('.services__item');

  if (servicesDescription) {
    gsap.to(servicesDescription, {
      scrollTrigger: {
        trigger: servicesDescription,
        start: 'top center',
      },

      duration: 2,
      text: 'Exploring, building, and animating digital experiences that tell a story.',
      ease: 'none',
    });
  }

  if (servicesItems.length) {
    gsap.from(servicesItems, {
      scrollTrigger: {
        trigger: servicesItems[0],
        start: 'top center',
      },

      stagger: 0.3,
      autoAlpha: 0,
      y: 100,
      duration: 1.5,
      ease: 'power2.out',
    });
  }
}
