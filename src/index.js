import './index.css';
import gnomeSrc from './assets/gnome.png';
import Game from './game.js';

export function main(appContainer = document.getElementById('app')) {
  if (!appContainer) return null;

  const game = new Game(
    appContainer,
    { gnome: gnomeSrc },
    {
      size: 4,
      showMs: 1000,
      maxMisses: 5,
    }
  );

  game.start();
  return game;
}

if (typeof jest === 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const gameInstance = main();
      window.game = gameInstance;
    });
  } else {
    window.game = main();
  }
}

export default main;
