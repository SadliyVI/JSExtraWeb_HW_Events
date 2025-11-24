import './index.css';
import gnomeSrc from './assets/gnome.png';

const SIZE = 4;
export const MOVE_INTERVAL_MS = 3000;

export function createGrid(container) {
  const grid = document.createElement('div');
  grid.id = 'game';

  for (let r = 0; r < SIZE * SIZE; r += 1) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = r;
    grid.append(cell);
  }

  container.append(grid);
  return grid;
}

export function placeGnomeInitially(grid, img) {
  const cells = Array.from(grid.querySelectorAll('.cell'));
  const idx = Math.floor(Math.random() * cells.length);
  cells[idx].append(img);
  return idx;
}

export function startMoving(grid, img, initialIndex) {
  const cells = Array.from(grid.querySelectorAll('.cell'));
  let currentIndex = initialIndex;
  const max = cells.length;

  const intervalId = setInterval(() => {
    const nextIndex = Math.floor(Math.random() * max);
    if (nextIndex !== currentIndex) {
      cells[nextIndex].append(img);
      currentIndex = nextIndex;
    }
  }, MOVE_INTERVAL_MS);

  return function stopMoving() {
    clearInterval(intervalId);
  };
}

export function main(appContainer = document.getElementById('app')) {
  if (!appContainer) return;

  const grid = createGrid(appContainer);

  const img = document.createElement('img');
  img.src = gnomeSrc;
  img.alt = 'gnome';

  const initial = placeGnomeInitially(grid, img);

  const stopMoving = startMoving(grid, img, initial);

  return { stopMoving };
}

if (typeof jest === 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const { stopMoving } = main();

      setTimeout(() => {
        stopMoving();
        console.log('Игра автоматически остановлена через 10 секунд!');
      }, 10000);
    });
  } else {
    const { stopMoving } = main();

    setTimeout(() => {
      stopMoving();
      console.log('Игра автоматически остановлена через 10 секунд!');
    }, 10000);
  }
}
