import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function features() {
  const featuresDescription = document.querySelector<HTMLParagraphElement>(
    '.features__description',
  );

  const featuresMenu =
    document.querySelector<HTMLUListElement>('.features__menu');
  const featuresItems =
    document.querySelectorAll<HTMLLIElement>('.features__item');

  const featuresItemsIcon = document.querySelectorAll<HTMLElement>(
    '.features__item-icon',
  );
  const newFeaturesItemsIcon = Array.from(featuresItemsIcon);

  const randomSpeed = 2000;
  let previousItemIndex: number | null = null;

  const featuresFunFacts = document.querySelector<HTMLElement>(
    '.features__fun-facts',
  );
  const featuresFunFactsButton = document.querySelector<HTMLButtonElement>(
    '.features__fun-facts-button',
  );

  // *** Main Description - Paragraph Tag ***
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
  // *** End of Main Description - Paragraph Tag ***

  // *** Features Eight Mini blocks ***
  if (featuresItems) {
    featuresItems.forEach((featuresItem, index: number) => {
      gsap.from(featuresItem, {
        delay: index * 0.15,
        y: 100,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power2.out',

        scrollTrigger: {
          trigger: featuresItem,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  // *** Version 02 ***
  //   if (featuresItems.length) {
  //     gsap.from(featuresItems, {
  //       scrollTrigger: {
  //         trigger: featuresItems[0],
  //         start: 'top 80%',
  //         toggleActions: 'play none none none',
  //       },

  //       stagger: 0.3,
  //       autoAlpha: 0,
  //       y: 100,
  //       duration: 1.5,
  //       ease: 'power2.out',
  //     });
  //   }
  // *** End of Version 02 ***

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
  // *** End of Features Eight Mini blocks ***

  // *** Fun Facts ***
  const funFactsSlideBox = () => featuresFunFacts?.classList.toggle('active');
  const funFactsContainer = () => featuresMenu?.classList.toggle('active');

  featuresFunFactsButton?.addEventListener('click', funFactsSlideBox);
  featuresFunFactsButton?.addEventListener('click', funFactsContainer);

  // *** End of Fun Facts ***
}
