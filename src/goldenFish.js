/// <reference types="@types/p5/global" />

class GoldenFish {
  constructor(width, height, size) {
    this.size = size;
    this.pos = { x: width / 2, y: height - size };
    this.image = loadImage('./assets/img/kingyo.png');
  }

  update(frameCount) {
    const vX = noise(frameCount * 0.005) * width;
    this.pos.x = vX;

    if (this.pos.x < this.size) {
      this.pos.x = this.size;
    } else if (this.pos.x > width - this.size) {
      this.pos.x = width - this.size;
    }
  }

  draw() {
    tint(255, 255);
    image(this.image, this.pos.x, this.pos.y, this.size, this.size);
  }
}
