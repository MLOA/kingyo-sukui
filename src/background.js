/// <reference types="@types/p5/global" />

const COMETS_COUNT = 10;

export class Background {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    const cometImages = this.loadCometImages();
    this.comets = new Array(COMETS_COUNT).fill().map(() => ({
      x: random(width),
      y: random(500) * -1,
      size: random(200) + 20,
      speed: random(5) + 1,
      alpha: random(130),
      image: cometImages[Math.floor(Math.random() * cometImages.length)],
    }));
  }

  loadCometImages() {
    const cometImages = [];
    cometImages.push(loadImage('./img/comets/comet1.png'));
    cometImages.push(loadImage('./img/comets/comet2.png'));
    cometImages.push(loadImage('./img/comets/comet3.png'));
    cometImages.push(loadImage('./img/comets/comet4.png'));
    cometImages.push(loadImage('./img/comets/comet5.png'));
    cometImages.push(loadImage('./img/comets/comet6.png'));
    cometImages.push(loadImage('./img/comets/comet7.png'));
    cometImages.push(loadImage('./img/comets/comet8.png'));
    return cometImages;
  }

  draw() {
    this.comets.forEach((comet) => {
      comet.y += comet.speed;
      if (comet.y > this.height) {
        comet.y = -comet.size - random(500);
        comet.speed = random(5);
      }
      noStroke();
      tint(255, comet.alpha);
      // ellipse(comet.x, comet.y, comet.size, comet.size);
      image(comet.image, comet.x, comet.y, comet.size, comet.size);
    });
  }
}
