// This functionality isn't completely finished. Because of time constraints it might be added later.
class AnimationView {
  constructor(section) {
    this._section = document.getElementById(`${section}`);
    this._object = this._section.querySelector('object');
  }

  #svgElement;
  #objectLoaded = false;

  /**
   *
   * @param {[]} entries array of entries passed from Intersection Observer API, each element is an object containing info about section intersection state
   * @returns null
   */
  playAnimation(entries, observer) {
    const [entry] = entries;
    
    
    // Add event listener for an object load - if it loads, set the #objectLoaded to true
    this._object.addEventListener(
      'load',
      (() => {
        // Define svgElement
        this.#svgElement = this._object.contentDocument.querySelector('svg');
        // If the user is currently intersecting and an element loads, add the animation (else it'd be in initial state as long as user doesn't enter the section again)
        entry.isIntersecting && this.#svgElement.classList.remove('stop-animation');

        // Set#objectLoaded to true
        this.#objectLoaded = true
      }).bind(this)
    );

    // If object has loaded and section is intersected animate SVG image
    
      if(this.#objectLoaded && !entry.isIntersecting) this.#svgElement.classList.add('stop-animation');
      if(this.#objectLoaded && entry.isIntersecting) this.#svgElement.classList.remove('stop-animation');

    

    // Return when the section isn't intersected
    if (!entry.isIntersecting) return;
  
    // Animate text content (heading, paragraph) upon section intersection (first-time section "visit")
    this.#animateContent();
  }

  #animateContent() {
    // Check if a section contains contentBox. Guard clause implemented for header section which does not contain this box.
    const contentBox = this._section
      .querySelector('.content-box')
      ?.querySelector('.content-box__text-box');
    if (!contentBox) return;

    // Animate suitable content with proper animation
    const sectionTitle = contentBox.querySelector('.section-title');
    const sectionText = contentBox.querySelector('.section-text');

    sectionTitle.classList.add('section-title--visible');
    sectionText.classList.add('section-text--visible');
  }

  #sectionObserver = new IntersectionObserver(this.playAnimation.bind(this), {
    // % of section visibility to trigger playAnimation method
    // rootMargin: '-10%',
    threshold: .9,
  });

  observeSection() {
    this.#sectionObserver.observe(this._section);
  }
}

// ! === SECTIONS ===

class Header extends AnimationView {
  constructor() {
    super('header');
  }

  #sectionObserver = new IntersectionObserver(this.playAnimation.bind(this), {
    // % of section visibility to trigger playAnimation method
    rootMargin: '-10%',
  });

  observeSection() {
    this.#sectionObserver.observe(this._section);
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

class Purpose extends AnimationView {
  constructor() {
    super('purpose');
  }
}

class Contact extends AnimationView {
  constructor() {
    super('contact');
  }
}

/*
const HeaderView = new Header();
const AboutSection = new About();
const GoalsSection = new Goals();
const PurposeSection = new Purpose();
const ContactSection = new Contact();

export { HeaderView, AboutSection, GoalsSection, PurposeSection, ContactSection };
*/