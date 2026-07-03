export default function features() {
  // *** Select Elements | Initialize speed + index | normalize ( Array.from ) ***
  const featuresMenu =
    document.querySelector<HTMLUListElement>('.features__menu');
  const featuresItems =
    document.querySelectorAll<HTMLLIElement>('.features__item');

  const featuresItemsIcon = document.querySelectorAll<HTMLElement>(
    '.features__item-icon',
  );
  const featuresFunFacts = document.querySelector<HTMLElement>(
    '.features__fun-facts',
  );
  const featuresFunFactsButton = document.querySelector<HTMLButtonElement>(
    '.features__fun-facts-button',
  );
  const featuresFunFactsCloseButton = document.querySelector<HTMLButtonElement>(
    '.features__fun-facts-closebtn',
  );

  const newFeaturesItemsIcon = Array.from(featuresItemsIcon);

  const randomSpeed = 2000;
  let previousItemIndex: number | null = null;
  // *** End of Select Elements | Initialize speed + index | normalize ( Array.from ) ***

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

  // *** Open Modal | Classes | Aria Attr | Focus | Event Listeners ***
  const openFunFactsModal = () => {
    featuresFunFacts?.classList.add('active');
    featuresMenu?.classList.add('active');

    featuresFunFacts?.setAttribute('aria-hidden', 'false');
    featuresFunFactsButton?.setAttribute('aria-expanded', 'true');

    featuresFunFactsCloseButton?.focus();

    document.addEventListener('keydown', funFactsEscapeKey);
  };
  // *** End of Open Modal | Classes | Aria Attr | Focus | Event Listeners ***

  // *** Close Modal | Classes | Aria Attr | Focus
  const closeFunFactsModal = () => {
    featuresFunFacts?.classList.remove('active');
    featuresMenu?.classList.remove('active');

    featuresFunFacts?.setAttribute('aria-hidden', 'true');
    featuresFunFactsButton?.setAttribute('aria-expanded', 'false');

    featuresFunFactsButton?.focus();

    document.removeEventListener('keydown', funFactsEscapeKey);
  };

  const funFactsEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeFunFactsModal();
  };

  featuresFunFactsButton?.addEventListener('click', openFunFactsModal);
  featuresFunFactsCloseButton?.addEventListener('click', closeFunFactsModal);
  // *** End of Fun Facts - ADD | REMOVE | FOCUS ***
}
