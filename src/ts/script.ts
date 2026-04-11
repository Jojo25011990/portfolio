import lightbox from './modules/lightbox';
import skillsHeading from './modules/skills';
import projects from './modules/projects';
import services from './modules/services';
import features from './modules/features';
import footer from './modules/footer';
import header from './modules/header';
import backToTop from './modules/backToTop';
import myStoryOverlay from './modules/myStoryOverlay';
import faq from './modules/faq';
import future from './modules/future';
import myBonus from './modules/myBonus';

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  lightbox();
  skillsHeading();
  projects();
  services();
  features();
  footer();
  header();
  backToTop();
  myStoryOverlay();
  faq();
  future();
  myBonus();
}
