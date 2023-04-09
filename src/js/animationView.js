class AnimationView {
  constructor(section) {
    this._section = document.getElementById(`${section}`);
    this._object = this._section.querySelector('object');

    this._object.addEventListener('load', this.observeSection.bind(this));
  }

  playAnimation(entries) {
    const [entry] = entries;

    const svgElement = this._object.contentDocument.querySelector('svg');

    if (!entry.isIntersecting) {
      // Prevent animation from playing if section is not intersected
      svgElement.classList.add('stop-animation');
      return;
    }

    svgElement.classList.remove('stop-animation');

    this.animateContent();
  }

  #sectionObserver = new IntersectionObserver(this.playAnimation.bind(this), {
    // % of section visibility to trigger playAnimation method
    threshold: 0.6,
  });

  #headerObserver = new IntersectionObserver(this.playAnimation.bind(this), {
    rootMargin: '10%',
  });

  animateContent() {
    const contentBox = this._section
      .querySelector('.content-box')
      ?.querySelector('.content-box__text-box');
    if (!contentBox) return;

    const sectionTitle = contentBox.querySelector('.section-title');
    const sectionText = contentBox.querySelector('.section-text');

    sectionTitle.classList.add('section-title--visible');
    sectionText.classList.add('section-text--visible');
  }

  observeSection() {
    this._section.classList.contains('header')
      ? this.#headerObserver.observe(this._section)
      : this.#sectionObserver.observe(this._section);
  }
}

// ! === SECTIONS ===

class Header extends AnimationView {
  constructor() {
    super('header');
  }
}

class About extends AnimationView {
  constructor() {
    super('about');
  }
}

class Goals extends AnimationView {
  constructor() {
    super('goals');
  }
}

class Why extends AnimationView {
  constructor() {
    super('why');
  }
}

class Contact extends AnimationView {
  constructor() {
    super('contact');
  }
}

const HeaderView = new Header();
const AboutSection = new About();
const GoalsSection = new Goals();
const WhySection = new Why();
const ContactSection = new Contact();

export { HeaderView, AboutSection, GoalsSection, WhySection, ContactSection };
