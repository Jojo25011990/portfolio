export default function lightbox() {
  const authorImg = document.querySelector<HTMLImageElement>('.header__author');
  const lightbox = document.querySelector<HTMLDivElement>('.header__lightbox');
  const circleSvg = document.querySelector<SVGCircleElement>(
    '.header__svg circle',
  )!;
  console.log(circleSvg);

  // *** Version 01 ***
  if (authorImg) {
    authorImg.addEventListener('click', () => {
      lightbox?.classList.remove('hidden');
      lightbox?.classList.add('show');
    });

    authorImg.addEventListener('mouseenter', () => {
      circleSvg.style.stroke = '#4ee1a0';
    });

    authorImg.addEventListener('mouseleave', () => {
      circleSvg.style.stroke = '#fff';
    });
  }

  // *** End of Version 01 ***
  // *** Version 02 ***
  //   authorImg!.addEventListener('click', () => {
  //     lightbox?.classList.remove('hidden');
  //     lightbox?.classList.add('show');
  //   });
  // *** End of Version 02 ***

  lightbox?.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('show');
  });
}
