import lightbox from './modules/lightbox';
import skillsHeading from './modules/skills';
import projects from './modules/projects';
import footer from './modules/footer';

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  lightbox();
  skillsHeading();
  projects();
  footer();
}
