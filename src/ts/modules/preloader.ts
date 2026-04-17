export default function preloader() {
  const preloader = document.querySelector<HTMLDivElement>('.preloader')!;
  const fill = document.querySelector<HTMLDivElement>('.preloader-fill')!;
  const text = document.querySelector<HTMLDivElement>('.preloader-text')!;

  const images = Array.from(document.querySelectorAll('img'));

  let state = {
    domReady: false,
    fontsReady: false,
    imagesLoaded: 0,
    finished: false,
  };

  const totalImages = images.length;

  const START_TIME = performance.now();
  const MIN_DURATION = 900;

  function updateProgress() {
    const imgProgress =
      totalImages === 0
        ? 100
        : Math.round((state.imagesLoaded / totalImages) * 100);

    let progress = 0;

    if (state.domReady) progress += 25;
    if (state.fontsReady) progress += 15;

    // images = hlavná váha (60%)
    progress += Math.min(60, imgProgress * 0.6);

    const finalProgress = Math.round(progress);

    fill.style.width = `${finalProgress}%`;
    text.textContent = `${finalProgress}%`;

    if (finalProgress >= 100) finish();
  }

  function finish() {
    if (state.finished) return;
    state.finished = true;

    const elapsed = performance.now() - START_TIME;
    const delay = Math.max(0, MIN_DURATION - elapsed);

    setTimeout(() => {
      preloader.classList.add('hide');
      document.body.classList.add('ready');
    }, delay);
  }

  /**
   * LOAD ALL IMAGES (REAL VERSION)
   */
  function preloadAllImages() {
    images.forEach(img => {
      const src = img.getAttribute('src');
      console.log(src, img);

      if (!src) {
        state.imagesLoaded++;
        updateProgress();
        return;
      }

      const temp = new Image();
      temp.src = src;

      if (temp.decode) {
        temp
          .decode()
          .then(() => {
            state.imagesLoaded++;
            updateProgress();
          })
          .catch(() => {
            state.imagesLoaded++;
            updateProgress();
          });
      } else {
        temp.onload = () => {
          state.imagesLoaded++;
          updateProgress();
        };

        temp.onerror = () => {
          state.imagesLoaded++;
          updateProgress();
        };
      }
    });
  }

  /**
   * DOM READY
   */
  window.addEventListener('DOMContentLoaded', () => {
    state.domReady = true;
    updateProgress();
    preloadAllImages();
  });

  /**
   * FONTS READY
   */
  document.fonts?.ready.then(() => {
    state.fontsReady = true;
    updateProgress();
  });
}
