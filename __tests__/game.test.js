/** @jest-environment jest-environment-jsdom */
import { main } from '../src/index.js';

describe('Game: логика игры', () => {
    let app;
    let game;

    beforeEach(() => {
        document.body.innerHTML = '';
        app = document.createElement('div');
        app.id = 'app';
        document.body.appendChild(app);
        game = main();
    });

    test('игра стартует и running = true', () => {
        expect(game.running).toBe(true);
    });

    test('кнопка "Новая игра" перезапускает игру', () => {
        game.ui.restartBtn.click();
        expect(game.running).toBe(true);
        expect(parseInt(document.querySelector('.score').textContent.replace(/\D/g, ''))).toBe(0);
        expect(parseInt(document.querySelector('.misses').textContent.replace(/\D/g, ''))).toBe(0);
    });

    test('игра останавливается после maxMisses', () => {
        for (let i = 0; i < game.maxMisses; i++) {
            game._onMiss(); // напрямую вызываем промах
        }

        expect(game.running).toBe(false);
        expect(document.querySelector('.game-over')).not.toBeNull();
    });
});
