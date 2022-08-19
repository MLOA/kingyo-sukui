/// <reference types="@types/p5/global" />

import { Enemy } from './enemy';

export class Enemy02 extends Enemy {
  constructor(danmaku, size, rotateDirection) {
    super(danmaku, size);
    this.rotateDirection = rotateDirection;
  }

  draw() {
    noStroke();
    fill(255, 255, 0);
    push();
    translate(this.pos.x, this.pos.y);
    push();
    rotate(this._angle);
    // ellipse(-8, -8, 24, 24); // for debug
    translate(-5, -10);
    rotate((this.rotateDirection * frameCount) / 8);
    this.star(0, 0, 10, 20, 5);
    pop();
    pop();
  }

  star(x, y, radius1, radius2, npoints) {
    const angle = TWO_PI / npoints;
    const halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}
