/* @flow */

import { ColoredParticle } from './ColoredParticle';

import { ParticleSystem } from './traer_physics/ParticleSystem';
import { Vector3D } from './traer_physics/Vector3D';
import type { Particle } from './traer_physics/Particle';

export class Collision {

  world: ParticleSystem;
  strength: number;
  on: boolean;

  constructor(world: ParticleSystem, k: number) {
    this.world = world;
    this.strength = k;
    this.on = true;
  }

  apply(): void {
    const particles = this.world.particles;

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      if (a.size) {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          if (b.size) {
            this.applyTo((a: any), (b: any));
          }
        }
      }
    }
  }

  applyTo(a: ColoredParticle, b: ColoredParticle): void {
    const minDist = (b.size + a.size) * 0.5;

    const dX = b.position.x - a.position.x;

    if (dX > minDist || -dX < -minDist) {
      return;
    }

    const dY = b.position.y - a.position.y;

    if (dY > minDist || -dY < -minDist) {
      return;
    }

    const axis = new Vector3D(dX, dY, 0);

    const axisLenSq = axis.lengthSquared();

    if (axisLenSq > minDist * minDist) {
      return;
    }

    const currentDistance = Math.sqrt(axisLenSq);
    const unitAxis = new Vector3D(axis.x / currentDistance, axis.y / currentDistance, 0);
    const relDist = currentDistance - minDist;
    const remove = relDist;
    const impulse = remove / (a.invMass + b.invMass);

    const I = unitAxis.multiplyBy(impulse);

    a.force.addV(I);
    b.force.subtractV(I);
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
