import gsap from 'gsap';

export default function myBonus() {
  const myBonusBook = document.querySelector<HTMLDivElement>('.my-bonus__book');
  const coverFront = document.querySelector<HTMLDivElement>(
    '.my-bonus__book-cover--front',
  );
  const coverBack = document.querySelector<HTMLDivElement>(
    '.my-bonus__book-cover--back',
  );
  const myPages = document.querySelectorAll<HTMLDivElement>(
    '.my-bonus__book-page--01,  .my-bonus__book-page--02, .my-bonus__book-page--03, .my-bonus__book-page--04, .my-bonus__book-page--05',
  );
  myPages.forEach(myPage =>
    myPage.addEventListener('click', () => {
      if (!myPage.classList.contains('active')) {
        myPage.classList.add('active');
      } else {
        myPage.classList.remove('active');
      }
    }),
  );
  coverFront?.addEventListener('click', () => {
    coverFront.classList.toggle('active');
    myBonusBook?.classList.toggle('active');
  });
  coverBack?.addEventListener('click', () => {
    // coverBack.classList.toggle('active');
    coverBack.classList.add('active');
    myBonusBook?.classList.toggle('active');
    myBonusBook?.classList.toggle('close');

    setTimeout(() => {
      coverBack.classList.remove('active');
      [...myPages].reverse().forEach((page, index) => {
        setTimeout(
          () => {
            page.classList.remove('active');
          },
          (index + 1) * 200,
        );
      });
    }, 1000);
  });

  // *** Version 02 ***
}
// *** End of Version 02 ***
