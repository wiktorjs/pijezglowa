class AnimationView {
  constructor(section, animation) {
    this._section = document.getElementById(`${section}`);
    this._object = this._section.querySelector('object');
    this._animation = animation;

    this._object.addEventListener('load', this.observeSection.bind(this));
  }

  playAnimation(entries) {
    const [entry] = entries;

    const svgElement = this._object.contentDocument.querySelector('svg');

    console.log(entry.isIntersecting)
    if (!entry.isIntersecting) {
        // Prevent animation from playing if section is not intersected
        svgElement.classList.add('stop-animation');
        return
    };

    svgElement.classList.remove('stop-animation');

  }

  sectionObserver = new IntersectionObserver(this.playAnimation.bind(this), {
    // % of section visibility to trigger playAnimation method
    threshold: 0.6,
  });

  observeSection() {
    this.sectionObserver.observe(this._section);
  }
}

// ! === SECTIONS ===

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

const AboutSection = new About();
const GoalsSection = new Goals();

export { AboutSection, GoalsSection };
