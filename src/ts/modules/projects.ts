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

  const projectsDesktopOverlay = document.querySelector<HTMLDivElement>(
    '.projects__box-overlay',
  );
  const projectsTabletMobileLinks = document.querySelector<HTMLDivElement>(
    '.projects__box-links',
  );
  const projectsMediaQuery = window.matchMedia('(max-width: 850px)');

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
      text: 'From over 150 completed projects, this is a refined selection of 10 that reflect my growth, technical range, and creative direction.',
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

  // *** Media Queries - matchMedia ***
  const projectsAriaHidden = (event: MediaQueryList | MediaQueryListEvent) => {
    if (event.matches) {
      // *** Tablet | Mobile ***
      projectsDesktopOverlay?.setAttribute('aria-hidden', 'true');
      projectsTabletMobileLinks?.setAttribute('aria-hidden', 'false');
      // *** End of Tablet | Mobile ***
    } else {
      // *** Desktop ***
      projectsDesktopOverlay?.setAttribute('aria-hidden', 'false');
      projectsTabletMobileLinks?.setAttribute('aria-hidden', 'true');
      // *** End of Desktop ***
    }
  };

  projectsMediaQuery.addEventListener('change', projectsAriaHidden);

  projectsAriaHidden(projectsMediaQuery);
  // *** End of Media Queries - matchMedia ***
}
