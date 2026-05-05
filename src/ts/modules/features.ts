import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function features() {
  const featuresTitle =
    document.querySelector<HTMLHeadingElement>('.features__title');
  const featuresTitleSpan = document.querySelector<HTMLSpanElement>(
    '.features__title-span',
  );
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

  const featuresFunFactsCloseButton = document.querySelector<HTMLButtonElement>(
    '.features__fun-facts-closebtn',
  );

  if (featuresTitle) {
    gsap.to(featuresTitle, {
      scrollTrigger: {
        trigger: featuresTitle,
        start: 'top center',
      },

      onStart: () => {
        featuresTitleSpan?.classList.add('active');
      },
    });
  }

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

  // *** Features Eight Mini Blocks ***
  if (featuresItems.length) {
    gsap.from(featuresItems, {
      scrollTrigger: {
        trigger: featuresItems[0],
        start: 'top center',
      },

      stagger: 0.3,
      autoAlpha: 0,
      y: 100,
      duration: 1,
      ease: 'power2.out',
    });
  }
  // *** End of Features Eight Mini Blocks ***

  // *** Features Eight Mini blocks - Version 02 ***
  //   if (featuresItems) {
  //     featuresItems.forEach((featuresItem, index: number) => {
  //       gsap.from(featuresItem, {
  //         delay: index * 0.15,
  //         y: 100,
  //         autoAlpha: 0,
  //         duration: 0.6,
  //         ease: 'power2.out',

  //         scrollTrigger: {
  //           trigger: featuresItem,
  //           start: 'top 80%',
  //           toggleActions: 'play none none none',
  //         },
  //       });
  //     });
  //   }
  // *** End of Features Eight Mini blocks - Version 02 ***

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

  // *** Random Animation Icon ***
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
  // *** End of Random Animation Icon ***
  // *** End of Features Eight Mini blocks ***

  // *** Focus Modal Trap ***
  const focusFunFactsModalTrap = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    const focusableElements = Array.from(
      featuresFunFacts?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    );

    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const currentIndex = focusableElements.indexOf(
      document.activeElement as HTMLElement,
    );

    if (event.shiftKey) {
      if (currentIndex <= 0) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (
        currentIndex === focusableElements.length - 1 ||
        currentIndex === -1
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };
  // *** End of Focus Modal Trap ***

  // *** Fun Facts - ADD | REMOVE | FOCUS ***
  const openFunFactsModal = () => {
    featuresFunFacts?.classList.add('active');
    featuresMenu?.classList.add('active');

    featuresFunFacts?.setAttribute('aria-hidden', 'false');
    featuresFunFactsButton?.setAttribute('aria-expanded', 'true');

    featuresFunFactsCloseButton?.focus();

    document.addEventListener('keydown', funFactsEscapeKey);
    document.addEventListener('keydown', focusFunFactsModalTrap);
  };

  const closeFunFactsModal = () => {
    featuresFunFacts?.classList.remove('active');
    featuresMenu?.classList.remove('active');

    featuresFunFacts?.setAttribute('aria-hidden', 'true');
    featuresFunFactsButton?.setAttribute('aria-expanded', 'false');

    featuresFunFactsButton?.focus();

    document.removeEventListener('keydown', funFactsEscapeKey);
    document.addEventListener('keydown', focusFunFactsModalTrap);
  };

  const funFactsEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeFunFactsModal();
  };

  featuresFunFactsButton?.addEventListener('click', openFunFactsModal);
  featuresFunFactsCloseButton?.addEventListener('click', closeFunFactsModal);
  // *** End of Fun Facts - ADD | REMOVE | FOCUS ***
}
