import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function header() {
  const header = document.querySelector<HTMLElement>('.header');
  const circleSvg = document.querySelector<HTMLElement>('.heaver__svg-circle');

  console.log(header, circleSvg);

  if (circleSvg) {
    gsap.to(circleSvg, {
      scrollTrigger: {
        trigger: header,
        start: 'top 60%',
        markers: true,
      },

      duration: 1,
      //   onStart: () => {
      //     circleSvg.classList.add('active');
      //   },
    });
  }
}
