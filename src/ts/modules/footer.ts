import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
// import focusModalTrap from './focusModalTrap';
// import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

export default function footer() {
  // *** Footer - General ***
  const footer = document.querySelector<HTMLElement>('.footer');

  const footerNavigationLine = document.querySelector<HTMLSpanElement>(
    '.footer__navigation-line',
  );

  const footerLogo = document.querySelector<HTMLAnchorElement>('.footer__logo');

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
  // *** End of Footer - General ***

  // *** Envelope ***
  const footerEnvelopeButton = document.querySelector<HTMLButtonElement>(
    '.footer__envelope-button',
  );
  const footerEnvelopeHeart = document.querySelector<HTMLDivElement>(
    '.footer__envelope-heart',
  );
  const footerEnvelopeLetter = document.querySelector<HTMLElement>(
    '.footer__envelope-letter',
  );
  const footerEnvelopeTopSide = document.querySelector<HTMLDivElement>(
    '.footer__envelope-top-side',
  );

  // *** Add | Remove - Classes ***
  const addClasses = function () {
    footerEnvelopeHeart?.classList.add('is-open');
    footerEnvelopeLetter?.classList.add('is-open');
    footerEnvelopeTopSide?.classList.add('is-open');
  };

  const removeClasses = function () {
    footerEnvelopeHeart?.classList.remove('is-open');
    footerEnvelopeLetter?.classList.remove('is-open');
    footerEnvelopeTopSide?.classList.remove('is-open');
    footerEnvelopeHeart?.classList.remove('active');
  };
  // *** End of Add | Remove - Classes ***

  // *** Envelope Button Listener | Heart Remove Class | Add Classes Function ***
  footerEnvelopeButton?.addEventListener('click', () => {
    footerEnvelopeHeart?.classList.remove('initial-state');

    addClasses();
  });
  // *** End of Envelope Button Listener | Heart Remove Class | Add Classes Function ***

  // *** Overlay ***
  const footerOverlay =
    document.querySelector<HTMLDivElement>('.footer__overlay');
  const footerOverlayCloseButton = document.querySelector<HTMLButtonElement>(
    '.footer__overlay-closebtn',
  );

  // *** Focus Trap ***
  //   const footerFocusModalTrap = (event: KeyboardEvent) => {
  //     if (!footerOverlay) return;

  //     focusModalTrap(event, footerOverlay);
  //   };
  // *** End of Focus Trap ***

  if (footerOverlay) {
    footerOverlay.addEventListener('click', function (e) {
      if (e.target === footerOverlay) {
        removeClasses();
        footerOverlay.classList.remove('active');
      }
    });
  }

  const footerOverlayEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') footerOverlay?.classList.remove('active');
  };

  window.addEventListener('keyup', footerOverlayEscapeKey);

  footerOverlayCloseButton?.addEventListener('click', () => {
    footerOverlay?.classList.remove('active');
  });
  // *** End of Overlay ***
  // *** End of Envelope ***

  // *** FORM ***

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

  // *** Form | Inputs Valid | Envelope Message | EmailJS ***
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
          footerOverlay?.classList.add('active');
          footerEnvelopeHeart?.classList.add('initial-state');

          setTimeout(() => {
            footerEnvelopeHeart?.classList.add('active');

            if (formInputName && formInputEmail && formTextarea) {
              formInputName.value = '';
              formInputEmail.value = '';
              formTextarea.value = '';
            }
          }, 250);
        }, 500);

        // *** EmailJS | Popup Envelope Message ***
        // emailjs
        //   .send(
        //     'service_687vb4p',
        //     'template_a78ap3d',
        //     {
        //       name: formInputName?.value,
        //       email: formInputEmail?.value,
        //       message: formTextarea?.value,
        //     },
        //     '7v1sBU3diJGsXO7dM',
        //   )
        //   .then((response: EmailJSResponseStatus) => {
        //     console.log('success:', response.status, response.text);

        //     setTimeout(() => {
        //       footerOverlay?.classList.add('active');
        //       footerEnvelopeHeart?.classList.add('initial-state');

        //       setTimeout(() => {
        //         footerEnvelopeHeart?.classList.add('active');

        //         if (formInputName && formInputEmail && formTextarea) {
        //           formInputName.value = '';
        //           formInputEmail.value = '';
        //           formTextarea.value = '';
        //         }
        //       }, 250);
        //     }, 500);
        //   })
        //   .catch(error => {
        //     console.log('failed:', error);
        //     alert('Oops! Something went wrong. Please try again.');
        //   });
        // *** End of EmailJS | Popup Envelope Message ***
      }
    });
  }
  // *** End of Form | Inputs Valid | Envelope Message | EmailJS ***

  function checkInputValues(
    inputArray: (HTMLInputElement | HTMLTextAreaElement | null)[],
  ) {
    let isInputValid: boolean = true;

    inputArray.forEach((oneInput, index) => {
      // *** Guard - Prevented non-existent inputs ***
      if (!oneInput) return;
      const inputElementValue = oneInput.value.trim().toLowerCase();
      // *** End of Guard - Prevented non-existent inputs ***

      // *** Without GUARD - oneInput! -> non assertion ts syntax, when inputs are READY in the DOM ***

      //  --> const inputElement = oneInput!.value.trim().toLowerCase(); <---

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

      // *** Email Regex ***
      const inputElementEmailRegex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
      // *** End of Email Regex ***

      if (index === 0) {
        // *** Full Name ***
        if (inputElementValue === '') {
          isInputValid = false;
          addErrorMessages(index);
          oneInput.setAttribute('aria-invalid', 'true');
        } else {
          removeErrorMessages(index);

          addSuccesLines(index);

          oneInput.setAttribute('aria-invalid', 'false');

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
          oneInput.setAttribute('aria-invalid', 'true');
        } else {
          removeErrorMessages(index);

          addSuccesLines(index);

          oneInput.setAttribute('aria-invalid', 'false');

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
          oneInput.setAttribute('aria-invalid', 'true');
        } else {
          removeErrorMessages(index);
          addSuccesLines(index);

          oneInput.setAttribute('aria-invalid', 'false');

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

  // *** End of FORM ***
}
