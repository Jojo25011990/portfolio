export default function envelope() {
  const footerEnvelopeButton = document.querySelector<HTMLButtonElement>(
    '.footer__envelope-button',
  );
  const footerEnvelopeHeart = document.querySelector<HTMLDivElement>(
    '.footer__envelope-heart',
  );
  const footerEnvelopeLetter = document.querySelector<HTMLElement>(
    '.footer__envelope-letter',
  );
  const footerEnvelopeTopSide = document.querySelector<HTMLDivElement>(
    '.footer__envelope-top-side',
  );

  const addClasses = function () {
    footerEnvelopeHeart?.classList.add('is-open');
    footerEnvelopeLetter?.classList.add('is-open');
    footerEnvelopeTopSide?.classList.add('is-open');
  };

  const removeClasses = function () {
    footerEnvelopeHeart?.classList.remove('is-open');
    footerEnvelopeLetter?.classList.remove('is-open');
    footerEnvelopeTopSide?.classList.remove('is-open');
  };

  footerEnvelopeButton?.addEventListener('click', () => {
    addClasses();
  });

  // *** Overlay ***
  const footerOverlay =
    document.querySelector<HTMLDivElement>('.footer__overlay');
  console.log(footerOverlay);

  if (footerOverlay) {
    footerOverlay.addEventListener('click', function (e) {
      if (e.target === footerOverlay) {
        removeClasses();
        footerOverlay.classList.remove('active');
      }
    });
  }
  // *** End of Overlay ***
}
