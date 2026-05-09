import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function evolution() {
  // *** Desktop Version ***
  const evolutionContainer = document.querySelector<HTMLOListElement>(
    '.evolution__timeline',
  );

  const evolutionPhaseHeadings = document.querySelectorAll(
    '.evolution__phase-heading',
  );
  const [phaseHeading01, phaseHeading02, phaseHeading03] =
    evolutionPhaseHeadings;

  const evolutionPhaseLine01 = document.querySelector<HTMLLIElement>(
    '.evolution__line-01',
  );
  const evolutionPhaseLine02 = document.querySelector<HTMLLIElement>(
    '.evolution__line-02',
  );

  const evolutionPhaseWrapper01 = document.querySelectorAll<HTMLDivElement>(
    '.evolution__phase-wrapper-01 .evolution__phase-sentence',
  );
  const evolutionPhaseWrapper02 = document.querySelectorAll<HTMLDivElement>(
    '.evolution__phase-wrapper-02 .evolution__phase-sentence',
  );
  const evolutionPhaseWrapper03 = document.querySelectorAll<HTMLDivElement>(
    '.evolution__phase-wrapper-03 .evolution__phase-sentence',
  );
  // *** End of Desktop Version ***

  // *** Mobile Version ***
  const evolutionMobileContainer = document.querySelector<HTMLOListElement>(
    '.evolution__timeline-mobile',
  );

  const evolutionPhaseMobileHeadings =
    document.querySelectorAll<HTMLHeadingElement>(
      '.evolution__phase-mobile-heading',
    );
  const [phaseMobileHeading01, phaseMobileHeading02, phaseMobileHeading03] =
    evolutionPhaseMobileHeadings;

  const evolutionPhaseMobileLine01 = document.querySelectorAll<HTMLDivElement>(
    '.evolution__phase-mobile-line-01',
  );
  const evolutionPhaseMobileLine02 = document.querySelectorAll<HTMLDivElement>(
    '.evolution__phase-mobile-line-02',
  );

  const evolutionPhaseMobileWrapper01 =
    document.querySelectorAll<HTMLDivElement>(
      '.evolution__phase-mobile-wrapper-01 .evolution__phase-mobile-sentence',
    );
  const evolutionPhaseMobileWrapper02 =
    document.querySelectorAll<HTMLDivElement>(
      '.evolution__phase-mobile-wrapper-02 .evolution__phase-mobile-sentence',
    );
  const evolutionPhaseMobileWrapper03 =
    document.querySelectorAll<HTMLDivElement>(
      '.evolution__phase-mobile-wrapper-03 .evolution__phase-mobile-sentence',
    );
  // *** End of Mobile Version ***

  // *** Desktop Version ***
  const evolutionPhaseTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: evolutionContainer,
      start: 'top center',
    },
  });

  // *** Phase 01 ***
  evolutionPhaseTimeline.to(
    phaseHeading01,
    {
      autoAlpha: 1,
      y: 0,
    },
    '+=1',
  );
  evolutionPhaseTimeline.to(evolutionPhaseLine01, {
    delay: 0.2,
    scaleY: '33.3%',
    ease: 'power4.in',
    duration: 1,
  });

  if (evolutionPhaseWrapper01.length) {
    evolutionPhaseTimeline.to(evolutionPhaseWrapper01, {
      delay: 0.2,
      stagger: 0.15,
      x: '60%',
    });
  }

  evolutionPhaseTimeline.to(evolutionPhaseLine02, {
    delay: 0.2,
    scaleY: '33.3%',
    ease: 'power4.in',
    duration: 1,
  });
  // *** End of Phase 01 ***

  // *** Phase 02 ***
  evolutionPhaseTimeline.to(
    phaseHeading02,
    {
      autoAlpha: 1,
      y: 0,
    },
    '+=1',
  );
  evolutionPhaseTimeline.to(evolutionPhaseLine01, {
    delay: 0.2,
    scaleY: '66.6%',
    ease: 'power4.in',
    duration: 1,
  });

  if (evolutionPhaseWrapper02.length) {
    evolutionPhaseTimeline.to(evolutionPhaseWrapper02, {
      delay: 0.2,
      stagger: 0.15,
      x: '60%',
    });
  }

  evolutionPhaseTimeline.to(evolutionPhaseLine02, {
    delay: 0.2,
    scaleY: '66.6%',
    ease: 'power4.in',
    duration: 1,
  });
  // *** End of Phase 02 ***

  // *** Phase 03 ***
  evolutionPhaseTimeline.to(
    phaseHeading03,
    {
      autoAlpha: 1,
      y: 0,
    },
    '+=1.2',
  );
  evolutionPhaseTimeline.to(evolutionPhaseLine01, {
    delay: 0.2,
    scaleY: '100%',
    ease: 'power4.in',
    duration: 1,
  });

  if (evolutionPhaseWrapper03.length) {
    evolutionPhaseTimeline.to(evolutionPhaseWrapper03, {
      delay: 0.2,
      stagger: 0.15,
      x: '60%',
    });
  }

  evolutionPhaseTimeline.to(evolutionPhaseLine02, {
    delay: 0.2,
    scaleY: '100%',
    ease: 'power4.in',
    duration: 1,
  });
  // *** End of Phase 03 ***

  if (window.innerWidth <= 850) evolutionPhaseTimeline.kill();
  // *** End of Desktop Version ***

  // *** Mobile Version ***
  const evolutionPhaseMobileTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: evolutionMobileContainer,
      start: 'top center',
    },
  });

  // *** Phase 01 ***
  evolutionPhaseMobileTimeline.to(
    [phaseMobileHeading01, evolutionPhaseMobileWrapper01],
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.15,

      onComplete: () => {
        evolutionPhaseMobileLine01[0]?.classList.add('active');
        evolutionPhaseMobileLine02[0]?.classList.add('active');
      },
    },

    '+=1',
  );
  // *** End of Phase 01 ***

  // *** Phase 02 ***
  evolutionPhaseMobileTimeline.to(
    [phaseMobileHeading02, evolutionPhaseMobileWrapper02],
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.15,

      onComplete: () => {
        console.log('phase finish 2');
        evolutionPhaseMobileLine01[1]?.classList.add('active');
        evolutionPhaseMobileLine02[1]?.classList.add('active');
      },
    },

    '+=1.5',
  );
  // *** End of Phase 02 ***

  // *** Phase 03 ***
  evolutionPhaseMobileTimeline.to(
    [phaseMobileHeading03, evolutionPhaseMobileWrapper03],
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.15,

      onComplete: () => {
        evolutionPhaseMobileLine01[2]?.classList.add('active');
        evolutionPhaseMobileLine02[2]?.classList.add('active');
      },
    },

    '+=1.5',
  );
  // *** End of Phase 03 ***

  // *** End of Mobile Version ***
}
