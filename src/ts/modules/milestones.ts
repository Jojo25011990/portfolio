import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function milestones() {
  const milestonesDescription = document.querySelector<HTMLParagraphElement>(
    '.milestones__description',
  );

  const milestonesTitle =
    document.querySelector<HTMLHeadingElement>('.milestones__title');
  const milestonesTitleSpan = document.querySelector<HTMLSpanElement>(
    '.milestones__title-span',
  );

  if (milestonesTitle) {
    gsap.to(milestonesTitle, {
      scrollTrigger: {
        trigger: milestonesTitle,
        start: 'top 70%',
      },

      onStart: () => {
        milestonesTitleSpan?.classList.add('active');
      },
    });
  }

  if (milestonesDescription) {
    gsap.to(milestonesDescription, {
      scrollTrigger: {
        trigger: milestonesDescription,
        start: 'top center',
      },

      duration: 2.25,
      text: 'A collection of key milestones that shaped how I approach building interfaces, animations and frontend systems.',
      ease: 'none',
    });
  }

  const items = gsap.utils.toArray<HTMLElement>('.milestones__item');

  items.forEach((item, index) => {
    if (index < items.length - 1) {
      ScrollTrigger.create({
        trigger: item,
        start: 'top top',
        endTrigger: items[items.length - 1],
        end: 'top top',
        pin: true,
        pinSpacing: false,
        scrub: true,
      });
      ScrollTrigger.create({
        trigger: items[index + 1],
        start: 'center bottom',
        end: 'top top',
        onUpdate: self => {
          const progressCard = self.progress;
          gsap.set(item, {
            scale: 1 - progressCard * 0.5,
          });
        },
      });
    }
  });
}

//   let current = 0;
//   let target = 0;
//   let ease = 0.08;

//   function raf() {
//     target = window.scrollY;

//     current += (target - current) * ease;
//     items.forEach(item => {
//       item!.style.transform = `translateY(${-current}px)`;
//     });

//     requestAnimationFrame(raf);
//   }
//   raf();
