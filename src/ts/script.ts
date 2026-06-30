import intro from './modules/intro';
import skillsHeading from './modules/skills';
import features from './modules/features';
import footer from './modules/footer';
import header from './modules/header';
import backToTop from './modules/backToTop';
import faq from './modules/faq';
import future from './modules/future';
import myProcess from './modules/myProcess';
import evolution from './modules/evolution';
import heading from './modules/heading';

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
  myProcess();

  footer();
  backToTop();
}
