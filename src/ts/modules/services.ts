import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function services() {
  const servicesDescription = document.querySelector<HTMLParagraphElement>(
    '.services__description',
  );

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
}
