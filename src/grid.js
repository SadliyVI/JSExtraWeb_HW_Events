export default class Grid {
  constructor(container, size = 4) {
    this.container = container;
    this.size = size;
    this.gridEl = null;
  }

  create() {
    const existing = this.container.querySelector('#game');
    if (existing) existing.remove();

    const grid = document.createElement('div');
    grid.id = 'game';
    grid.className = 'game-grid';

    for (let r = 0; r < this.size * this.size; r += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = r;
      grid.append(cell);
    }

    this.container.append(grid);
    this.gridEl = grid;
    return grid;
  }

  onClick(handler) {
    this.gridEl.addEventListener('click', (e) => {
      const cell = e.target.closest('.cell');
      if (!cell) return;
      handler(cell, e);
    });
  }

  getCells() {
    return Array.from(this.gridEl.querySelectorAll('.cell'));
  }

  remove() {
    if (this.gridEl) this.gridEl.remove();
    this.gridEl = null;
  }
}
