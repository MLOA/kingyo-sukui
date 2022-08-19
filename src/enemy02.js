/// <reference types="@types/p5/global" />

import { Enemy } from './enemy';

export class Enemy02 extends Enemy {
  constructor(danmaku, size) {
    super(danmaku, size);
  }

  draw() {
    noStroke();
    this.orbits.forEach((orbit, i) => {
      const ratio = i / this.orbits.length;
      fill(0, 255, 0, 255 * ratio);
      this.display(orbit.pos.x, orbit.pos.y, orbit._angle, ratio);
    });
  }

  display(x, y, angle, ratio) {
    push();
    translate(x, y);
    push();
    rotate(angle);
    ellipse(-8, -8, 20 * ratio, 20 * ratio);
    pop();
    pop();
  }
}
