/* @flow */

import { Vector3D } from './traer_physics/Vector3D';
import type { ParticleSystem } from './traer_physics/ParticleSystem';

export class WorldDrag /* extends UnaryForce */ {

  world: ParticleSystem;
  damping: number;
  on: boolean;

  constructor(world: ParticleSystem, damping: number) {
    this.world = world;
    this.damping = damping;
    this.on = true;
  }

  apply(): void {
    for (let i = 0; i < this.world.particles.length; i++) {
      const particle = this.world.particles[i];
      if (particle.isFree()) {
        const v = particle.velocity.copy();
        v.multiplyBy(-this.damping);
        particle.force.addV(v);
      }
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
