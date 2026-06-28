import gsap from 'gsap';
import myStoryOverlay from './myStoryOverlay';

export default function intro() {
  // *** Body | My Experience ***
  const body = document.querySelector<HTMLBodyElement>('body');
  const showcase = document.querySelector<HTMLElement>('.showcase');
  const game = document.querySelector<HTMLElement>('.game');
  // *** End of Body | My Experience ***

  // *** Header | Skills ***
  const headerLogo = document.querySelector<HTMLAnchorElement>('.header__logo');
  const headerCircle = document.querySelector<SVGCircleElement>(
    '.header__svg-circle',
  );
  const headerAuthorImage =
    document.querySelector<HTMLImageElement>('.header__author');
  const headerAuthorSpan = document.querySelector<HTMLSpanElement>(
    '.header__title-author',
  );

  const skillsMenu = document.querySelector<HTMLUListElement>('.skills__menu');
  // *** End of Header | Skills ***

  // *** Intro ***
  const intro = document.querySelector<HTMLElement>('.intro');

  const introHeadingImage =
    document.querySelector<HTMLDivElement>('.intro-imgbox');

  const introScenePlaceholder = document.querySelector<HTMLDivElement>(
    '.intro-scene-placeholder',
  );

  const introSceneLineWhite = document.querySelector<HTMLDivElement>(
    '.intro-scene-line-01',
  );
  const introSceneLineGreen = document.querySelector<HTMLDivElement>(
    '.intro-scene-line-02',
  );

  const pacman01 = document.querySelector<HTMLDivElement>('#pacman-01');
  const ghost01 = document.querySelector<HTMLDivElement>('#ghost-01');
  const ghost01Eyes = ghost01?.querySelector<HTMLDivElement>(
    '.intro-scene-ghost-eyes',
  );
  const ghost01Smile = ghost01?.querySelector<HTMLDivElement>(
    '.intro-scene-ghost-smile',
  );

  const introTimelineDelay = 1.5;
  const introTimeline = gsap.timeline().delay(introTimelineDelay);
  // *** End of Intro ***

  // *** Functionality ***
  introTimeline
    .to(introHeadingImage, {
      autoAlpha: 1,
      duration: 0.8,
    })
    .to({}, { duration: 2 })
    .to(introHeadingImage, {
      autoAlpha: 0,
      duration: 0.8,
      onComplete: () => {
        introHeadingImage!.style.display = 'none';
      },
    })
    .to(
      introSceneLineWhite,
      {
        scaleX: 1,
        duration: 1,
      },
      '+=0.3',
    )
    .add(() => {
      ghost01?.classList.add('ghost-active');
    }, '+=0.1')
    .add(() => {
      pacman01?.classList.add('pacman-active');
    }, '+=3.2')
    .add(() => {
      introScenePlaceholder?.classList.add('placeholder-active');
    }, '+=4.5')
    .add(() => {
      ghost01?.classList.add('ghost-active-02');
      ghost01Eyes?.classList.add('active-eye');
      ghost01Smile?.classList.add('active-smile');
    }, '+=6.2')
    .to(
      introSceneLineGreen,
      {
        scaleX: 1,
        duration: 1,
      },
      '+=4.2',
    )
    .to(
      [introSceneLineWhite, introSceneLineGreen],
      {
        transformOrigin: 'right',
        scaleX: 0,
        duration: 1,
      },
      '+=0.2',
    )
    .add(() => body?.classList.add('active'))
    .to(intro, {
      yPercent: -105,

      onComplete: () => {
        intro?.classList.add('hide');
      },
    })
    .add(() => {
      game?.classList.remove('hide');
      showcase?.classList.remove('hide');
    })
    .add(() => {
      headerAuthorImage?.classList.add('active');
      headerLogo?.classList.add('active');
      headerAuthorSpan?.classList.add('active');
      headerCircle?.classList.add('active');
      skillsMenu?.classList.add('active');
    }, '-=1.4')
    .add(() => myStoryOverlay());

  // *** End of Functionality ***
}
