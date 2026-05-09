import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function header() {
  // *** Lightbox ***
  const lightbox = document.querySelector<HTMLDivElement>('.header__lightbox');
  const lightboxOpenButton = document.querySelector<HTMLImageElement>(
    '.header__author-button',
  );
  const lightboxCloseButton = document.querySelector<HTMLButtonElement>(
    '.header__lightbox-closebtn',
  );
  const circleSvg = document.querySelector<SVGCircleElement>(
    '.header__svg circle',
  )!;
  console.log(circleSvg);

  if (lightboxOpenButton) {
    lightboxOpenButton.addEventListener('mouseenter', () => {
      circleSvg.style.stroke = '#4ee1a0';
    });

    lightboxOpenButton.addEventListener('mouseleave', () => {
      circleSvg.style.stroke = '#fff';
    });
  }
  // *** OPEN | CLOSE | FOCUS ***
  const openLightbox = () => {
    lightbox?.classList.add('show');

    lightbox?.setAttribute('aria-hidden', 'false');
    lightboxOpenButton?.setAttribute('aria-expanded', 'true');

    lightboxCloseButton?.focus();

    document.addEventListener('keydown', lightboxEscapeKey);
  };

  const closeLightbox = () => {
    lightbox?.classList.remove('show');

    lightbox?.setAttribute('aria-hidden', 'true');
    lightboxOpenButton?.setAttribute('aria-expanded', 'false');

    lightboxOpenButton?.focus({ preventScroll: true });

    document.removeEventListener('keydown', lightboxEscapeKey);
  };

  const lightboxEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeLightbox();
  };

  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });

  lightboxOpenButton?.addEventListener('click', openLightbox);
  lightboxCloseButton?.addEventListener('click', closeLightbox);
  // *** OPEN | CLOSE | FOCUS ***
  // *** End of Lightbox ***
}
