import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function milestones() {
  const items = gsap.utils.toArray<HTMLElement>('.milestones__item');

  //   let current = 0;
  //   let target = 0;
  //   let ease = 0.08;

  //   function raf() {
  //     target = window.scrollY;

  //     current += (target - current) * ease;
  //     items.forEach(item => {
  //       item!.style.transform = `translateY(${-current}px)`;
  //     });

  //     requestAnimationFrame(raf);
  //   }
  //   raf();
  items.forEach((item, index) => {
    if (index < items.length - 1) {
      ScrollTrigger.create({
        trigger: item,
        start: 'top top',
        endTrigger: items[items.length - 1],
        end: 'top top',
        pin: true,
        pinSpacing: false,
        scrub: true,
      });
      ScrollTrigger.create({
        trigger: items[index + 1],
        start: 'top bottom',
        end: 'top top',
        onUpdate: self => {
          const progressCard = self.progress;
          gsap.set(item, {
            scale: 1 - progressCard * 0.15,
            filter: `blur(${progressCard * 6}px)`,
          });
        },
      });
    }
  });
}
