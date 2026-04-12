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
      myPage.classList.toggle('active');
    }),
  );

  coverFront?.addEventListener('click', () => {
    coverFront.classList.toggle('active');
    myBonusBook?.classList.toggle('active');
  });

  coverBack?.addEventListener('click', () => {
    coverBack.classList.toggle('active');
    myBonusBook?.classList.toggle('active');
    myBonusBook?.classList.toggle('close');
  });
}
