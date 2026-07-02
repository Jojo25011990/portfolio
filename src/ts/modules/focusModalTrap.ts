export default function focusModalTrap(
  event: KeyboardEvent,
  container: HTMLElement,
) {
  // *** Header | Footer ***
  if (event.key !== 'Tab') return;

  const focusableElements = Array.from(
    container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  );

  if (!focusableElements.length) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const currentIndexElement = focusableElements.indexOf(
    document.activeElement as HTMLElement,
  );

  if (event.shiftKey) {
    if (currentIndexElement <= 0) {
      event.preventDefault();
      lastElement.focus();
    }
  } else {
    if (
      currentIndexElement === focusableElements.length - 1 ||
      currentIndexElement === -1
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  }
  // *** End of Header | Footer ***
}
