import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

import { bombermanDialogues } from '../../data/bomberman-dialogues';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function game() {
  console.log(bombermanDialogues.match);

  // *** Bomberman ***
  const bomberman = document.querySelector<HTMLDivElement>('.game__bomberman');
  const bombermanBubbleText = document.querySelector<HTMLDivElement>(
    '.game__bomberman-bubble-box',
  );
  const bombermanBoxMessages = document.querySelector('.game__bomberman-box');
  // *** End of Bomberman ***

  // *** CSS Art Memory Game ***
  const game = document.querySelector<HTMLUListElement>('.game__memory');
  const gameBoxes =
    document.querySelectorAll<HTMLLIElement>('.game__memory-box');
  const newGameBoxes = Array.from(gameBoxes);
  const resetGameButton = document.querySelector<HTMLButtonElement>(
    '.game__container-button',
  );

  const gameOverlay = document.querySelector<HTMLLIElement>(
    '.game__memory-overlay',
  );
  const gameOverlayLines = gameOverlay?.querySelectorAll('div');

  // *** Overlay | Lines - Animation ***
  const bombermanTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: gameOverlay,
      start: 'top center',
    },
  });

  bombermanTimeline
    .add(() => {
      bomberman?.classList.add('active');
    })
    .add(() => bombermanBubbleText?.classList.add('active'), '+=1')
    .add(() => bombermanBubbleText?.classList.remove('active'), '+=1')
    .add(() => {
      gameOverlay?.classList.add('active');

      gameOverlayLines?.forEach(gameOverlayLine =>
        gameOverlayLine.classList.add('active'),
      );
    }, '+=1.2');
  // *** End of Overlay | Lines - Animation ***

  // *** Bomberman Fake Message Box ***
  const bombermanFakeBoxMessages = () => {
    if (fakeCount >= fakeLimit) return;

    fakeCount++;

    bombermanBoxMessages?.classList.add('active');

    const bombermanMessage =
      bombermanBoxMessages?.lastElementChild as HTMLSpanElement;
    console.log(bombermanMessage);

    bombermanMessage.textContent = bombermanDialogues.fake[indexFakeMessages];

    indexFakeMessages++;

    const bombermanBoxMsgDelay = 1250;
    setTimeout(() => {
      bombermanBoxMessages?.classList.remove('active');
    }, bombermanBoxMsgDelay);
  };
  // *** End of Bomberman Fake Message Box ***

  // *** Bomberman Message Box ***
  const bombermanMessages = () => {
    if (matchCount % 2 === 0) {
      if (indexMessages >= bombermanDialogues.match.length) return;

      console.log('funguje');
      bombermanBoxMessages?.classList.add('active');

      const bombermanMessage =
        bombermanBoxMessages?.lastElementChild as HTMLSpanElement;
      console.log(bombermanMessage);

      bombermanMessage.textContent = bombermanDialogues.match[indexMessages];

      indexMessages++;

      const bombermanBoxMsgDelay = 1250;
      setTimeout(() => {
        bombermanBoxMessages?.classList.remove('active');
      }, bombermanBoxMsgDelay);
    }
  };
  // *** End of Bomberman Message Box ***

  // *** Shuffle Boxes ***
  // *** Very good source -> https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle ***

  const shuffleGameBoxes = function () {
    let currentIndex = newGameBoxes.length;
    console.log(currentIndex);

    while (currentIndex) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [newGameBoxes[currentIndex], newGameBoxes[randomIndex]] = [
        newGameBoxes[randomIndex],
        newGameBoxes[currentIndex],
      ];
    }

    newGameBoxes.forEach(newGameBox => game?.appendChild(newGameBox));
  };

  shuffleGameBoxes();
  // *** End of Shuffle Boxes ***

  // *** Core Game ***
  let firstBox: HTMLLIElement | null = null;
  let secondBox: HTMLLIElement | null = null;

  // *** Match Count | Fake Count | Fake Limit ***
  let matchCount: number = 0;
  let fakeCount: number = 0;
  let fakeLimit: number = 2;
  // *** End of Match Count | Fake Count | Fake Limit ***

  // *** Index Messages | indexFakeMessages ***
  let indexMessages: number = 0;
  let indexFakeMessages: number = 0;
  // *** End of Index Messages | indexFakeMessages ***

  // *** Reset State ***
  let lockBox = false;

  const resetState = function () {
    lockBox = false;
    firstBox = null;
    secondBox = null;
  };
  // *** End of Reset State ***

  // *** misMatch | ADD | REMOVE ***
  const misMatchBoxAdd = function (
    newGameBox01: HTMLLIElement,
    newGameBox02: HTMLLIElement,
  ) {
    newGameBox01?.classList.add('boxMisMatch');
    newGameBox02?.classList.add('boxMisMatch');
  };

  const misMatchBoxRemove = function (
    newGameBox01: HTMLLIElement,
    newGameBox02: HTMLLIElement,
  ) {
    newGameBox01?.classList.remove('boxMisMatch');
    newGameBox02?.classList.remove('boxMisMatch');
  };
  // *** End of misMatch | ADD | REMOVE ***

  const memeryGame = function (newGameBox: HTMLLIElement) {
    if (lockBox) return;

    // *** Bomberman - Cheating ***
    const isBomberman = newGameBox.dataset.box === 'bomberman';

    if (isBomberman && fakeCount <= fakeLimit) {
      lockBox = true;

      bombermanFakeBoxMessages();
      console.log('bomberman');

      newGameBox.classList.remove('boxOpen');

      setTimeout(() => {
        lockBox = false;
      }, 1300);

      return;
    }
    // *** End of Bomberman - Cheating ***

    newGameBox.classList.add('boxOpen');

    if (!firstBox) {
      firstBox = newGameBox;
      return;
    }

    secondBox = newGameBox;

    const firstBoxId = firstBox.dataset.box;
    const secondBoxId = secondBox.dataset.box;

    if (!firstBoxId || !secondBoxId) return;

    const isMatch = firstBoxId === secondBoxId;

    lockBox = true;

    if (isMatch) {
      firstBox?.classList.add('boxMatch');
      secondBox?.classList.add('boxMatch');

      matchCount++;

      bombermanMessages();

      resetState();
    } else {
      misMatchBoxAdd(firstBox, secondBox);

      const gameBoxDelay = 1050;

      setTimeout(() => {
        firstBox?.classList.remove('boxOpen');
        secondBox?.classList.remove('boxOpen');

        misMatchBoxRemove(firstBox!, secondBox!);

        resetState();
      }, gameBoxDelay);
    }
  };

  newGameBoxes.forEach(newGameBox => {
    newGameBox.addEventListener('click', () => memeryGame(newGameBox));
  });

  // *** End of Core Game ***

  // *** Reset Game ***
  function resetGame() {
    matchCount = 0;
    indexMessages = 0;

    newGameBoxes.forEach(newGameBox => {
      newGameBox.classList.remove('boxOpen');
      newGameBox.classList.remove('boxMatch');
    });
  }

  resetGameButton?.addEventListener('click', resetGame);
  resetGameButton?.addEventListener('click', shuffleGameBoxes);
  // *** End of Reset Game ***
}
