export default function myBonus() {
  const coverFront = document.querySelector<HTMLDivElement>(
    '.my-bonus__book-cover--front',
  );

  const myBonusBook = document.querySelector<HTMLDivElement>('.my-bonus__book');
  const myPage01 = document.querySelector<HTMLDivElement>(
    '.my-bonus__book-page--01',
  );

  coverFront?.addEventListener('click', () => {
    coverFront.classList.toggle('active');
    myBonusBook?.classList.toggle('active');
  });

  myPage01?.addEventListener('click', () => {
    myPage01.classList.toggle('active');
  });
}
