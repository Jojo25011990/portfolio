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
  // *** End of CSS Art Memory Game ***

  // *** First Box | Second Box | last Bomberman Box ***
  let firstBox: HTMLLIElement | null = null;
  let secondBox: HTMLLIElement | null = null;
  let lastBombermanBox: HTMLLIElement | null = null;
  // *** End of First Box | Second Box | last Bomberman Box ***

  // *** Match Count | Fake Count | Fake Repeat Count ***

  let matchCount: number = 0;
  let fakeCount: number = 0;
  let fakeRepeatCount: number = 0;

  // *** End of Match Count | Fake Count | Fake Repeat Count ***

  // *** Index Messages | indexFakeMessages | indexFakeRepeatMessages ***
  let indexMessages: number = 0;
  let indexFakeMessages: number = 0;
  let indexFakeRepeatMessages: number = 0;
  // *** End of Index Messages | indexFakeMessages | indexFakeRepeatMessages ***

  // *** Reset State ***
  let lockBox = false;

  const resetState = function () {
    lockBox = false;
    firstBox = null;
    secondBox = null;
  };
  // *** End of Reset State ***

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

  // *** Bomberman Heading Helper Function ***
  const bombermanHeadingHelper = (color: string) => {
    const bombermanHeading =
      bombermanBoxMessages?.firstElementChild as HTMLSpanElement;
    bombermanHeading.style.color = color;

    // *** Match State ***
    // $yellow-primary: #f4d35e;
    // *** End of Match State ***

    // *** Fake | Cheating State ***
    // $danger-primary: #ff6f5b;
    // *** End of Fake | Cheating State ***

    // *** Win State ***
    // $success-primary: #4ee1a0;
    // *** End of Win State ***
  };
  // *** End of Bomberman Heading Helper Function ***

  // *** Box Messages Delay Helper ***
  const boxMessagesDelayHelper = () => {
    const bombermanBoxMsgDelay = 1250;
    setTimeout(() => {
      bombermanBoxMessages?.classList.remove('active');
    }, bombermanBoxMsgDelay);
  };
  // *** End of Box Messages Delay Helper ***

  // *** Bomberman Message Box ***
  const bombermanMessages = () => {
    if (matchCount % 2 === 0) {
      if (indexMessages >= bombermanDialogues.match.length) return;

      bombermanBoxMessages?.classList.add('active');

      const bombermanMessage =
        bombermanBoxMessages?.lastElementChild as HTMLSpanElement;
      bombermanMessage.textContent = bombermanDialogues.match[indexMessages];

      bombermanHeadingHelper('#f4d35e');

      indexMessages++;

      boxMessagesDelayHelper();
    }
  };
  // *** End of Bomberman Message Box ***

  // *** Bomberman Fake Message Box ***
  const bombermanFakeBoxMessages = () => {
    bombermanBoxMessages?.classList.add('active');

    const bombermanMessage =
      bombermanBoxMessages?.lastElementChild as HTMLSpanElement;

    bombermanMessage.textContent = bombermanDialogues.fake[indexFakeMessages];

    bombermanHeadingHelper('#ff6f5b');

    indexFakeMessages++;

    boxMessagesDelayHelper();
  };
  // *** End of Bomberman Fake Message Box ***

  // *** Bomberman FakeRepeat Message Box ***
  const bombermanFakeRepeatMessages = () => {
    bombermanBoxMessages?.classList.add('active');

    const bombermanMessage =
      bombermanBoxMessages?.lastElementChild as HTMLSpanElement;

    bombermanMessage.textContent =
      bombermanDialogues.fakeRepeat[indexFakeRepeatMessages];

    bombermanHeadingHelper('#ff6f5b');

    indexFakeRepeatMessages++;

    boxMessagesDelayHelper();
  };
  // *** End of Bomberman FakeRepeat Message Box ***

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

  // *** Bomberman Handle ***

  let bombermanState: 'normal' | 'dialogue' = 'normal';
  let fakeIndex = 0;
  const handleBomberman = (box: HTMLLIElement) => {
    // const isFakeClickAllowed = bombermanState !== 'fakeRepeat';

    // if (!isFakeClickAllowed) {
    //   return false; // už skončila fake sekvencia
    // }

    // prepis to do switchu
    box.classList.add('boxFake');
    box.classList.remove('boxOpen');

    const isStart = bombermanState === 'normal';

    if (isStart) {
      bombermanState = 'dialogue';
      bombermanFakeBoxMessages();
      fakeIndex = 1;
    } else if (fakeIndex === 1) {
      bombermanState = 'dialogue';
      bombermanFakeRepeatMessages();
      fakeIndex = 2;
    } else if (fakeIndex === 2) {
      bombermanFakeBoxMessages();
      bombermanState = 'dialogue';
      fakeIndex = 3;
    } else if (fakeIndex === 3) {
      bombermanState = 'dialogue';
      bombermanFakeRepeatMessages();
      fakeIndex = 4;
    } else {
      bombermanState = 'normal';
      fakeIndex = 0;
      box.classList.add('boxOpen');
      return;
    }

    setTimeout(() => {
      box.classList.remove('boxFake');
    }, 1000);

    return true;
  };

  // *** End of Bomberman Handle ***

  // *** Memory Game Handle ***
  const handleMemoryGame = function (newGameBox: HTMLLIElement) {
    console.log('CLICK EVENT');
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
  };
  // *** End of Memory Game Handle ***

  const memoryGame = function (newGameBox: HTMLLIElement) {
    if (lockBox) return;

    // *** Bomberman - Cheating ***
    const isBomberman = newGameBox.dataset.box === 'bomberman';

    if (isBomberman) {
      //   if (lastBombermanBox === newGameBox) {
      //     bombermanRepeatCount++;
      //   } else {
      //     bombermanRepeatCount = 0;
      //   }

      //   lastBombermanBox = newGameBox;

      //   const blocked = handleBomberman(newGameBox, bombermanRepeatCount);
      const blocked = handleBomberman(newGameBox);
      if (blocked) return;
    }
    // *** End of Bomberman - Cheating ***

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
    bombermanState = 'normal';
    matchCount = 0;
    fakeCount = 0;

    indexMessages = 0;
    indexFakeMessages = 0;
    indexFakeRepeatMessages = 0;

    newGameBoxes.forEach(newGameBox => {
      newGameBox.classList.remove('boxOpen');
      newGameBox.classList.remove('boxMatch');
      newGameBox.classList.remove('boxFake');
    });
  }

  resetGameButton?.addEventListener('click', resetGame);
  resetGameButton?.addEventListener('click', shuffleGameBoxes);
  // *** End of Reset Game ***
}
