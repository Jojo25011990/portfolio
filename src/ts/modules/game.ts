import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function game() {
  const gameTitle = document.querySelector<HTMLHeadingElement>('.game__title');
  const gameTitleSpan =
    document.querySelector<HTMLSpanElement>('.game__title-span');

  const gameDescription =
    document.querySelector<HTMLParagraphElement>('.game__description');

  if (gameTitle) {
    gsap.to(gameTitle, {
      scrollTrigger: {
        trigger: gameTitle,
        start: 'top center',
      },

      onStart: () => {
        gameTitleSpan?.classList.add('active');
      },
    });
  }

  if (gameDescription) {
    gsap.to(gameDescription, {
      scrollTrigger: {
        trigger: gameDescription,
        start: 'top center',
      },

      duration: 2.5,
      text: 'A cinematic storytelling reel combining CSS Art, Animations, 3D work and interactive experiments.',
      ease: 'none',
    });
  }

  // *** CSS Art Memory Game ***
  const emojis = [
    '❤️',
    '❤️',
    '🤣',
    '🤣',
    '😘',
    '😘',
    '😅',
    '😅',
    '✌️',
    '✌️',
    '😎',
    '😎',
    '😊',
    '😊',
    '👀',
    '👀',
  ];
  const shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));
  for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = shuffleEmojis[i];

    box.onclick = function () {
      box.classList.add('boxOpen');

      setTimeout(() => {
        if (document.querySelectorAll('.boxOpen').length > 1) {
          if (
            document.querySelectorAll('.boxOpen')[0].innerHTML ==
            document.querySelectorAll('.boxOpen')[1].innerHTML
          ) {
            document.querySelectorAll('.boxOpen')[0].classList.add('boxMatch');
            document.querySelectorAll('.boxOpen')[1].classList.add('boxMatch');

            document
              .querySelectorAll('.boxOpen')[1]
              .classList.remove('boxOpen');
            document
              .querySelectorAll('.boxOpen')[0]
              .classList.remove('boxOpen');

            if (document.querySelectorAll('.boxOpen').length == emojis.length) {
              alert('win');
            }
          } else {
            document
              .querySelectorAll('.boxOpen')[1]
              .classList.remove('boxOpen');
            document
              .querySelectorAll('.boxOpen')[0]
              .classList.remove('boxOpen');
          }
        }
      }, 500);
    };

    document.querySelector('.game__memory')?.appendChild(box);
  }
  // *** End of CSS Art Memory Game ***
}
