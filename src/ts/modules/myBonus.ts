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
    coverBack.classList.add('active');

    setTimeout(() => {
      coverBack.classList.remove('active');
      myBonusBook?.classList.remove('active');

      [...myPages].reverse().forEach((myOnePage, index) => {
        setTimeout(
          () => {
            myOnePage.classList.remove('active');
          },
          (index + 1) * 120,
        );
      });

      setTimeout(
        () => {
          coverFront?.classList.remove('active');
        },
        (myPages.length + 1.5) * 120,
      );
    }, 1000);
  });
}
// *** End of Version 02 ***
