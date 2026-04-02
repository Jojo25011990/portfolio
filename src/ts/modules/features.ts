import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function features() {
  const featuresDescription = document.querySelector<HTMLParagraphElement>(
    '.features__description',
  );

  const featuresItems =
    document.querySelectorAll<HTMLLIElement>('.features__item');

  const featuresItemsIcon = document.querySelectorAll<HTMLElement>(
    '.features__item-icon',
  );
  const newFeaturesItemsIcon = Array.from(featuresItemsIcon);

  const randomSpeed = 2000;
  let previousItemIndex: number | null = null;

  if (featuresDescription) {
    gsap.to(featuresDescription, {
      scrollTrigger: {
        trigger: featuresDescription,
        start: 'top center',
      },

      duration: 2,
      text: 'Small details that make every project engaging, interactive, and memorable.',
      ease: 'none',
    });
  }

  if (featuresItems) {
    featuresItems.forEach((featuresItem, index: number) => {
      gsap.from(featuresItem, {
        delay: index * 0.15,
        y: 100,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'back.out',

        scrollTrigger: {
          trigger: featuresItem,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  setInterval(() => {
    let randomItemIndex: number;

    do {
      randomItemIndex = Math.trunc(Math.random() * featuresItems.length);
    } while (randomItemIndex === previousItemIndex);
    {
      newFeaturesItemsIcon.forEach((featuresItemIcon, index: number) => {
        if (randomItemIndex === index) {
          featuresItemIcon.classList.add('random-active');
        } else {
          featuresItemIcon.classList.remove('random-active');
        }
      });

      previousItemIndex = randomItemIndex;
    }
  }, randomSpeed);
}
