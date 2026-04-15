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
}
