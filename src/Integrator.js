/* @flow */

export class Integrator {
  target: number;
  value: number;
  k: number;

  constructor(v: number, k: number = 0.2) {
    this.target = v;
    this.value = v;
    this.k = k;
  }

  update(): void {
    this.value += (this.target - this.value) * this.k;
  }
}
