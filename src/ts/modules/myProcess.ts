import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

// *** Heading | Description ( in timeline - my story ) ***
export function startMyProcess() {
  const myProcessTitle =
    document.querySelector<HTMLHeadingElement>('.my-process__title');
  const myProcessTitleSpan = document.querySelector<HTMLSpanElement>(
    '.my-process__title-span',
  );

  const myProcessDescription = document.querySelector<HTMLParagraphElement>(
    '.my-process__description',
  );

  if (myProcessTitle) {
    gsap.to(myProcessTitle, {
      onStart: () => {
        myProcessTitleSpan?.classList.add('active');
      },
    });
  }

  if (myProcessDescription) {
    gsap.to(myProcessDescription, {
      duration: 2,
      text: 'Behind the scenes of how interactive experiences are shaped through code, motion, and design decisions.',
      ease: 'none',
    });
  }
}
// *** End of Heading | Description ( in timeline - my story ) ***

// *** CSS Art Book ***
export default function myProcess() {
  const myProcessBook =
    document.querySelector<HTMLDivElement>('.my-process__book');
  const coverFront = document.querySelector<HTMLDivElement>(
    '.my-process__book-cover--front',
  );
  const coverBack = document.querySelector<HTMLDivElement>(
    '.my-process__book-cover--back',
  );
  const myPages = document.querySelectorAll<HTMLDivElement>(
    '.my-process__book-page--01,  .my-process__book-page--02, .my-process__book-page--03, .my-process__book-page--04, .my-process__book-page--05',
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
    myProcessBook?.classList.toggle('active');
  });

  coverBack?.addEventListener('click', () => {
    coverBack.classList.add('active');

    setTimeout(() => {
      coverBack.classList.remove('active');
      myProcessBook?.classList.remove('active');

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
        (myPages.length + 4) * 120,
      );
    }, 700);
  });
}
// *** End of CSS Art Book ***
