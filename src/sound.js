import hitSound from './assets/hit.wav';

export default class SoundManager {
  constructor() {
    this.hit = new Audio(hitSound);
    this.hit.preload = 'auto';
  }

  playHit() {
    this.hit.currentTime = 0;
    const p = this.hit.play();
    if (p && p.catch) p.catch(() => {});
  }
}
