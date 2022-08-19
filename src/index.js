/// <reference types="@types/p5/global" />

import { sketch } from "p5js-wrapper";

import { Background } from "./background";
import { GoldenFish } from "./goldenFish";
import { PoiManager } from "./poiManager";
import { SpreadDanmakuManager } from "./spreadDanmakuManager";

let danmaku, poi, backgroundLayer, goldenFish, poiManager, danmaku01;

sketch.setup = function () {
  const width = 600;
  const height = 600;
  createCanvas(width, height);
  backgroundLayer = new Background(width, height);
  goldenFish = new GoldenFish(width, height, 100);
  poiManager = new PoiManager(width, height, 50);
  danmaku01 = new SpreadDanmakuManager();
};

sketch.draw = function () {
  background(0);
  backgroundLayer.draw();

  goldenFish.update(frameCount, danmaku01._enemies);
  poiManager.update(mouseX, mouseY, danmaku01._enemies);
  danmaku01.update();

  goldenFish.draw();
  poiManager.draw();
  danmaku01.draw();
};

sketch.mousePressed = function () {
  poiManager.shoot(mouseX, mouseY);
};
