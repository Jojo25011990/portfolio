import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function future() {
  const futureDescription = document.querySelector<HTMLParagraphElement>(
    '.future__description',
  );

  const futureTitle =
    document.querySelector<HTMLHeadingElement>('.future__title');
  const futureTitleSpan = document.querySelector<HTMLSpanElement>(
    '.future__title-span',
  );

  const futureBox = document.querySelector<HTMLDivElement>('.future__box');
  const futureOverlayModal01 = document.querySelector<HTMLDivElement>(
    '.future__box-01-content-01',
  );

  const futureOverlayOpenBtn = document.querySelector<HTMLButtonElement>(
    '.future__box-01-btn-01',
  );
  const futureOverlayCloseBtn = document.querySelector<HTMLButtonElement>(
    '.future__box-01-project-closebtn',
  );

  if (futureTitle) {
    gsap.to(futureTitle, {
      scrollTrigger: {
        trigger: futureTitle,
        start: 'top 70%',
      },

      onStart: () => {
        futureTitleSpan?.classList.add('active');
      },
    });
  }

  if (futureDescription) {
    gsap.to(futureDescription, {
      scrollTrigger: {
        trigger: futureDescription,
        start: 'top center',
      },

      duration: 1.5,
      text: 'Check out the upcoming projects. I’m planning and what’s next in line.',
      ease: 'none',
    });
  }

  // *** Version 01 ***
  if (futureBox) {
    gsap.to(futureBox, {
      clipPath: 'circle(100% at 50% 50%)',
      duration: 1,
      scrollTrigger: {
        trigger: futureBox,
        start: 'top 60%',
        end: 'bottom 60%',
        scrub: true,
      },
    });
  }

  // *** End of Version 01 ***

  // *** Version 02 - active class ***
  //   if (futureBox) {
  //     gsap.to(futureBox, {
  //       scrollTrigger: {
  //         trigger: futureBox,
  //         start: 'top center',
  //       },

  //       delay: 1,

  //       onStart: () => {
  //         futureBox.classList.add('active');
  //       },
  //     });
  //   }
  // *** End of Version 02 - active class ***

  // *** Future Boxes - ADD | REMOVE | FOCUS ***
  const openFutureProjectModal = () => {
    futureOverlayModal01?.classList.add('active');

    futureOverlayOpenBtn?.setAttribute('aria-expanded', 'true');
    futureOverlayModal01?.setAttribute('aria-hidden', 'false');

    futureOverlayCloseBtn?.focus();
  };

  const closeFutureProjectModal = () => {
    futureOverlayModal01?.classList.remove('active');

    futureOverlayOpenBtn?.setAttribute('aria-expanded', 'false');
    futureOverlayModal01?.setAttribute('aria-hidden', 'true');

    futureOverlayOpenBtn?.focus();
  };

  futureOverlayCloseBtn?.addEventListener('click', closeFutureProjectModal);
  futureOverlayOpenBtn?.addEventListener('click', openFutureProjectModal);
  // *** End of Future Boxes - ADD | REMOVE | FOCUS ***
}
