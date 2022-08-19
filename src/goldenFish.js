/// <reference types="@types/p5/global" />

export class GoldenFish {
  constructor(width, height, size) {
    this.size = size;
    this.collisionSize = size * 0.45;
    this.life = 10;
    this.pos = { x: width / 2, y: height - size };
    this.image = loadImage("./img/kingyo.png");
  }

  update(frameCount, enemies) {
    this.collisionEnemy(enemies);

    // ランダム移動
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
    // ellipse(this.pos.x, this.pos.y, this.collisionSize); // for collision debug
    imageMode(CENTER);
    image(this.image, this.pos.x, this.pos.y, this.size, this.size);
    imageMode(CORNER);
  }

  collisionEnemy(enemies) {
    enemies.map((enemy) => {
      if (
        dist(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y) <
        this.collisionSize
      ) {
        // console.log("GoldenFish.collisionEnemy");
        enemy.destroy();
        this.damage();
      }
    });
  }

  damage() {
    this.life--;
    console.log("goldenFish.life", this.life);
  }
}
