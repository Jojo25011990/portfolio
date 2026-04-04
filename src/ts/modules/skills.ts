import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function skillsHeading() {
  const skillsSection = document.querySelector<HTMLElement>('.skills');
  const skillsHeading =
    document.querySelector<HTMLHeadingElement>('.skills__title');
  const skillsMenu = document.querySelector<HTMLUListElement>('.skills__menu');

  // *** Version 01 ***
  gsap.to([skillsSection, skillsHeading, skillsMenu], {
    scrollTrigger: {
      trigger: skillsSection,
      start: 'top center',
    },

    onStart: () => {
      skillsHeading?.classList.add('is-active');
      skillsMenu?.classList.add('is-active');
    },
  });
  // *** End of Version 01 ***

  // *** Version 02 ***
  //   if (skillsSection && skillsHeading && skillsMenu) {
  //     gsap.to([skillsSection, skillsHeading, skillsMenu], {
  //       scrollTrigger: {
  //         trigger: skillsSection,
  //         start: 'top center',
  //       },

  //       onStart: () => {
  //         skillsHeading.classList.add('is-active');
  //         skillsMenu.classList.add('is-active');
  //       },
  //     });
  //   }
  // *** End of Version 02 ***
}
