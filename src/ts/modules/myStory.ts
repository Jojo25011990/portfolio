import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function myStory() {
  console.log('Dragon');

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

  const [myStoryManBubbles01, myStoryManBubbles02] = myStoryManBubbles;
  const [myStoryWomanBubbles01, myStoryWomanBubbles02] = myStoryWomanBubbles;

  console.log(myStoryWomanBubbles);

  const dragonTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: myStory,
      start: 'top center',
      toggleActions: 'play none none none',
    },
  });

  dragonTimeline.to(myStoryDragonRoar, {
    delay: 3,

    onStart: () => {
      myStoryDragonRoar?.play();
    },
  });

  dragonTimeline.to(myStoryContainer, {
    delay: 2,
    x: '+=7',
    repeat: 7,
    yoyo: true,
    duration: 0.06,
  });

  dragonTimeline.add(() => myStoryDragon?.classList.add('active'));

  dragonTimeline
    .add(() => {
      myStoryManBubbles01.classList.add('active');
      myStoryMan?.classList.add('active');
    }, '+=0.4')
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
    }, '+=1.2');

  dragonTimeline.add(() => {
    myStoryDragon?.addEventListener('animationend', () => {
      dragonTimeline
        .add(() => {
          myStoryManBubbles02.classList.add('active');
          myStoryMan?.classList.add('active');
        }, '+=0.5')
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
        }, '+=1.2');
    });
  });
}
