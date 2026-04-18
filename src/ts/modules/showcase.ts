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

  const showcaseContainerOverlay = document.querySelector<HTMLDivElement>(
    '.showcase__container-overlay',
  );

  const showcaseContainerOverlaySpans =
    document.querySelectorAll<HTMLSpanElement>(
      '.showcase__container-overlay-span',
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

  if (showcaseContainerOverlaySpans.length) {
    gsap.to('.showcase__container-overlay-span', {
      delay: 0.5,
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.showcase__container',
        start: 'top center',
        once: true,
      },

      onComplete: () => {
        showcaseContainerOverlay!.style.display = 'none';
      },
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

  const lightning = document.querySelector<SVGSVGElement>(
    '.showcase__lightning',
  );
  const boltPath = document.querySelector<SVGPolylineElement>(
    '.showcase__lightning-bolt',
  );
  const branchPath = document.querySelector<SVGPolylineElement>(
    '.showcase__lightning-branch',
  );
  const video = document.querySelector<HTMLVideoElement>(
    '.showcase__body-inner-screen-video',
  );
  const tv = document.querySelector<HTMLElement>('.showcase__tv');

  const leftTip = document.querySelector<HTMLElement>(
    '.showcase__antennas-left',
  );
  const rightTip = document.querySelector<HTMLElement>(
    '.showcase__antennas-right',
  );

  const getAntennaTop = (el: HTMLElement, svgEl: SVGSVGElement) => {
    const elRect = el.getBoundingClientRect();
    const svgRect = svgEl.getBoundingClientRect();

    return {
      x: elRect.left + elRect.width / 2 - svgRect.left,
      y: elRect.top - svgRect.top,
    };
  };

  const generateZigzag = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    steps: number = 6,
  ): string => {
    const points: string[] = [`${x1},${y1}`];

    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const midX = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 40;
      const midY = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 25;
      points.push(`${midX.toFixed(1)},${midY.toFixed(1)}`);
    }

    points.push(`${x2},${y2}`);
    return points.join(' ');
  };

  const triggerLightning = () => {
    if (!lightning || !boltPath || !branchPath || !leftTip || !rightTip) return;

    // Vypočítaj reálne pozície vrcholov antén relatívne k SVG
    const left = getAntennaTop(leftTip, lightning);
    const right = getAntennaTop(rightTip, lightning);

    // Náhodný zigzag medzi nimi — každý trigger iný tvar
    boltPath.setAttribute(
      'points',
      generateZigzag(left.x, left.y, right.x, right.y, 6),
    );
    branchPath.setAttribute(
      'points',
      generateZigzag(left.x, left.y, right.x, right.y, 4),
    );

    // Nastav dĺžku dashu podľa skutočnej dĺžky path
    const boltLen = boltPath.getTotalLength?.() ?? 300;
    const branchLen = branchPath.getTotalLength?.() ?? 150;

    // boltPath.style.strokeDasharray = `${boltLen}`;
    // boltPath.style.strokeDashoffset = `${boltLen}`;
    // branchPath.style.strokeDasharray = `${branchLen}`;
    // branchPath.style.strokeDashoffset = `${branchLen}`;

    // lightning.classList.add('showcase__lightning--active');

    setTimeout(() => video?.play(), 300);
    // setTimeout(
    //   () => lightning.classList.remove('showcase__lightning--active'),
    //   900,
    // );
  };

  tv?.addEventListener('mouseenter', triggerLightning);

  const left = document.querySelector('.showcase__antennas-left');
  const right = document.querySelector('.showcase__antennas-right');
  const svg = document.querySelector('.showcase__lightning');

  const svgRect = svg!.getBoundingClientRect();
  const leftRect = left!.getBoundingClientRect();
  const rightRect = right!.getBoundingClientRect();

  console.log(
    'LEFT tip:',
    leftRect.left + leftRect.width / 2 - svgRect.left,
    leftRect.top - svgRect.top,
  );
  console.log(
    'RIGHT tip:',
    rightRect.left + rightRect.width / 2 - svgRect.left,
    rightRect.top - svgRect.top,
  );
}
