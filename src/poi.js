/// <reference types="@types/p5/global" />

import { Enemy } from './enemy';
import { PoiManager } from './poiManager';

export class Poi {
  /** @type {(poiManager: PoiManager, size: number, color: string) => void} */
  constructor(poiManager, size, color) {
    this.poiManager = poiManager;
    this.pos = createVector(); // 座標
    this.velocity = createVector(); // 移動ベクトル
    this.angle = 0; // 向き
    this.size = size;
    this.color = color;
  }

  /** @type {(enemies: Enemy[]) => void} */
  update(enemies) {
    this.pos.add(this.velocity);
    this.collisionField();
    this.collisionEnemy(enemies);
  }

  draw() {
    // console.log('poi', 'draw');
    stroke(this.color);
    fill(this.color);
    rectMode(CENTER);

    const stickHeight = this.size / 1.5;

    // 柄
    rect(
      this.pos.x,
      this.pos.y + this.size / 2 + stickHeight / 2,
      this.size / 5,
      stickHeight,
      10,
    );

    // 上部のポチ
    ellipse(
      this.pos.x,
      this.pos.y - this.size / 2.4 - 1,
      this.size / 10,
      this.size / 20,
    );

    // 柄の丸い部分
    ellipse(
      this.pos.x,
      this.pos.y + this.size / 2 + this.size / 2.4 + stickHeight / 2 - 1,
      this.size / 5 + 2,
      this.size / 5 + 2,
    );

    // 柄の穴
    fill(0);
    ellipse(
      this.pos.x,
      this.pos.y + this.size / 2 + this.size / 2.4 + stickHeight / 2 - 1,
      5,
      5,
    );

    stroke(this.color);
    fill(255, 255, 255, 100);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  collisionField() {
    if (
      this.pos.x > 0 &&
      this.pos.x < width &&
      this.pos.y > 0 &&
      this.pos.y < height
    ) {
      return;
    }
    this.destroy();
  }

  collisionEnemy(enemies) {
    enemies.map((enemy) => {
      if (
        dist(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y) <
        this.size / 2 + enemy.size / 2
      ) {
        // console.log('Poi.collisionEnemy');
        const explosionAudioElm = document.querySelector('.explosion');
        explosionAudioElm.currentTime = 0;
        explosionAudioElm.play();
        enemy.destroy();
        this.destroy();
      }
    });
  }

  destroy() {
    this.poiManager.delete(this);
  }

  setPosition(position) {
    this.pos = position;
  }

  setVelocity(velocity) {
    this.velocity = velocity;
    this._angle = this.velocity.heading();
  }
}
