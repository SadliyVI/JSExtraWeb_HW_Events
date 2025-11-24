export default class UI {
  constructor(container) {
    this.container = container;
    this.banner = null;
    this.scoreEl = null;
    this.missEl = null;
    this.restartBtn = null;
  }

  createControls() {
    const wrapper = document.createElement('div');
    wrapper.className = 'controls';

    const score = document.createElement('div');
    score.className = 'score';
    score.textContent = 'Попадания: 0';
    this.scoreEl = score;

    const misses = document.createElement('div');
    misses.className = 'misses';
    misses.textContent = 'Промахи: 0';
    this.missEl = misses;

    const restart = document.createElement('button');
    restart.type = 'button';
    restart.className = 'restart';
    restart.textContent = 'Новая игра';
    this.restartBtn = restart;

    wrapper.append(score, misses, restart);
    this.container.append(wrapper);
  }

  updateScore(n) {
    if (this.scoreEl) this.scoreEl.textContent = `Попадания: ${n}`;
  }

  updateMisses(n) {
    if (this.missEl) this.missEl.textContent = `Промахи: ${n}`;
  }

  showGameOver(score, misses = 0) {
    if (this.banner) this.banner.remove();

    const total = score + misses;
    const percent = total === 0 ? 0 : Math.round((score / total) * 100);

    const ban = document.createElement('div');
    ban.className = 'game-over';
    ban.innerHTML = `<div class="game-over-inner">Удачных попыток: ${percent} %</div>`;
    this.container.append(ban);
    this.banner = ban;
  }

  clearBanner() {
    if (this.banner) this.banner.remove();
    this.banner = null;
  }
}
