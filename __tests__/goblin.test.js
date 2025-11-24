/** @jest-environment jest-environment-jsdom */
import GoblinManager from '../src/goblin.js';

describe('GoblinManager', () => {
    let container, goblin;

    beforeEach(() => {
        document.body.innerHTML = '<div id="game"><div class="cell"></div><div class="cell"></div></div>';
        container = document.getElementById('game');
        goblin = new GoblinManager(container, 'gnome.png', 1000, {}, () => true);
    });

    test('спавнит гоблина в одной из ячеек', () => {
        goblin.spawnImmediate();
        const images = container.querySelectorAll('img');
        expect(images.length).toBe(1);
        expect(images[0].parentElement.classList.contains('cell')).toBe(true);
    });

    test('handleClickOnCell убирает гоблина и вызывает onHit', () => {
        const onHitMock = jest.fn();
        goblin.onHit = onHitMock;

        goblin._placeInCell(0);
        const cell = container.querySelector('.cell');
        const result = goblin.handleClickOnCell(cell);

        expect(result).toBe(true);
        expect(onHitMock).toHaveBeenCalled();
        expect(container.querySelectorAll('img').length).toBe(1 || 0); // сразу спавн нового
    });

    test('stop очищает таймер и удаляет гоблина', () => {
        goblin._placeInCell(0);
        goblin.stop();
        expect(goblin.imgEl).toBeNull();
    });
});
