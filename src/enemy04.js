/// <reference types="@types/p5/global" />

import { Enemy } from './enemy';

export class Enemy04 extends Enemy {
  constructor(danmaku, size) {
    super(danmaku, size);
    this._targetPosition = createVector();
  }

  update() {
    let speed = this._velocity.mag();
    this.setVelocity(
      this._velocity
        .add(this._targetPosition.copy().sub(this.pos).normalize().mult(0.1))
        .normalize()
        .mult(speed),
    );
    return super.update();
  }

  draw() {
    noStroke();
    fill(0, 255, 255);
    this.orbits.forEach((orbit, i) => {
      const ratio = i / this.orbits.length;
      fill(0, 255, 255, 255 * ratio);
      this.display(orbit.pos.x, orbit.pos.y, orbit.angle, ratio);
    });
  }

  display(x, y, angle, ratio) {
    push();
    translate(x, y);
    push();
    rotate(angle);
    ellipse(0, 0, 20 * ratio, 20 * ratio);
    pop();
    pop();
  }

  setTargetPosition(position) {
    this._targetPosition = position;
  }
}
