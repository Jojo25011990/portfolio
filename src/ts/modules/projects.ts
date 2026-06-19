import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function projects() {
  const projectsItems =
    document.querySelectorAll<HTMLLIElement>('.projects__item');

  if (projectsItems) {
    projectsItems.forEach((projectsItem, index: number) => {
      gsap.from(projectsItem, {
        delay: index * 0.15,
        y: 100,
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'power2.out',

        scrollTrigger: {
          trigger: projectsItem,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });
  }
}
