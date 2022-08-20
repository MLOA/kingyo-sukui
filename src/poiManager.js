/// <reference types="@types/p5/global" />

import { Poi } from './poi';

export class PoiManager {
  /** @type {(width: number, height: number, size: number) => void} */
  constructor(width, height, size) {
    /** @type {Poi[]} */
    this.pois = new Array();
    this.size = size;
    this.pos = { x: width / 2, y: height / 2 };
    this.color = '#00ff00';
  }

  /** @type {(cursorX: number, cursorY: number, enemies: Enemy[]) => void} */
  update(cursorX, cursorY, enemies) {
    // ポインターの更新
    this.pos.x = cursorX;
    this.pos.y = cursorY;

    // 弾の更新
    this.pois.forEach((poi) => poi.update(enemies));
  }

  draw() {
    // ポインターの描画
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

    // 弾の描画
    this.pois.forEach((poi) => poi.draw());
  }

  /** @type {(posX: number, posY: number) => void} */
  shoot(posX, posY) {
    // console.log('shooting!');
    const poi = new Poi(this, this.size, this.color);
    poi.setPosition(createVector(posX, posY));
    poi.setVelocity(createVector(0, -10));
    this.pois.push(poi);
    this.changeColor();
    // console.log(this.pois);
  }

  /** @type {(targetPoi: Poi) => void} */
  delete(targetPoi) {
    this.pois = this.pois.filter((poi) => poi !== targetPoi);
  }

  changeColor() {
    const colorList = [
      '#b4ff69', // 緑
      '#ff3333', // 赤
      '#6969ff', // 青
      '#ffff69', // 黄
      '#ff69b4', // ピンク
      '#00ffff', // 水
    ];
    this.color = colorList[Math.floor(Math.random() * colorList.length)];
  }
}
