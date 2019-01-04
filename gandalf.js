export default class RRWizard {

  constructor(options) {
    if (!options.icons) {
      throw new Error('Please provide a set of icons to be displayed on the wizard.');
    } else {
      this.icons = options.icons;
      this.percentile = 100 / (this.icons.length - 1);
    }

    if (!options.baseColor) {
      throw new Error('Please provide a color to set as the base color of the wizard.');
    } else {
      this.baseColor = options.baseColor;
    }

    if (!options.activeColor) {
      throw new Error('Please provide a color to set as the active state on the wizard.')
    } else {
      this.activeColor = options.activeColor;
    }

    if (!options.container) {
      throw new Error('Please provide a container selector or element.');
    }

    if (!options.direction) {
      this.direction = 'horizontal';
    } else {
      this.direction = options.direction;
    }

    if (!options.defaultActiveIndex) {
      this.defaultActiveIndex = 0;
    } else {
      this.defaultActiveIndex = options.defaultActiveIndex;
    }

    if (typeof options.container === 'string') {
      this.container = document.querySelector(options.container);
    } else if (options.container.nodeType) {
      this.container = options.container;
    } else {
      throw new Error('Container parameter is not a selector or element');
    }

    this.createIconNodeList();
    this.createWizard();
  }

  createIconNodeList() {
    const imgElements = [];
    this.icons.forEach(icon => {
      const imgElement = document.createElement('img');

      imgElement.src = icon;
      imgElements.push(imgElement);
    });

    this.svgs = imgElements;
  }

  createWizard() {
    const wizardContainer = document.createElement('div');
    const iconContainer = document.createElement('div');
    const wizardLine = document.createElement('div');
    const circles = [];

    wizardContainer.classList.add('rr-wizard');
    iconContainer.classList.add('rr-wizard__icons');
    wizardLine.classList.add('rr-wizard__icons__line');

    iconContainer.appendChild(wizardLine);

    this.svgs.forEach((icon) => {
      const iconWrapper = document.createElement('div');
      const circle = document.createElement('div');

      iconWrapper.classList.add('rr-wizard__icons__icon');
      circle.classList.add('rr-wizard__icons__icon-circle');
      circle.style.backgroundColor = this.baseColor;
      
      circle.appendChild(icon);
      circles.push(circle);

      iconWrapper.appendChild(circle);
      iconContainer.appendChild(iconWrapper);
    });

    this.circles = circles;
    this.wizardLine = wizardLine;

    this.setActive(this.defaultActiveIndex);

    this.wizardContainer = wizardContainer;
    this.iconContainer = iconContainer;
    this.wizardLine = wizardLine;

    if (this.direction === 'vertical') {
      this.setVertical();
    }
    
    wizardContainer.appendChild(iconContainer);
    this.container.appendChild(wizardContainer);
  }

  setActive(circleIdx) {
    if (circleIdx > 0) {
      for (let i = 0; i <= circleIdx; i++) {
        this.circles[i].style.backgroundColor = this.activeColor;
      }
    } else {
      this.circles[circleIdx].style.backgroundColor = this.activeColor;
    }
    this.wizardLine.style.background = 
      `linear-gradient(to ${this.direction === 'vertical' ? 'bottom' : 'right'}, ${this.activeColor} ${this.percentile * circleIdx}%, ${this.baseColor} 0%)`;
  }

  setVertical() {
    this.wizardContainer.style.height = `${this.icons.length * 100}px`;
    this.iconContainer.classList.add('rr-wizard__icons--vertical');
    this.wizardLine.classList.add('rr-wizard__icons__line--vertical');
  }

};