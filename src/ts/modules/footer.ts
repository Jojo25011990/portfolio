import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import backToTop from './backToTop';

gsap.registerPlugin(ScrollTrigger);
export default function footer() {
  const footer = document.querySelector<HTMLElement>('.footer');

  const footerTitle =
    document.querySelector<HTMLHeadingElement>('.footer__title');
  const footerTitleSpan = document.querySelector<HTMLSpanElement>(
    '.footer__title-span',
  );

  const footerNavigationLine = document.querySelector<HTMLSpanElement>(
    '.footer__navigation-line',
  );

  const footerLogo = document.querySelector<HTMLAnchorElement>('.footer__logo');

  if (footerTitle) {
    gsap.to(footerTitle, {
      scrollTrigger: {
        trigger: footerTitle,
        start: 'top center',
      },

      onStart: () => {
        footerTitleSpan?.classList.add('active');
      },
    });
  }

  if (footer) {
    gsap.to(footer, {
      scrollTrigger: {
        trigger: footer,
        start: '70% 85%',
      },

      onStart: () => {
        footerLogo?.classList.add('active');
        footerNavigationLine?.classList.add('active');
      },
    });
  }

  // *** Back to top - Button ***
  backToTop();
  // *** End of Back to top - Button ***
}
