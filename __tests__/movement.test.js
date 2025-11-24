/** @jest-environment jest-environment-jsdom */

import { main } from '../src/index.js';

describe('Инициализация игрового поля', () => {
    let app;

    beforeEach(() => {
        document.body.innerHTML = '';
        app = document.createElement('div');
        app.id = 'app';
        document.body.appendChild(app);
    });

    test('должно создаться 16 ячеек 4×4', () => {
        main();
        const cells = document.querySelectorAll('.cell');
        expect(cells.length).toBe(16);
    });

    test('должен создаться только один элемент <img>', () => {
        main();
        const images = document.querySelectorAll('.cell img');
        expect(images.length).toBe(1);
    });

    test('элемент <img> должен находиться внутри только одной из ячеек', () => {
        main();
        const img = document.querySelector('img');
        expect(img).not.toBeNull();
        expect(img.parentElement.classList.contains('cell')).toBe(true);
    });
});
