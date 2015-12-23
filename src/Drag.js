/* @flow */

import { Vector3D } from './traer_physics/Vector3D';
import type { Particle } from './traer_physics/Particle';

export class Drag /* extends UnaryForce */ {

  a: Particle;
  damping: number;
  on: boolean;

  constructor(a: Particle, damping: number) {
    this.a = a;
    this.damping = damping;
    this.on = true;
  }

  apply(): void {
    if (this.a.isFree()) {
      const v = this.a.velocity.copy();
      v.multiplyBy(-this.damping);
      this.a.force.addV(v);
    }
  }

  // Satisfy interface
  turnOff(): void {
    this.on = false;
  }

  turnOn(): void {
    this.on = true;
  }

  isOn(): boolean {
    return this.on;
  }

  isOff(): boolean {
    return !this.on;
  }
}
