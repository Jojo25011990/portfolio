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
import showcase from './modules/showcase';
import evolving from './modules/evolving';
import activity from './modules/activity';
import game from './modules/game';

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  header();
  lightbox();
  skillsHeading();
  projects();
  services();
  features();
  evolving();
  future();
  faq();
  activity();
  game();
  showcase();
  footer();
  backToTop();
  myStoryOverlay();
  myBonus();
}
