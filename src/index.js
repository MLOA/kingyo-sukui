/// <reference types="@types/p5/global" />

import { sketch } from "p5js-wrapper";

import { Background } from "./background";
import { GoldenFish } from "./goldenFish";
import { PoiManager } from "./poiManager";
import { DanmakuManagerRotate } from "./danmakuManagerRotate";
import { DanmakuManagerSpread } from "./danmakuManagerSpread";

/** @type {Background} */
let backgroundLayer;
/** @type {GoldenFish} */
let goldenFish;
/** @type {PoiManager} */
let poiManager;
/** @type {DanmakuManagerRotate} */
let danmaku01;
/** @type {DanmakuManagerSpread} */
let danmaku02;

sketch.setup = function () {
  const width = 600;
  const height = 600;
  createCanvas(width, height);
  backgroundLayer = new Background(width, height);
  goldenFish = new GoldenFish(width, height, 100);
  poiManager = new PoiManager(width, height, 50);
  danmaku01 = new DanmakuManagerRotate();
  danmaku02 = new DanmakuManagerSpread();
};

sketch.draw = function () {
  background(0);
  backgroundLayer.draw();

  const mergedEnemies = [...danmaku01._enemies, ...danmaku02._enemies];
  goldenFish.update(frameCount, mergedEnemies);
  poiManager.update(mouseX, mouseY, mergedEnemies);
  danmaku01.update();
  danmaku02.update();

  goldenFish.draw();
  poiManager.draw();
  danmaku01.draw();
  danmaku02.draw();
};

sketch.mousePressed = function () {
  poiManager.shoot(mouseX, mouseY);
};
