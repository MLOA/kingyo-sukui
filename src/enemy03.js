/// <reference types="@types/p5/global" />

import { Enemy } from './enemy';

export class Enemy03 extends Enemy {
  constructor(danmaku, size) {
    super(danmaku, size);
  }

  draw() {
    noStroke();
    fill(0, 0, 255);
    push();
    translate(this.pos.x, this.pos.y);
    push();
    rotate(this._angle);
    ellipse(-8, -8, 24, 24); // for debug
    this.polygon(-8, -8, 20, 7);
    pop();
    pop();
  }

  polygon(x, y, radius, npoints) {
    const angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      const sx = x + cos(a) * radius;
      const sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}
