/// <reference types="@types/p5/global" />

import { sketch } from "p5js-wrapper";

import { Background } from "./background";
import { GoldenFish } from "./goldenFish";
import { PoiManager } from "./poiManager";
import { DanmakuManagerRotate } from "./danmakuManagerRotate";
import { DanmakuManagerSpread } from "./danmakuManagerSpread";
import { DanmakuManagerStraight } from "./danmakuManagerStraight";
import { DanmakuManager } from "./danmakuManager";

/** @type {Background} */
let backgroundLayer;
/** @type {GoldenFish} */
let goldenFish;
/** @type {PoiManager} */
let poiManager;
/** @type {DanmakuManager[]} */
let danmakuManagers = [];

sketch.setup = function () {
  const width = 600;
  const height = 600;
  createCanvas(width, height);
  backgroundLayer = new Background(width, height);
  goldenFish = new GoldenFish(width, height, 100);
  poiManager = new PoiManager(width, height, 50);
  danmakuManagers = [
    new DanmakuManagerRotate(),
    new DanmakuManagerSpread(),
    new DanmakuManagerStraight(),
  ];
};

sketch.draw = function () {
  background(0);
  backgroundLayer.draw();

  const mergedEnemies = danmakuManagers
    .map((danmakuManager) => danmakuManager._enemies)
    .flat();

  // [
  //   ...danmaku01._enemies,
  //   ...danmaku02._enemies,
  //   ...danmaku03._enemies,
  // ];
  goldenFish.update(frameCount, mergedEnemies);
  poiManager.update(mouseX, mouseY, mergedEnemies);
  danmakuManagers.forEach((danmakuManager) => danmakuManager.update());

  goldenFish.draw();
  poiManager.draw();
  danmakuManagers.forEach((danmakuManager) => danmakuManager.draw());
};

sketch.mousePressed = function () {
  poiManager.shoot(mouseX, mouseY);
};
