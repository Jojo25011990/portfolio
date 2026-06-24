import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function description() {
  type DescriptionTypes = {
    nameSection: string;
    nameSectionText: string;

    duration?: number;
  };

  const descriptionConfig = ({
    nameSection,
    nameSectionText,
    duration = 2,
  }: DescriptionTypes) => {
    const sectionDescription = document.querySelector<HTMLParagraphElement>(
      `.${nameSection}__description`,
    );

    if (!sectionDescription) return;

    gsap.to(sectionDescription, {
      scrollTrigger: {
        trigger: sectionDescription,
        start: 'top center',
      },

      text: nameSectionText,
      duration: duration, // *** When key and value match, you can use only key -> duration ( Object shorthand ...) ***
      ease: 'none',
    });
  };

  // *** Projects Section ***
  descriptionConfig({
    nameSection: 'projects',
    nameSectionText:
      'From over 150 completed projects, this is a curated selection showcasing my work across interactive UI systems, creative coding, animations, and frontend experiments.',
    duration: 3,
  });
  // *** End of Projects Section ***

  // *** Services Section ***
  descriptionConfig({
    nameSection: 'services',
    nameSectionText:
      'Exploring, building, and animating digital experiences that tell a story.',
  });
  // *** End of Services Section ***

  // *** Features Section ***
  descriptionConfig({
    nameSection: 'features',
    nameSectionText:
      'Small details that make every project engaging, interactive, and memorable.',
  });
  // *** End of Features Section ***

  // *** Evolution Section ***
  descriptionConfig({
    nameSection: 'evolution',
    nameSectionText:
      'My evolution from experimenting with visuals into a self-defined way of building custom, storytelling-driven interactive systems.',
    duration: 3,
  });
  // *** End of Evolution Section ***

  // *** Future Section ***
  descriptionConfig({
    nameSection: 'future',
    nameSectionText:
      'Check out the upcoming projects. I’m planning and what’s next in line.',
    duration: 1.5,
  });
  // *** End of Future Section ***

  // *** Milestones Section ***
  descriptionConfig({
    nameSection: 'milestones',
    nameSectionText:
      'A collection of key milestones that shaped how I approach building interfaces, animations and frontend systems.',
    duration: 2.25,
  });
  // *** End of Milestones Section ***

  // *** Faq Section ***
  descriptionConfig({
    nameSection: 'faq',
    nameSectionText:
      'Curious how I work and create? Here are some quick answers.',
  });
  // *** End of Faq Section ***

  // *** Game Section ***
  descriptionConfig({
    nameSection: 'game',
    nameSectionText:
      'An interactive CSS Art memory challenge with playful animations and gameplay.',
  });
  // *** End of Game Section ***

  // *** Showcase Section ***
  descriptionConfig({
    nameSection: 'showcase',
    nameSectionText:
      'A cinematic storytelling reel combining CSS Art, Animations, 3D work and interactive experiments.',
    duration: 2.5,
  });
  // *** End of Showcase Section ***
}
