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

  const showcaseVideo =
    document.querySelector<HTMLVideoElement>('.showcase__video');
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

  // *** Video Player ***

  let isScrubbing = false;

  // *** Status - Play | Pause ***
  const showcaseVideoStatus = () => {
    // *** Version 01***
    if (showcaseVideo?.paused) {
      showcaseVideo.play();
    } else {
      showcaseVideo?.pause();
    }
    // *** End of Version 01***

    // *** Version 02 ***
    //   showcaseVideo?.paused ? showcaseVideo.play() : showcaseVideo?.pause();
    // *** End of Version 02 ***
  };

  const showcaseVideoIconStatus = () => {
    if (showcaseVideo?.paused) {
      showcaseButtonPlay!.innerHTML =
        '<i class="fa-solid fa-play fa-2x showcase__controls-icon showcase__controls-icon-play"></i>';
    } else {
      showcaseButtonPlay!.innerHTML =
        '<i class="fa-solid fa-pause fa-2x showcase__controls-icon showcase__controls-icon-pause"></i>';
    }
  };
  // *** Status - Play | Pause ***

  // *** Time - ( Timestamp ) ***
  const showcaseVideoTime = () => {
    if (!showcaseProgress || !showcaseVideo || !showcaseTime) return;
    if (!showcaseVideo.duration) return;
    if (isScrubbing) return;

    showcaseProgress.value = String(
      (showcaseVideo.currentTime / showcaseVideo.duration) * 100,
    );

    let mins: string | number = Math.floor(showcaseVideo.currentTime / 60);
    if (mins < 10) {
      mins = '0' + String(mins);
    }

    let secs: string | number = Math.floor(showcaseVideo.currentTime % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }

    showcaseTime.innerHTML = `${mins}:${secs}`;
  };
  // *** End of Time - ( Timestamp ) ***

  // *** Reset | Restart ***
  const showcaseVideoReset = () => {
    if (showcaseVideo) {
      showcaseVideo.currentTime = 0;
      showcaseVideo.pause();
    }
  };
  // *** End of Reset | Restart ***

  // *** Progress ***
  const showcaseVideoProgress = () => {
    if (!showcaseVideo || !showcaseProgress || !showcaseVideo.duration) return;
    showcaseVideo.currentTime =
      (Number(showcaseProgress?.value) * showcaseVideo!.duration) / 100;
  };
  // *** End of Progress ***

  // *** Event Listeners ***
  showcaseVideo?.addEventListener('click', showcaseVideoStatus);
  showcaseVideo?.addEventListener('play', showcaseVideoIconStatus);
  showcaseVideo?.addEventListener('pause', showcaseVideoIconStatus);
  showcaseVideo?.addEventListener('timeupdate', showcaseVideoTime);

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
}
