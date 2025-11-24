import Grid from './grid.js';
import GoblinManager from './goblin.js';
import Cursor from './cursor.js';
import SoundManager from './sound.js';
import UI from './ui.js';

export default class Game {
  constructor(container, assets, opts = {}) {
    this.container = container;
    this.assets = assets;
    this.opts = opts;
    this.size = opts.size || 4;
    this.maxMisses = opts.maxMisses || 5;
    this.showMs = opts.showMs || 1000;
    this.score = 0;
    this.misses = 0;

    this.grid = new Grid(this.container, this.size);
    this.ui = new UI(this.container);
    this.cursor = new Cursor();
    this.sound = new SoundManager();
    this.goblin = null;
    this.running = false;
    this.currentGameObj = null;
  }

  start() {
    this.ui.createControls();
    this.ui.updateScore(this.score);
    this.grid.create();
    this.cursor.enable();
    this.goblin = new GoblinManager(
      this.container.querySelector('#game'),
      this.assets.gnome,
      this.showMs,
      {
        onHit: () => this._onHit(),
        onMiss: () => this._onMiss(),
      }
    );

    this.grid.onClick((cell) => {
      const hit = this.goblin.handleClickOnCell(cell);
      if (hit) {
        this.sound.playHit();
      }
    });

    this.ui.restartBtn.addEventListener('click', () => {
      this.restart();
    });

    this.goblin.spawnImmediate();
    this.running = true;
  }

  _onHit() {
    this.score += 1;
    this.ui.updateScore(this.score);
  }

  _onMiss() {
    this.misses += 1;
    if (this.misses >= this.maxMisses) {
      this.gameOver();
    }
  }

  gameOver() {
    this.goblin.stop();
    this.cursor.disable();
    this.ui.showGameOver(this.score);
    this.running = false;
  }

  restart() {
    this.ui.clearBanner();
    this.score = 0;
    this.misses = 0;
    this.ui.updateScore(this.score);
    this.grid.remove();
    this.grid.create();
    this.goblin.stop();
    this.goblin = new GoblinManager(
      this.container.querySelector('#game'),
      this.assets.gnome,
      this.showMs,
      {
        onHit: () => this._onHit(),
        onMiss: () => this._onMiss(),
      }
    );
    this.goblin.spawnImmediate();
    this.cursor.enable();
    this.running = true;

    this.grid.onClick((cell) => {
      const hit = this.goblin.handleClickOnCell(cell);
      if (hit) {
        this.sound.playHit();
      }
    });
  }

  stop() {
    if (this.goblin) this.goblin.stop();
    this.cursor.disable();
    this.grid.remove();
    this.ui.clearBanner();
    this.running = false;
  }
}
