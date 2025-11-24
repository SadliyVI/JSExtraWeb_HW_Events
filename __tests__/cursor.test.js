/** @jest-environment jest-environment-jsdom */
import Cursor from '../src/cursor.js';

describe('Cursor', () => {
    let cursor;

    beforeEach(() => {
        cursor = new Cursor();
        document.body.innerHTML = '<div id="body"></div>';
    });

    test('enable устанавливает кастомный курсор', () => {
        cursor.enable(document.body);
        expect(document.body.style.cursor).toContain('url');
    });

    test('disable сбрасывает курсор', () => {
        cursor.enable(document.body);
        cursor.disable(document.body);
        expect(document.body.style.cursor).toBe('');
    });
});
