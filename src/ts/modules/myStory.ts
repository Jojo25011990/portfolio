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

  const gsapDragon = gsap.timeline();
  const gsapBeforeDragon = gsap.timeline();
  const gsapAfterDragon = gsap.timeline();

  gsapDragon
    .to(myStory, {
      scrollTrigger: {
        trigger: myStory,
        start: 'top 10%',
        toggleActions: 'play none none none',
        markers: true,
      },

      //   duration: 1,
      //   ease: 'power3',
      //   repeat: 2,

      //   keyframes: [
      //     { x: '-7px' },
      //     { x: '7px' },
      //     { x: '-7px' },
      //     { x: '7px' },
      //     { x: '-7px' },
      //   ],

      //   onStart: () => {

      //     gsapBeforeDragon.add(() => {
      //       myStory?.classList.add('active');
      //       console.log('ide to');
      //     }, '-=3');
      //   },

      //   duration: 0.1,
      //   repeat: 5,
      //   yoyo: true,
      //   x: 7,

      //   onComplete: () => {
      //     myStoryDragon?.classList.add('active');

      //     myStoryDragon?.addEventListener('animationstart', () => {
      //       gsapBeforeDragon
      //         .add(() => {
      //           myStoryManBubbles01.classList.add('active');
      //           myStoryMan?.classList.add('active');
      //         }, '+=.8')
      //         .add(() => {
      //           myStoryManBubbles01.classList.remove('active');
      //           myStoryMan?.classList.remove('active');
      //         }, '+=1.2')
      //         .add(() => {
      //           myStoryWomanBubbles01.classList.add('active');
      //           myStoryWoman?.classList.add('active');
      //         })
      //         .add(() => {
      //           myStoryWomanBubbles01.classList.remove('active');
      //           myStoryWoman?.classList.remove('active');
      //         }, '+=1.2');
      //     });
      //   },
    })
    .add(() => {
      myStoryContainer?.classList.add('active');
    })
    .add(() => {
      myStoryDragon?.classList.add('active');
      myStoryDragon?.addEventListener('animationstart', () => {
        gsapBeforeDragon
          .add(() => {
            myStoryManBubbles01.classList.add('active');
            myStoryMan?.classList.add('active');
          }, '+=.8')
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
      });
    })
    .add(() => {
      myStoryDragon?.addEventListener('animationend', () => {
        console.log('uz si skoncil?');
        gsapAfterDragon
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
            myStoryMan?.classList.add('active');
          })
          .add(() => {
            myStoryWomanBubbles02.classList.remove('active');
            myStoryMan?.classList.remove('active');
          }, '+=1.2');
      });
    });
}
