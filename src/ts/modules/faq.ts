import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function faq() {
  const faqTitle = document.querySelector<HTMLHeadingElement>('.faq__title');
  const faqTitleSpan =
    document.querySelector<HTMLSpanElement>('.faq__title-span');

  const faqDescription =
    document.querySelector<HTMLParagraphElement>('.faq__description');

  const faqItems = document.querySelectorAll<HTMLLIElement>('.faq__item');

  let faqTimeout: ReturnType<typeof setTimeout> | null = null;

  if (faqTitle) {
    gsap.to(faqTitle, {
      scrollTrigger: {
        trigger: faqTitle,
        start: 'top 70%',
      },

      onStart: () => {
        faqTitleSpan?.classList.add('active');
      },
    });
  }

  if (faqDescription) {
    gsap.to(faqDescription, {
      scrollTrigger: {
        trigger: faqDescription,
        start: 'top center',
      },

      duration: 2,
      text: 'Curious how I work and create? Here are some quick answers.',
      ease: 'none',
    });
  }

  if (faqItems) {
    faqItems.forEach((faqItem, index: number) => {
      gsap.from(faqItem, {
        delay: index * 0.15,
        y: 100,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power2.out',

        scrollTrigger: {
          trigger: faqItem,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  // *** FAQ - Accordion ***
  faqItems.forEach(oneFaqItem => {
    const faqQuestion = oneFaqItem.querySelector('.faq__item-question');

    faqQuestion?.addEventListener('click', () => {
      const isActive = oneFaqItem.classList.toggle('active');
      faqQuestion.setAttribute('aria-expanded', isActive ? 'true' : 'false');

      const faqAnswerId = faqQuestion.getAttribute('aria-controls');
      const faqAnswer = faqAnswerId
        ? document.getElementById(faqAnswerId)
        : null;

      if (faqAnswer) {
        if (isActive) {
          if (faqTimeout) clearTimeout(faqTimeout);

          faqAnswer.removeAttribute('hidden');
        } else {
          faqTimeout = setTimeout(() => {
            faqAnswer.setAttribute('hidden', '');
          }, 360);
        }
      }
    });
  });
  // *** End of FAQ - Accordion ***
}
