import { gsap } from "gsap";

export class Slider {
  constructor(
    element,
    prevButton,
    nextButton,
    imgArray,
    sliderCounter,
    styles
  ) {
    if (!element || !prevButton || !nextButton) {
      return;
    }

    this.element = element;
    this.prevButton = prevButton;
    this.nextButton = nextButton;
    this.imgArray = imgArray;
    this.sliderCounter = sliderCounter;
    this.index = 0;
    this.isAnimating = false;
    this.styles = styles;
    this.init();
  }

  init() {
    this.prevButton.addEventListener("click", () => this.prev());
    this.nextButton.addEventListener("click", () => this.next());
    this.updateButtonState();
    this.counter();
  }

  updateButtonState = () => {
    if (this.index <= 0) {
      this.prevButton.classList.add(this.styles.disabled);
    } else {
      this.prevButton.classList.remove(this.styles.disabled);
    }
    if (this.index >= this.imgArray.length - 3) {
      this.nextButton.classList.add(this.styles.disabled);
    } else {
      this.nextButton.classList.remove(this.styles.disabled);
    }
  };

  prev = () => {
    if (this.isAnimating) return;
    if (this.index > 0) {
      this.isAnimating = true;
      this.index--;
      const now_x = gsap.getProperty(this.element, "x");
      const width = this.element.offsetWidth;
      gsap.to(this.element, {
        x: now_x + width / 3,
        duration: 0.5,
        ease: "power2.out",
        onStart: () => {
          this.counter();
        },
        onComplete: () => {
          this.isAnimating = false;
          this.updateButtonState();
        },
      });
    }
  };
  next = () => {
    if (this.isAnimating) return;
    if (this.index < this.imgArray.length - 3) {
      this.isAnimating = true;
      this.index++;
      const now_x = gsap.getProperty(this.element, "x");
      const width = this.element.offsetWidth;
      gsap.to(this.element, {
        x: now_x - width / 3,
        duration: 0.5,
        ease: "power2.out",
        onStart: () => {
          this.counter();
        },
        onComplete: () => {
          this.isAnimating = false;
          this.updateButtonState();
        },
      });
    }
  };

  counter = () => {
    this.sliderCounter.innerHTML = "";

    this.imgArray.slice(0, -2).forEach((el, index) => {
      const span = document.createElement("span");
      if (index === this.index) {
        span.classList.add(this.styles["slider__counter-span"]);
        span.classList.add(this.styles.active);
      } else {
        span.className = this.styles["slider__counter-span"];
      }

      this.sliderCounter.appendChild(span);
    });
  };
}
