export default class GoblinManager {
  constructor(gridEl, gnomeSrc, showMs = 1000, handlers = {}, isRunning = () => true) {
    this.gridEl = gridEl;
    this.gnomeSrc = gnomeSrc;
    this.showMs = showMs;
    this.currentIndex = null;
    this.lastIndex = null; // индекс предыдущей ячейки
    this.timerId = null;
    this.imgEl = null;
    this.onMiss = handlers.onMiss || (() => {});
    this.onHit = handlers.onHit || (() => {});
    this.isRunning = isRunning;
  }

  spawnImmediate() {
    this._spawn();
  }

  getNextIndex() {
    const cells = Array.from(this.gridEl.querySelectorAll('.cell'));
    if (cells.length === 0) return null;

    let idx;
    do {
      idx = Math.floor(Math.random() * cells.length);
    } while (idx === this.lastIndex && cells.length > 1);

    this.lastIndex = idx;
    return idx;
  }

  _spawn() {
    if (!this.isRunning()) return;

    const cells = Array.from(this.gridEl.querySelectorAll('.cell'));
    if (cells.length === 0) return;

    const idx = this.getNextIndex();
    this._placeInCell(idx);

    if (this.timerId) clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      if (!this.isRunning()) return;
      if (this.imgEl && this.imgEl.parentElement) {
        this._removeFromCell();
        this.onMiss();
      }
      this._spawn();
    }, this.showMs);
  }

  _placeInCell(idx) {
    const cells = Array.from(this.gridEl.querySelectorAll('.cell'));
    const target = cells[idx];
    const img = document.createElement('img');
    img.src = this.gnomeSrc;
    img.alt = 'gnome';
    img.dataset.goblin = '1';
    target.append(img);
    this.imgEl = img;
    this.currentIndex = idx;
  }

  handleClickOnCell(cell) {
    if (!this.imgEl) return false;
    if (cell.contains(this.imgEl)) {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      this._removeFromCell();
      if (this.isRunning()) this.onHit();
      this._spawn();
      return true;
    }
    return false;
  }

  _removeFromCell() {
    if (this.imgEl && this.imgEl.parentElement) {
      this.imgEl.remove();
    }
    this.imgEl = null;
    this.currentIndex = null;
  }

  stop() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this._removeFromCell();
  }
}
