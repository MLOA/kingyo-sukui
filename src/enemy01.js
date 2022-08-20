/// <reference types="@types/p5/global" />

import { Enemy } from './enemy';

export class Enemy01 extends Enemy {
  constructor(danmaku, size) {
    super(danmaku, size);
  }

  draw() {
    noStroke();
    fill(255, 0, 0, 255);
    ellipse(this.pos.x, this.pos.y, 10, 10);
    this.orbits.forEach((orbit, i) => {
      const ratio = i / this.orbits.length;
      fill(255, 0, 0, 255 * ratio);
      ellipse(orbit.pos.x, orbit.pos.y, 10 * ratio, 10 * ratio);
    });
  }
}
