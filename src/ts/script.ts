import intro from './modules/intro';
import skillsHeading from './modules/skills';
import features from './modules/features';
import footer from './modules/footer';
import header from './modules/header';
import backToTop from './modules/backToTop';
// import myStoryOverlay from './modules/myStoryOverlay';
import faq from './modules/faq';
import future from './modules/future';
import myProcess from './modules/myProcess';
import showcase from './modules/showcase';
import evolution from './modules/evolution';
import game from './modules/game';
import heading from './modules/heading';

// import myStory from './modules/myStory';

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  intro();

  heading();

  header();
  skillsHeading();

  features();
  evolution();
  future();

  faq();
  game();
  showcase();
  footer();
  backToTop();
  myProcess();
}
