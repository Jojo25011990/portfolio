import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function projects() {
  const projectsItems =
    document.querySelectorAll<HTMLLIElement>('.projects__item');
  const projectsDescription = document.querySelector<HTMLParagraphElement>(
    '.projects__description',
  );

  const projectsTitle =
    document.querySelector<HTMLHeadingElement>('.projects__title');
  const projectsTitleSpan = document.querySelector<HTMLSpanElement>(
    '.projects__title-span',
  );

  if (projectsTitle) {
    gsap.to(projectsTitle, {
      scrollTrigger: {
        trigger: projectsTitle,
        start: 'top 70%',
      },

      onStart: () => {
        projectsTitleSpan?.classList.add('active');
      },
    });
  }

  if (projectsDescription) {
    gsap.to(projectsDescription, {
      scrollTrigger: {
        trigger: projectsDescription,
        start: 'top 70%',
      },

      duration: 3,
      text: 'From over 150 completed projects, this is a curated selection showcasing my work across interactive UI systems, creative coding, animations, and frontend experiments.',
      ease: 'none',
    });
  }

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
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });
    });
  }
}
