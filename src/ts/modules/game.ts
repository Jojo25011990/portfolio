import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function game() {
  const game = document.querySelector<HTMLUListElement>('.game__memory');
  const gameBoxes =
    document.querySelectorAll<HTMLLIElement>('.game__memory-box');
  const newGameBoxes = Array.from(gameBoxes);
  const resetGameButton = document.querySelector<HTMLButtonElement>(
    '.game__container-button',
  );

  // *** CSS Art Memory Game ***

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
  newGameBoxes.forEach((newGameBox, index) => {
    const game = function () {
      newGameBox.classList.add('boxOpen');

      const gameBoxDelay = 750;

      setTimeout(() => {
        if (newGameBox.classList.contains('boxOpen')) {
        }
      }, gameBoxDelay);
    };

    newGameBox.addEventListener('click', game);
  });
  // *** End of Core Game ***

  // *** Reset Game ***
  function resetGame() {
    newGameBoxes.forEach(newGameBox => {
      newGameBox.classList.remove('boxOpen');
    });
  }

  resetGameButton?.addEventListener('click', resetGame);
  resetGameButton?.addEventListener('click', shuffleGameBoxes);
  // *** End of Reset Game ***

  //   for (let i = 0; i < emojis.length; i++) {
  //     let box = document.createElement('div');
  //     box.className = 'game__memory-box';
  //     box.innerHTML = shuffleEmojis[i];

  //     box.onclick = function () {
  //       box.classList.add('boxOpen');

  //       setTimeout(() => {
  //         if (document.querySelectorAll('.boxOpen').length > 1) {
  //           if (
  //             document.querySelectorAll('.boxOpen')[0].innerHTML ==
  //             document.querySelectorAll('.boxOpen')[1].innerHTML
  //           ) {
  //             document.querySelectorAll('.boxOpen')[0].classList.add('boxMatch');
  //             document.querySelectorAll('.boxOpen')[1].classList.add('boxMatch');

  //             document
  //               .querySelectorAll('.boxOpen')[1]
  //               .classList.remove('boxOpen');
  //             document
  //               .querySelectorAll('.boxOpen')[0]
  //               .classList.remove('boxOpen');

  //             if (document.querySelectorAll('.boxOpen').length == emojis.length) {
  //               alert('win');
  //             }
  //           } else {
  //             document
  //               .querySelectorAll('.boxOpen')[1]
  //               .classList.remove('boxOpen');
  //             document
  //               .querySelectorAll('.boxOpen')[0]
  //               .classList.remove('boxOpen');
  //           }
  //         }
  //       }, 500);
  //     };

  //     document.querySelector('.game__memory')?.appendChild(box);
  //   }
  // *** End of CSS Art Memory Game ***
}
