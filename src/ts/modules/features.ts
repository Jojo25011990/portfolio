import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function features() {
  const featuresDescription = document.querySelector<HTMLParagraphElement>(
    '.features__description',
  );

  if (featuresDescription) {
    gsap.to(featuresDescription, {
      scrollTrigger: {
        trigger: featuresDescription,
        start: 'top center',
      },

      duration: 2,
      text: 'Small details that make every project engaging, interactive, and memorable.',
      ease: 'none',
    });
  }
}
