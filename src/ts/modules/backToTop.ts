export default function backToTop() {
  const backToTop = document.querySelector<HTMLAnchorElement>('.back-to-top');

  window.addEventListener('scroll', () => {
    const condition =
      window.scrollY + window.innerHeight >= document.body.offsetHeight - 10;

    // *** Version 01 ***
    if (condition && backToTop) backToTop.classList.add('active');
    // *** End of Version 01 ***

    // *** Version 02 ***
    // condition && backToTop?.classList.add('active');
    // *** End of Version 02 ***

    // *** Version 03 ***
    // condition ? backToTop?.classList.add('active') : null;
    // *** End of Version 03 ***

    // *** Responsive Design ***
    if (window.innerWidth <= 500 && backToTop)
      backToTop.className = 'back-to-top';

    // *** Version 02 ***
    // backToTop.classList.remove('active');
    // *** End of Version 02 ***

    // *** Version 03 ***
    // backToTop?.setAttribute('class', 'back-to-top');
    // *** End of Version 03 ***
    // *** End of Responsive Design ***

    // *** Ninja Kun-fu style 🤣 ***
    // if (backToTop) {
    //   backToTop.classList.toggle(
    //     'active',
    //     condition && window.innerWidth > 500,
    //   );
    // }
    // *** End of Ninja Kun-fu style 🤣 ***
  });
}
