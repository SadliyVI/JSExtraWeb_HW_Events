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

    this.grid = null;
    this.ui = new UI(this.container);
    this.cursor = new Cursor();
    this.sound = new SoundManager();
    this.goblin = null;
    this.running = false;
  }

  start() {
    this.ui.createControls();
    this.ui.updateScore(this.score);
    this.ui.updateMisses(this.misses);

    let gridContainer = this.container.querySelector('#game-container');
    if (!gridContainer) {
      gridContainer = document.createElement('div');
      gridContainer.id = 'game-container';
      this.container.append(gridContainer);
    }

    this.grid = new Grid(gridContainer, this.size);
    this.grid.create();
    this.cursor.enable();

    this.running = true;

    this.goblin = new GoblinManager(
      gridContainer.querySelector('#game'),
      this.assets.gnome,
      this.showMs,
      {
        onHit: () => this._onHit(),
        onMiss: () => this._onMiss(),
      },
      () => this.running
    );

    this.grid.onClick((cell) => {
      if (!this.running) return;
      const hit = this.goblin.handleClickOnCell(cell);
      if (hit) {
        this.sound.playHit();
      }
    });

    this.ui.restartBtn.addEventListener('click', () => {
      this.restart();
    });

    this.goblin.spawnImmediate();
  }

  _onHit() {
    if (!this.running) return;
    this.score += 1;
    this.ui.updateScore(this.score);
  }

  _onMiss() {
    if (!this.running) return;
    this.misses += 1;
    this.ui.updateMisses(this.misses);

    if (this.misses >= this.maxMisses) {
      this.gameOver();
    }
  }

  gameOver() {
    this.running = false;
    if (this.goblin) this.goblin.stop();
    this.cursor.disable();
    this.ui.showGameOver(this.score, this.misses);
  }

  restart() {
    this.ui.clearBanner();
    this.score = 0;
    this.misses = 0;
    this.ui.updateScore(this.score);
    this.ui.updateMisses(this.misses);

    if (this.grid) this.grid.remove();

    let gridContainer = this.container.querySelector('#game-container');
    this.grid = new Grid(gridContainer, this.size);
    this.grid.create();

    if (this.goblin) this.goblin.stop();

    this.running = true;

    this.goblin = new GoblinManager(
      gridContainer.querySelector('#game'),
      this.assets.gnome,
      this.showMs,
      {
        onHit: () => this._onHit(),
        onMiss: () => this._onMiss(),
      },
      () => this.running
    );

    this.grid.onClick((cell) => {
      if (!this.running) return;
      const hit = this.goblin.handleClickOnCell(cell);
      if (hit) {
        this.sound.playHit();
      }
    });

    this.goblin.spawnImmediate();
    this.cursor.enable();
  }

  stop() {
    if (this.goblin) this.goblin.stop();
    this.cursor.disable();
    if (this.grid) this.grid.remove();
    this.ui.clearBanner();
    this.running = false;
  }
}
