export default class UI {
  constructor(container) {
    this.container = container;
    this.banner = null;
    this.scoreEl = null;
    this.restartBtn = null;
  }

  createControls() {
    const wrapper = document.createElement('div');
    wrapper.className = 'controls';

    const score = document.createElement('div');
    score.className = 'score';
    score.textContent = 'Очки: 0';
    this.scoreEl = score;

    const restart = document.createElement('button');
    restart.type = 'button';
    restart.className = 'restart';
    restart.textContent = 'Новая игра';
    this.restartBtn = restart;

    wrapper.append(score, restart);
    this.container.append(wrapper);
  }

  updateScore(n) {
    if (this.scoreEl) this.scoreEl.textContent = `Попадания: ${n}`;
  }

  showGameOver(score) {
    if (this.banner) this.banner.remove();

    const ban = document.createElement('div');
    ban.className = 'game-over';
    ban.innerHTML = `<div class="game-over-inner">Ваш результат: ${score} попаданий!</div>`;
    this.container.append(ban);
    this.banner = ban;
  }

  clearBanner() {
    if (this.banner) this.banner.remove();
    this.banner = null;
  }
}
