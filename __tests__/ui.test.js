/** @jest-environment jest-environment-jsdom */
import UI from '../src/ui.js';

describe('UI', () => {
    let container, ui;

    beforeEach(() => {
        document.body.innerHTML = '<div id="app"></div>';
        container = document.getElementById('app');
        ui = new UI(container);
        ui.createControls();
    });

    test('updateScore обновляет счет', () => {
        ui.updateScore(5);
        expect(ui.scoreEl.textContent).toBe('Попадания: 5');
    });

    test('updateMisses обновляет промахи', () => {
        ui.updateMisses(3);
        expect(ui.missEl.textContent).toBe('Промахи: 3');
    });

    test('showGameOver показывает баннер с процентом', () => {
        ui.showGameOver(3, 2);
        expect(container.querySelector('.game-over')).not.toBeNull();
        expect(container.querySelector('.game-over-inner').textContent).toContain('60');
    });

    test('clearBanner удаляет баннер', () => {
        ui.showGameOver(1, 1);
        ui.clearBanner();
        expect(container.querySelector('.game-over')).toBeNull();
    });
});
