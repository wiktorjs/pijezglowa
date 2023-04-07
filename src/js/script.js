
import {AboutSection, GoalsSection} from "./animationView"

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


const init = function () {
  dynamicHeaderImageHeight();
  mobileNavigationListener();
//   animationView.sectionsoObserversHandler('about', 'object-about');
};

init();
