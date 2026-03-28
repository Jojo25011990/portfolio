import lightbox from './modules/lightbox';
import skillsHeading from './modules/skills';
import projects from './modules/projects';

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  lightbox();
  skillsHeading();
  projects();
}
