/// <reference types="@types/p5/global" />

import { sketch } from 'p5js-wrapper';
import html2canvas from 'html2canvas';

import { Background } from './background';
import { GoldenFish } from './goldenFish';
import { PoiManager } from './poiManager';
import { DanmakuManagerRotate } from './danmakuManagerRotate';
import { DanmakuManagerSpread } from './danmakuManagerSpread';
import { DanmakuManagerStraight } from './danmakuManagerStraight';
import { DanmakuManagerHoming } from './danmakuManagerHoming';
import { DanmakuManager } from './danmakuManager';

/** @type {Background} */
let backgroundLayer;
/** @type {GoldenFish} */
let goldenFish;
/** @type {PoiManager} */
let poiManager;
/** @type {DanmakuManager[]} */
let danmakuManagers = [];

const width = 800;
const height = 800;
let isStarted = false;
let isFinished = false;
let score = 0;

const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => startGame());

const reStartButton = document.querySelector('.restart-button');
reStartButton.addEventListener('click', () => restartGame());

const tweetButton = document.querySelector('.tweet-button');
tweetButton.addEventListener('click', () => tweet());

const titleElm = document.querySelector('.title');
const playingScoreElm = document.querySelector('.playing-score');
const scoreElm = document.querySelector('.score');
const scoreValueElm = document.querySelector('.score-value');
const lifeElm = document.querySelector('.life');
const audioElm = document.querySelector('.bgm');
const hitAudioElm = document.querySelector('.hit');

sketch.setup = function () {
  frameRate(60);
  const canvas = createCanvas(width, height);
  canvas.parent('game');
  score = 0;
  backgroundLayer = new Background(width, height);
  goldenFish = new GoldenFish(width, height, 100, () => {
    hitAudioElm.play();
    if (goldenFish.life == 0) {
      finishGame();
    }
    drawLife();
  });
  drawLife();
  poiManager = new PoiManager(width, height, 30);
  danmakuManagers = [];
};

sketch.draw = function () {
  background(0);
  backgroundLayer.draw();

  if (!isPlaying()) return;
  if (frameCount % (60 * 2) === 0) {
    spawnDanmaku();
  }

  const mergedEnemies = danmakuManagers
    .map((danmakuManager) => danmakuManager._enemies)
    .flat();
  goldenFish.update(frameCount, mergedEnemies);
  poiManager.update(mouseX, mouseY, mergedEnemies);
  danmakuManagers.forEach((danmakuManager) => danmakuManager.update());

  goldenFish.draw();
  poiManager.draw();
  danmakuManagers.forEach((danmakuManager) => danmakuManager.draw());

  drawScore(score++);
};

sketch.mousePressed = function () {
  if (!isPlaying()) return;
  poiManager.shoot(mouseX, mouseY);
};

const isPlaying = () => {
  return isStarted && !isFinished;
};

const startGame = () => {
  console.log('Start Game');
  sketch.setup();
  isStarted = true;
  isFinished = false;
  titleElm.classList.add('invisible');
  playingScoreElm.classList.remove('invisible');
  lifeElm.classList.remove('invisible');
  audioElm.play();
};

/** @type {(score: number) => void} */
const finishGame = () => {
  console.log('Finish Game');
  isStarted = false;
  isFinished = true;
  scoreElm.classList.remove('invisible');
  playingScoreElm.classList.add('invisible');
  lifeElm.classList.add('invisible');
  audioElm.pause();
  audioElm.currentTime = 0;
};

const restartGame = () => {
  scoreElm.classList.add('invisible');
  startGame();
};

const drawLife = () => {
  let life = '';
  new Array(goldenFish.life).fill().map(() => {
    life += '<span class="kingyo"></span>';
  });
  lifeElm.innerHTML = life;
};

const drawScore = (score) => {
  playingScoreElm.textContent = score;
  scoreValueElm.textContent = score;
};

const screenshot = () => {
  html2canvas(document.querySelector('#game')).then((canvasForScreenshot) => {
    const screenshots = document.querySelector('.screenshots');
    screenshots.appendChild(canvasForScreenshot);
  });
};

const tweet = () => {
  screenshot();

  const text = `わたしは ${score} の間\n金魚を救うことができました！`;
  const url = 'https://mloa.github.io/kingyo-sukui/';
  const hashtags = ['金魚救い', 'ツクアソ'].join(',');

  window.open(
    'https://twitter.com/intent/tweet?' +
      [
        'text=' + encodeURIComponent(text),
        'hashtags=' + encodeURIComponent(hashtags),
        'url=' + encodeURIComponent(url),
      ].join('&'),
    '',
    'width=600,height=400,scrollbars=no',
  );
};

const spawnDanmaku = () => {
  danmakuManagers = danmakuManagers.filter(
    (danmakuManager) => danmakuManager.isAlive,
  );
  if (danmakuManagers.length > 1) return;
  console.log('spawn');
  const rand = Math.floor(random(4));
  switch (rand) {
    case 0:
      danmakuManagers.push(new DanmakuManagerStraight(random(width), 0));
      break;
    case 1:
      danmakuManagers.push(
        new DanmakuManagerRotate(random(width), random(0, height / 4)),
      );
      break;
    case 2:
      danmakuManagers.push(
        new DanmakuManagerSpread(random(width), random(height / 3)),
      );
      break;
    case 3:
      danmakuManagers.push(
        new DanmakuManagerHoming(random(width), random(height / 5), goldenFish),
      );
      break;
  }
};
