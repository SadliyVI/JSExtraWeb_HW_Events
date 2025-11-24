/** @jest-environment jest-environment-jsdom */
import Grid from '../src/grid.js';

describe('Grid', () => {
    let container, grid;

    beforeEach(() => {
        document.body.innerHTML = '<div id="container"></div>';
        container = document.getElementById('container');
        grid = new Grid(container, 4);
    });

    test('создаёт 16 ячеек', () => {
        grid.create();
        expect(container.querySelectorAll('.cell').length).toBe(16);
    });

    test('remove удаляет сетку', () => {
        grid.create();
        grid.remove();
        expect(container.querySelector('#game')).toBeNull();
    });

    test('onClick вызывается при клике на ячейку', () => {
        grid.create();
        const handler = jest.fn();
        grid.onClick(handler);

        const cell = container.querySelector('.cell');
        cell.click();
        expect(handler).toHaveBeenCalled();
    });
});
