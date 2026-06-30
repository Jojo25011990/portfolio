import gsap from 'gsap';
import { startMyProcess } from './myProcess';

export default function myStory() {
  // *** Select Elements ***
  const myProcessSlider = document.querySelector<HTMLDivElement>(
    '.my-process__slider',
  );

  const myStory = document.querySelector<HTMLElement>('.my-story');

  const myStoryContainer = document.querySelector<HTMLDivElement>(
    '.my-story__container',
  );

  const myStoryDragon =
    document.querySelector<HTMLDivElement>('.my-story__dragon');
  const myStoryDragonRoar = document.querySelector<HTMLAudioElement>(
    '.my-story__dragon-roar',
  );

  const myStoryWoman = document.querySelector<HTMLDivElement>(
    '.my-story__character-img-woman',
  );
  const myStoryMan = document.querySelector<HTMLImageElement>(
    '.my-story__character-img-man',
  );

  const myStoryWomanBubbles = document.querySelectorAll<HTMLDivElement>(
    '.my-story__character-bubble-woman',
  );
  const myStoryManBubbles = document.querySelectorAll<HTMLDivElement>(
    '.my-story__character-bubble-man',
  );

  const myStoryManRock = document.querySelector<HTMLImageElement>(
    '.my-story__character-img-rock-man',
  );
  const myStoryWomanRock = document.querySelector<HTMLImageElement>(
    '.my-story__character-img-rock-woman',
  );
  // *** End of Select Elements ***

  // *** Destructuring Man | Woman Bubbles ***
  const [myStoryManBubbles01, myStoryManBubbles02] = myStoryManBubbles;
  const [myStoryWomanBubbles01, myStoryWomanBubbles02] = myStoryWomanBubbles;
  // *** End of Destructuring Man | Woman Bubbles ***

  // *** Functionality ***
  const dragonTimeline = gsap.timeline().pause();

  // *** Roar | Shake Container | Dragon ***
  dragonTimeline
    .to(myStoryDragonRoar, {
      delay: 2,

      onStart: () => {
        myStoryDragonRoar?.play();
      },
    })
    .play();

  dragonTimeline
    .to(myStoryContainer, {
      delay: 0.1,
      x: '+=7',
      y: '+=7',
      repeat: 20,
      yoyo: true,
      duration: 0.06,
    })
    .to(myStoryContainer, {
      x: '0',
      y: '0',
      duration: 0.06,
    });

  dragonTimeline.add(() => myStoryDragon?.classList.add('active'));
  // *** End of Roar | Shake Container | Dragon ***

  // *** Phase 01 ***
  dragonTimeline
    .add(() => {
      myStoryManBubbles01.classList.add('active');
      myStoryMan?.classList.add('active');
    }, '+=0.1')
    .add(() => {
      myStoryManBubbles01.classList.remove('active');
      myStoryMan?.classList.remove('active');
    }, '+=1.2')
    .add(() => {
      myStoryWomanBubbles01.classList.add('active');
      myStoryWoman?.classList.add('active');
    })
    .add(() => {
      myStoryWomanBubbles01.classList.remove('active');
      myStoryWoman?.classList.remove('active');
    }, '+=1.2')
    .add(() => {
      myStoryMan?.classList.add('hide');
      myStoryWoman?.classList.add('hide');
    }, '+=0.5')
    .add(() => {
      myStoryManRock?.classList.add('active');
      myStoryWomanRock?.classList.add('active');
    }, '+=0.1');
  // *** End of Phase 01 ***

  // *** Phase 02 ***
  dragonTimeline.add(() => {
    myStoryDragon?.addEventListener(
      'animationend',
      () => {
        dragonTimeline
          .add(() => {
            myStoryManRock?.classList.remove('active');
            myStoryWomanRock?.classList.remove('active');
          })
          .add(() => {
            myStoryMan?.classList.remove('hide');
            myStoryWoman?.classList.remove('hide');
          }, '+=0.3')
          .add(() => {
            myStoryManBubbles02.classList.add('active');
            myStoryMan?.classList.add('active');
          }, '+=0.6')
          .add(() => {
            myStoryManBubbles02.classList.remove('active');
            myStoryMan?.classList.remove('active');
          }, '+=1.2')
          .add(() => {
            myStoryWomanBubbles02.classList.add('active');
            myStoryWoman?.classList.add('active');
          })
          .add(() => {
            myStoryWomanBubbles02.classList.remove('active');
            myStoryWoman?.classList.remove('active');
          }, '+=1.2')
          .add(() => {
            myStory?.classList.add('active');
            setTimeout(() => {
              if (myStory) myStory.style.display = 'none';
            }, 1250);
          }, '+=2')
          .add(() => {
            startMyProcess();
          }, '+=1.5')
          .add(() => myProcessSlider?.classList.remove('active'), '+=2');
      },
      { once: true },
      // *** End of Phase 02 ***
    );
  });
  // *** End of Functionality ***

  return dragonTimeline;
}
