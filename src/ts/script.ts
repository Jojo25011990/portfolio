import intro from './modules/intro';
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
import myProcess from './modules/myProcess';
import showcase from './modules/showcase';
import evolution from './modules/evolution';
// import activity from './modules/activity';
import game from './modules/game';
import milestones from './modules/milestones';
import heading from './modules/heading';
import description from './modules/description';
// import myStory from './modules/myStory';

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  //   intro();

  heading();
  description();

  header();
  skillsHeading();
  projects();
  services();
  features();
  evolution();
  future();
  milestones();
  faq();
  game();
  showcase();
  footer();
  backToTop();
  myProcess();
}
