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
  });
}
