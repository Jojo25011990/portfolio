import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function showcase() {
  const showcaseTitle =
    document.querySelector<HTMLHeadingElement>('.showcase__title');
  const showcaseTitleSpan = document.querySelector<HTMLSpanElement>(
    '.showcase__title-span',
  );

  const showcaseDescription = document.querySelector<HTMLParagraphElement>(
    '.showcase__description',
  );

  const showcaseVideos =
    document.querySelectorAll<HTMLVideoElement>('.showcase__video');
  const showcaseSwitcherBtns = document.querySelectorAll<HTMLButtonElement>(
    '.showcase__switcher-btn',
  );

  const showcaseButtonPlay = document.querySelector<HTMLButtonElement>(
    '.showcase__controls-btn-play',
  );
  const showcaseButtonReset = document.querySelector<HTMLButtonElement>(
    '.showcase__controls-btn-reset',
  );
  const showcaseProgress = document.querySelector<HTMLInputElement>(
    '.showcase__controls-progress',
  );
  const showcaseTime = document.querySelector<HTMLSpanElement>(
    '.showcase__controls-time',
  );

  const showcaseContainersOverlay = document.querySelectorAll<HTMLDivElement>(
    '.showcase__container-overlay',
  );

  if (showcaseTitle) {
    gsap.to(showcaseTitle, {
      scrollTrigger: {
        trigger: showcaseTitle,
        start: 'top center',
      },

      onStart: () => {
        showcaseTitleSpan?.classList.add('active');
      },
    });
  }

  if (showcaseDescription) {
    gsap.to(showcaseDescription, {
      scrollTrigger: {
        trigger: showcaseDescription,
        start: 'top center',
      },

      duration: 2.5,
      text: 'A cinematic storytelling reel combining CSS Art, Animations, 3D work and interactive experiments.',
      ease: 'none',
    });
  }

  showcaseContainersOverlay.forEach(showcaseContainerOverlay => {
    const showcaseContainerHeading = showcaseContainerOverlay.querySelectorAll(
      '.showcase__container-title',
    );

    gsap.to(showcaseContainerOverlay, {
      delay: 1.35,
      yPercent: -100,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: showcaseContainerOverlay,
        start: 'top center',
        once: true,
      },
      onComplete: () => {
        if (showcaseContainerOverlay)
          gsap.set(showcaseContainerOverlay, { display: 'none', delay: 0.25 });
      },
    });

    gsap.to(showcaseContainerHeading, {
      delay: 0.9,
      autoAlpha: 0,
      y: -200,
      duration: 0.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: showcaseContainerOverlay,
        start: 'top center',
        once: true,
      },
    });
  });

  // *** Video Player ***
  // *** Switcher Buttons ***
  let activeIndex = 0;

  const setShowcaseActiveVideo = (index: number) => {
    if (index === activeIndex) return;

    const currentShowcaseVideo = showcaseVideos[activeIndex];
    const nextShowcaseVideo = showcaseVideos[index];

    showcaseSwitcherBtns.forEach((showcaseSwitcherBtn, ariaAttrIndex) => {
      showcaseSwitcherBtn.setAttribute(
        'aria-selected',
        ariaAttrIndex === index ? 'true' : 'false',
      );
    });

    showcaseVideos.forEach((showcaseVideo, ariaAttrIndex) => {
      showcaseVideo.setAttribute(
        'aria-hidden',
        ariaAttrIndex === index ? 'false' : 'true',
      );
    });

    currentShowcaseVideo.pause();
    currentShowcaseVideo.classList.remove('active');

    nextShowcaseVideo.classList.add('active');
    nextShowcaseVideo.currentTime = 0;

    activeIndex = index;
  };

  showcaseSwitcherBtns.forEach((showcaseSwitcherButton, index) => {
    showcaseSwitcherButton.addEventListener('click', () => {
      setShowcaseActiveVideo(index);
    });
  });

  // *** End of Switcher Buttons ***

  let isScrubbing = false;

  // *** Status - Play | Pause ***
  const showcaseVideoStatus = () => {
    // *** Version 01***
    if (showcaseVideos[activeIndex]?.paused) {
      showcaseVideos[activeIndex].play();
    } else {
      showcaseVideos[activeIndex]?.pause();
    }
    // *** End of Version 01***

    // *** Version 02 ***
    //   showcaseVideo?.paused ? showcaseVideo.play() : showcaseVideo?.pause();
    // *** End of Version 02 ***
  };

  const showcaseVideoIconStatus = () => {
    if (showcaseVideos[activeIndex]?.paused) {
      showcaseButtonPlay!.innerHTML =
        '<i class="fa-solid fa-play fa-2x showcase__controls-icon showcase__controls-icon-play" aria-hidden="true"></i>';
      showcaseButtonPlay?.setAttribute('aria-label', 'Play');
      showcaseButtonPlay?.setAttribute('aria-pressed', 'false');
    } else {
      showcaseButtonPlay!.innerHTML =
        '<i class="fa-solid fa-pause fa-2x showcase__controls-icon showcase__controls-icon-pause" aria-hidden="true"></i>';
      showcaseButtonPlay?.setAttribute('aria-label', 'Pause');
      showcaseButtonPlay?.setAttribute('aria-pressed', 'true');
    }
  };
  // *** Status - Play | Pause ***

  // *** Time - ( Timestamp ) ***
  const showcaseVideoTime = () => {
    if (!showcaseProgress || !showcaseVideos[activeIndex] || !showcaseTime)
      return;
    if (!showcaseVideos[activeIndex].duration) return;
    if (isScrubbing) return;

    const showcaseVideoProgress =
      (showcaseVideos[activeIndex].currentTime /
        showcaseVideos[activeIndex].duration) *
      100;

    showcaseProgress.value = String(showcaseVideoProgress);

    showcaseProgress.setAttribute(
      'aria-valuenow',
      String(Math.round(showcaseVideoProgress)),
    );

    let mins: string | number = Math.floor(
      showcaseVideos[activeIndex].currentTime / 60,
    );
    if (mins < 10) {
      mins = '0' + String(mins);
    }

    let secs: string | number = Math.floor(
      showcaseVideos[activeIndex].currentTime % 60,
    );
    if (secs < 10) {
      secs = '0' + String(secs);
    }

    showcaseTime.innerHTML = `${mins}:${secs}`;
    showcaseProgress.setAttribute('aria-valuetext', `${mins}:${secs}`);
  };
  // *** End of Time - ( Timestamp ) ***

  // *** Reset | Restart ***
  const showcaseVideoReset = () => {
    if (showcaseVideos[activeIndex]) {
      showcaseVideos[activeIndex].currentTime = 0;
      showcaseVideos[activeIndex].pause();
    }
  };
  // *** End of Reset | Restart ***

  // *** Progress ***
  const showcaseVideoProgress = () => {
    if (
      !showcaseVideos[activeIndex] ||
      !showcaseProgress ||
      !showcaseVideos[activeIndex].duration
    )
      return;
    showcaseVideos[activeIndex].currentTime =
      (Number(showcaseProgress?.value) *
        showcaseVideos[activeIndex]!.duration) /
      100;
  };
  // *** End of Progress ***

  // *** Event Listeners ***
  showcaseVideos.forEach(video => {
    video.addEventListener('click', showcaseVideoStatus);
    video.addEventListener('play', showcaseVideoIconStatus);
    video.addEventListener('pause', showcaseVideoIconStatus);
    video.addEventListener('timeupdate', showcaseVideoTime);
  });

  showcaseButtonPlay?.addEventListener('click', showcaseVideoStatus);
  showcaseButtonReset?.addEventListener('click', showcaseVideoReset);

  showcaseProgress?.addEventListener('input', showcaseVideoProgress);

  showcaseProgress?.addEventListener('pointerdown', () => {
    isScrubbing = true;
  });

  showcaseProgress?.addEventListener('pointerup', () => {
    isScrubbing = false;
  });
  // *** End of Event Listeners ***
  // *** End of Video Player ***

  // *** Old School TV ***
  const showcaseCSSArtVideoOverlay = document.querySelector<HTMLDivElement>(
    '.showcase__body-inner-screen-overlay',
  );
  const showcaseCSSArtVideoOverlayError =
    document.querySelector<SVGFETurbulenceElement>(
      '.showcase__body-inner-screen-error',
    );

  const showcaseCSSArtLightning = document.querySelector<SVGSVGElement>(
    '.showcase__lightning',
  );
  const showcaseCSSArtLightningPath = document.querySelector<SVGPathElement>(
    '.showcase__lightning path',
  );
  const showcaseCSSArtLightningSparks =
    document.querySelector<HTMLAudioElement>('.showcase__lightning-spark');
  const showcaseCssArtVideo = document.querySelector<HTMLVideoElement>(
    '.showcase__body-inner-screen-video',
  );
  const showcaseCSSArtBtns = document.querySelectorAll<HTMLButtonElement>(
    '.showcase__body-inner-btn',
  );
  const [showcaseCSSArtButton01, showcaseCSSArtButton02] = showcaseCSSArtBtns;

  showcaseCSSArtButton01.addEventListener('click', function () {
    this.classList.toggle('active');

    if (showcaseCssArtVideo && this.classList.contains('active')) {
      showcaseCssArtVideo.muted = false;
    } else showcaseCssArtVideo!.muted = true;
  });

  showcaseCSSArtButton02.addEventListener(
    'click',
    () => {
      triggerLightning();
      showcaseCSSArtLightningSparks?.play();
    },
    { once: true },
  );

  const showcaseAutoSoundButton01 = () => {
    if (!showcaseCSSArtButton01.classList.contains('active')) {
      const activeDelay = 1000;

      setTimeout(() => {
        showcaseCSSArtButton01.classList.add('active');
        showcaseCssArtVideo!.muted = false;
      }, activeDelay);
    }
  };

  function triggerLightning() {
    const tl = gsap.timeline();

    gsap.set(showcaseCSSArtLightning, { opacity: 1 });
    gsap.set(showcaseCSSArtLightningPath, {
      strokeDasharray: 300,
      strokeDashoffset: 300,
      opacity: 1,
    });

    tl.to(showcaseCSSArtLightningPath, {
      strokeDashoffset: 0,
      duration: 0.08,
      ease: 'power2.out',
    });

    tl.to(showcaseCSSArtLightningPath, {
      opacity: 0,
      duration: 0.02,
      repeat: 5,
      yoyo: true,
      ease: 'none',
    });

    tl.to(showcaseCSSArtLightningPath, {
      opacity: 1,
      duration: 0.02,
      repeat: 2,
      yoyo: true,
      ease: 'none',
    });

    tl.to(showcaseCSSArtLightningPath, {
      opacity: 0.3,
      duration: 0.02,
      repeat: 5,
      yoyo: true,
      ease: 'none',
    });

    tl.to(showcaseCSSArtLightningPath, {
      opacity: 1,
      duration: 0.02,
      repeat: 2,
      yoyo: true,
      ease: 'none',
    });

    tl.set(showcaseCSSArtLightning, { opacity: 0 });

    tl.to(showcaseCSSArtVideoOverlayError, {
      duration: 2,
      attr: { baseFrequency: '0.05 0.2' },
      onComplete: () => {
        showcaseCssArtVideo?.play();
        showcaseAutoSoundButton01();
      },
    });

    tl.to(showcaseCSSArtVideoOverlay, {
      duration: 0.7,
      autoAlpha: 0,

      onComplete: () => {
        showcaseCssArtVideo?.play();
      },
    });
  }
  showcaseCssArtVideo?.addEventListener('ended', () => {
    showcaseCSSArtButton01.classList.remove('active');
    showcaseCssArtVideo!.muted = true;

    gsap.to(showcaseCSSArtVideoOverlay, {
      autoAlpha: 1,
      duration: 0.5,
    });
  });

  // *** End of Old School TV ***
}
