import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import envelope from './envelope';

gsap.registerPlugin(ScrollTrigger);
export default function footer() {
  const footer = document.querySelector<HTMLElement>('.footer');

  const footerTitle =
    document.querySelector<HTMLHeadingElement>('.footer__title');
  const footerTitleSpan = document.querySelector<HTMLSpanElement>(
    '.footer__title-span',
  );

  const footerNavigationLine = document.querySelector<HTMLSpanElement>(
    '.footer__navigation-line',
  );

  const footerLogo = document.querySelector<HTMLAnchorElement>('.footer__logo');

  const overlay = document.querySelector<HTMLDivElement>('.footer__overlay');

  const footerEnvelopeHeart = document.querySelector<HTMLDivElement>(
    '.footer__envelope-heart',
  );

  if (footerTitle) {
    gsap.to(footerTitle, {
      scrollTrigger: {
        trigger: footerTitle,
        start: 'top center',
      },

      onStart: () => {
        footerTitleSpan?.classList.add('active');
      },
    });
  }

  if (footer) {
    gsap.to(footer, {
      scrollTrigger: {
        trigger: footer,
        start: '70% 85%',
      },

      onStart: () => {
        footerLogo?.classList.add('active');
        footerNavigationLine?.classList.add('active');
      },
    });
  }

  // *** Form ***

  // *** Version - Typing instead querySelector<HTMLInputElement> ***

  // *** Form | Inputs | Textarea ***
  const form = document.getElementById('form') as HTMLFormElement | null;

  const formInputName = document.getElementById(
    'name',
  ) as HTMLInputElement | null;
  const formInputEmail = document.getElementById(
    'email',
  ) as HTMLInputElement | null;
  const formTextarea = document.getElementById(
    'message',
  ) as HTMLTextAreaElement | null;
  // *** End of Form | Inputs | Textarea ***

  // *** Error Message && Error Lines | Success Lines***
  const formErrorMessages =
    document.querySelectorAll<HTMLParagraphElement>('.error-message');
  const formErrorMessageLines = document.querySelectorAll<HTMLSpanElement>(
    '.footer__form-message-line--error',
  );

  const formSuccessMessageLines = document.querySelectorAll<HTMLSpanElement>(
    '.footer__form-message-line--success',
  );
  // *** End of Error Message && Error Lines | Success Lines***

  formInputName?.value;

  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      const isInputsValid = checkInputValues([
        formInputName,
        formInputEmail,
        formTextarea,
      ]);

      if (isInputsValid) {
        setTimeout(() => {
          overlay?.classList.add('active');
          footerEnvelopeHeart?.classList.add('initial-state');
          envelope();

          setTimeout(() => {
            footerEnvelopeHeart?.classList.add('active');
          }, 250);
        }, 1000);
      }

      console.log(event);
    });
  }

  function checkInputValues(
    inputArray: (HTMLInputElement | HTMLTextAreaElement | null)[],
  ) {
    let isInputValid: boolean = true;

    inputArray.forEach((oneInput, index) => {
      // *** Guard - Prevented non-existent inputs ***
      if (!oneInput) return;
      const inputElementValue = oneInput.value.trim().toLowerCase();
      // *** End of Guard - Prevented non-existent inputs ***

      console.log(index, oneInput.id);

      // *** Without GUARD - oneInput! -> non assertion ts syntax, when inputs are READY in the DOM ***

      //   const inputElement = oneInput!.value.trim().toLowerCase();

      // *** End of Without GUARD - oneInput! -> non assertion ts syntax, when inputs are READY in the DOM ***

      //  *** Error Messages | Lines ***
      const addErrorMessages = function (index: number) {
        formErrorMessages[index].classList.add('active');
        formErrorMessageLines[index].classList.add('active');
      };

      const removeErrorMessages = function (index: number) {
        formErrorMessages[index].classList.remove('active');
        formErrorMessageLines[index].classList.remove('active');
      };
      //  *** End of Error Messages | Lines ***

      //  *** Success Lines | Delay ***
      const addSuccesLines = (index: number) =>
        formSuccessMessageLines[index].classList.add('active');

      const removeSuccesLines = (index: number) =>
        formSuccessMessageLines[index].classList.remove('active');

      const removeSuccessDelay = 1500;
      //  *** End of Success Lines | Delay ***

      const inputElementEmailRegex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;

      if (index === 0) {
        // *** Full Name ***
        if (inputElementValue === '') {
          isInputValid = false;
          addErrorMessages(index);
        } else {
          removeErrorMessages(index);

          addSuccesLines(index);

          setTimeout(() => {
            removeSuccesLines(index);
          }, removeSuccessDelay);

          setTimeout(() => {
            oneInput.focus();
          }, removeSuccessDelay + 250);
        }
        // *** End of Full Name ***
      } else if (index === 1) {
        // *** Email ***
        if (
          inputElementValue === '' ||
          !inputElementEmailRegex.test(inputElementValue)
        ) {
          isInputValid = false;
          addErrorMessages(index);
        } else {
          removeErrorMessages(index);

          addSuccesLines(index);

          setTimeout(() => {
            removeSuccesLines(index);
          }, removeSuccessDelay);

          setTimeout(() => {
            oneInput.focus();
          }, removeSuccessDelay + 250);
        }
        // *** End of Email ***
      } else if (index === 2) {
        //  *** Textarea ***
        if (inputElementValue === '') {
          isInputValid = false;
          addErrorMessages(index);
        } else {
          removeErrorMessages(index);
          addSuccesLines(index);

          setTimeout(() => {
            removeSuccesLines(index);
          }, removeSuccessDelay);

          setTimeout(() => {
            oneInput.focus();
          }, removeSuccessDelay + 250);
        }
        //  *** End of Textarea ***
      }
    });
    return isInputValid;
  }

  // *** End of Form ***
}
