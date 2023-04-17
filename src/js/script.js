// import { HeaderView, AboutSection, GoalsSection, WhySection, ContactSection } from "./animationView"

const dynamicHeaderImageHeight = function () {
  const headerImage = document.querySelector('.header__title--svg-image');

  // | Without "load" window event so that users can't see flickering that occurs for a brief moment
  headerImage.style.height = `${
    headerImage.getBoundingClientRect().width / 1.52
  }px`;

  window.addEventListener('resize', () => {
    headerImage.style.height = `${
      headerImage.getBoundingClientRect().width / 1.52
    }px`;
  });
};

const mobileNavigationListener = function () {
  const nav = document.querySelector('nav');
  const navBtn = document.querySelector('.nav-menu__button');
  navBtn.addEventListener('click', (e) => {
    const btnParent = e.target.closest('.nav-menu__button');
    const btnChildren = btnParent.querySelectorAll('*');

    btnChildren.forEach((btnChild) => {
      btnChild.classList.toggle('active');
    });
    btnParent.classList.toggle('box--active');
    nav.classList.toggle('nav--visible');
  });
};

const sectionsObservers = function () {

  const displayContent = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    // Upon intersection remove hidden classes.
    const contentParent = entry.target.querySelector('.content-box__text-box');
    contentParent.querySelector('.section-title').classList.remove('hidden');
    contentParent.querySelector('.section-text').classList.remove('hidden');

    // Unobserve section as it is not needed to observe it any further.
    observer.unobserve(entry.target);
  };

  const sectionObserver = new IntersectionObserver(displayContent, {
    threshold: 0.6,
  });
  
  const sections = document.querySelectorAll('section');
  sections.forEach(section => sectionObserver.observe(section));
};

const init = function () {
  dynamicHeaderImageHeight();
  mobileNavigationListener();
  sectionsObservers();
  /*
  const sections = [HeaderView, AboutSection, GoalsSection, WhySection, ContactSection];
  sections.forEach(section => section.observeSection());  
  */
};

init();
