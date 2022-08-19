/// <reference types="@types/p5/global" />

import { Enemy } from "./enemy";

export class GoldenFish {
  constructor(width, height, size) {
    this.size = size;
    this.collisionSize = size * 0.45;
    this.life = 10;
    this.pos = { x: width / 2, y: height - size };
    this.image = loadImage("./img/kingyo.png");
    this.isInvincible = false;
    this.defaultInvincibleTime = 5 * 60; // 300frame
    this.invincibleTime = this.defaultInvincibleTime;
    this.isBlinking = false;
  }

  /** @type {(frameCount: number, enemies: Enemy[]) => void} */
  update(frameCount, enemies) {
    if (!this.isInvincible) {
      this.collisionEnemy(enemies);
    } else {
      this.invincibleTime--;
      if (this.invincibleTime < 1) {
        this.isInvincible = false;
        this.invincibleTime = this.defaultInvincibleTime;
        console.log("isInvincible", this.isInvincible);
      }
    }

    this.blink();

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
    // ellipse(this.pos.x, this.pos.y, this.collisionSize); // for collision debug
    imageMode(CENTER);
    if (this.isInvincible && this.isBlinking) {
      tint(255, 50);
    } else {
      tint(255, 255);
    }
    image(this.image, this.pos.x, this.pos.y, this.size, this.size);
    imageMode(CORNER);
  }

  /** @type {(enemies: Enemy[]) => void} */
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
    this.isInvincible = true;
    console.log("goldenFish.life", this.life);
  }

  blink() {
    if (this.isInvincible && frameCount % 10 == 0) {
      this.isBlinking = !this.isBlinking;
    }
  }
}
