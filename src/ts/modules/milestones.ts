import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function milestones() {
  const items = gsap.utils.toArray<HTMLElement>('.milestones__item');

  items.forEach((item, index: number) => {
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
        start: 'center bottom',
        end: 'top top',
        onUpdate: self => {
          const progressCard = self.progress;
          gsap.set(item, {
            scale: 1 - progressCard * 0.5,
          });
        },
      });
    }
  });
}
