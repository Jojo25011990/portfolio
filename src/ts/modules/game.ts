import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function game() {
  // *** Bomberman ***
  const bomberman = document.querySelector<HTMLDivElement>('.game__bomberman');
  // *** End of Bomberman ***

  // *** CSS Art Memory Game ***

  const game = document.querySelector<HTMLUListElement>('.game__memory');
  const gameBoxes =
    document.querySelectorAll<HTMLLIElement>('.game__memory-box');
  const newGameBoxes = Array.from(gameBoxes);
  const resetGameButton = document.querySelector<HTMLButtonElement>(
    '.game__container-button',
  );

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
    newGameBoxes.forEach(newGameBox => {
      newGameBox.classList.remove('boxOpen');
      newGameBox.classList.remove('boxMatch');
    });
  }

  resetGameButton?.addEventListener('click', resetGame);
  resetGameButton?.addEventListener('click', shuffleGameBoxes);
  // *** End of Reset Game ***
}
