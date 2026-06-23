import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function game() {
  // *** User Agent | Firefox | Safari | Game Container | Fallback Message ***
  const gameContainer =
    document.querySelector<HTMLDivElement>('.game__container');
  const gameFallbackMessage = document.querySelector<HTMLParagraphElement>(
    '.game__fallback-message',
  );

  const userNavigatorAgent = navigator.userAgent;

  const isFirefox = userNavigatorAgent.includes('Firefox');

  const isSafari =
    userNavigatorAgent.includes('Safari') &&
    !userNavigatorAgent.includes('Chrome') &&
    !userNavigatorAgent.includes('Chromium') &&
    !userNavigatorAgent.includes('Edg') &&
    !userNavigatorAgent.includes('OPR');

  if (isFirefox || isSafari) {
    gameContainer?.classList.add('hide');
  } else {
    gameFallbackMessage?.classList.add('hide');
  }
  // *** End of User Agent | Firefox | Safari | Game Container | Fallback Message ***

  // *** CSS Art Memory Game - CHrome | Edge ***
  // *** Select Elements ***
  //   const game = document.querySelector<HTMLUListElement>('.game__memory');
  const game = document.querySelector<HTMLUListElement>('.game__memory');
  const gameBoxes =
    document.querySelectorAll<HTMLLIElement>('.game__memory-box');
  const newGameBoxes = Array.from(gameBoxes);
  const resetGameButton = document.querySelector<HTMLButtonElement>(
    '.game__container-button',
  );

  const gameOverlayWin =
    document.querySelector<HTMLLIElement>('.game__memory-win');

  const gameOverlay = document.querySelector<HTMLLIElement>(
    '.game__memory-overlay',
  );
  const gameOverlayLines = gameOverlay?.querySelectorAll<HTMLDivElement>('div');
  // *** End of Select Elements ***

  // *** First Box | Second Box | Match Count ***
  let firstBox: HTMLLIElement | null = null;
  let secondBox: HTMLLIElement | null = null;
  let matchCount: number = 0;
  // *** End of First Box | Second Box | Match Count ***

  // *** Reset State ***
  let lockBox = false;

  const resetState = function () {
    lockBox = false;
    firstBox = null;
    secondBox = null;
  };
  // *** End of Reset State ***

  // *** Overlay | Lines - Animation ***
  const gameOverlayTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: gameOverlay,
      start: 'top center',
    },
  });

  gameOverlayTimeline.add(() => {
    gameOverlay?.classList.add('active');

    gameOverlayLines?.forEach(gameOverlayLine =>
      gameOverlayLine.classList.add('active'),
    );
  }, '+=1.2');
  // *** End of Overlay | Lines - Animation ***

  // *** Shuffle Boxes ***
  // *** Very good source -> https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle ***

  const shuffleGameBoxes = function () {
    let currentIndex = newGameBoxes.length;

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

  // *** Memory Game Handle ***
  const handleMemoryGame = function (newGameBox: HTMLLIElement) {
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

    // *** Match | MisMatch State ***
    if (isMatch) {
      firstBox?.classList.add('boxMatch');
      secondBox?.classList.add('boxMatch');

      matchCount++;

      requestAnimationFrame(() => {
        firstBox?.classList.add('scale');
        secondBox?.classList.add('scale');
      });

      resetState();
    } else {
      misMatchBoxAdd(firstBox, secondBox);

      const gameBoxDelay = 1050;

      setTimeout(() => {
        firstBox?.classList.remove('boxOpen');
        secondBox?.classList.remove('boxOpen');

        misMatchBoxRemove(firstBox!, secondBox!);

        requestAnimationFrame(() => {
          firstBox?.classList.add('shake');
          secondBox?.classList.add('shake');
        });

        resetState();
      }, gameBoxDelay);
    }
    // *** End of Match | MisMatch State ***

    //  *** Win State ***
    if (matchCount === gameBoxes.length / 2) {
      const gameWinDelay = 2500;

      setTimeout(() => {
        gameOverlayWin?.classList.add('active');
      }, gameWinDelay);
    }
    //  *** End of Win State ***
  };
  // *** End of Memory Game Handle ***

  const memoryGame = function (newGameBox: HTMLLIElement) {
    if (lockBox) return;

    // *** Memory Game ***
    handleMemoryGame(newGameBox);
    // *** End Memory Game ***
  };

  newGameBoxes.forEach(newGameBox => {
    newGameBox.addEventListener('click', () => memoryGame(newGameBox));
  });

  // *** End of Core Game ***

  // *** Reset Game ***
  function resetGame() {
    matchCount = 0;

    gameOverlayWin?.classList.remove('active');

    newGameBoxes.forEach(newGameBox => {
      newGameBox.classList.remove('boxOpen');
      newGameBox.classList.remove('boxMatch');
    });
  }

  resetGameButton?.addEventListener('click', resetGame);
  resetGameButton?.addEventListener('click', shuffleGameBoxes);
  // *** End of Reset Game ***
  // *** End of CSS Art Memory Game - CHrome | Edge ***
}
