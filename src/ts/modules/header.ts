import focusModalTrap from './focusModalTrap';

export default function header() {
  // *** Lightbox ***

  // *** Select Elements ***
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
  // *** End of Select Elements ***

  // *** Mouse Enter | Mouse Leave ***
  if (lightboxOpenButton) {
    lightboxOpenButton.addEventListener('mouseenter', () => {
      circleSvg.style.stroke = '#4ee1a0';
    });

    lightboxOpenButton.addEventListener('mouseleave', () => {
      circleSvg.style.stroke = '#fff';
    });
  }
  // *** End of Mouse Enter | Mouse Leave ***

  // *** Focus Trap ***
  const headerFocusModalTrap = (event: KeyboardEvent) => {
    if (!lightbox) return;

    focusModalTrap(event, lightbox);
  };
  // *** End of Focus Trap ***

  // *** Open Lightbox - Classes | Aria Attr | Focus | Event Listeners ***
  const openLightbox = () => {
    lightbox?.classList.add('show');

    lightbox?.setAttribute('aria-hidden', 'false');
    lightboxOpenButton?.setAttribute('aria-expanded', 'true');

    lightboxCloseButton?.focus();

    document.addEventListener('keydown', headerFocusModalTrap);
    document.addEventListener('keydown', lightboxEscapeKey);
  };
  // *** End of Open Lightbox - Classes | Aria Attr | Focus | Event Listeners ***

  // *** Close Lightbox - Classes | Aria Attr | Focus ( Prevent Scroll ) | Event Listeners ***
  const closeLightbox = () => {
    lightbox?.classList.remove('show');

    lightbox?.setAttribute('aria-hidden', 'true');
    lightboxOpenButton?.setAttribute('aria-expanded', 'false');

    lightboxOpenButton?.focus({ preventScroll: true });

    document.removeEventListener('keydown', headerFocusModalTrap);
    document.removeEventListener('keydown', lightboxEscapeKey);
  };
  // *** End of Close Lightbox - Classes | Aria Attr | Focus ( Prevent Scroll ) | Event Listeners ***

  // *** Escape Key | Click | Event Listeners ***
  const lightboxEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeLightbox();
  };

  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });

  lightboxOpenButton?.addEventListener('click', openLightbox);
  lightboxCloseButton?.addEventListener('click', closeLightbox);
  // *** End of Escape Key | Click | Event Listeners ***
}
