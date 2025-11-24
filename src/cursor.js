import hammerSrc from './assets/hammer.png';

export default class Cursor {
  constructor() {
    this.hammer = hammerSrc;
  }

  enable(body = document.body) {
    body.style.cursor = `url(${this.hammer}) 16 16, auto`;
  }

  disable(body = document.body) {
    body.style.cursor = '';
  }
}
