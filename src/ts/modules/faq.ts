export default function faq() {
  // *** Select Element | Initialize Timeout ( state ) ***
  const faqItems = document.querySelectorAll<HTMLLIElement>('.faq__item');

  let faqTimeout: ReturnType<typeof setTimeout> | null = null;
  // *** End of Select Element | Initialize Timeout ( state ) ***

  // *** FAQ - Accordion ***
  faqItems.forEach(oneFaqItem => {
    const faqQuestion = oneFaqItem.querySelector('.faq__item-question');

    faqQuestion?.addEventListener('click', () => {
      const isActive = oneFaqItem.classList.toggle('active');

      faqQuestion.setAttribute('aria-expanded', isActive ? 'true' : 'false');

      const faqAnswerId = faqQuestion.getAttribute('aria-controls');
      const faqAnswerIdDelay = 360;

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
          }, faqAnswerIdDelay);
        }
      }
    });
  });
  // *** End of FAQ - Accordion ***
}
