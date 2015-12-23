/* @flow */

import { Vector3D } from './traer_physics/Vector3D';
import type { Particle } from './traer_physics/Particle';

export class GravityPoint /* extends UnaryForce */ {

  a: Particle;
  target: Vector3D;
  force: number;
  on: boolean;

  // GravityPoint(Particle a, float v, float x, float y, float z){
  //   super(a,1);
  //   target = new Vector3D(x,y,z);
  //   force = v;
  // }

  // GravityPoint(ParticleSystem s, float v, float x, float y, float z){
  //   super(s,1);
  //   target = new Vector3D(x,y,z);
  //   force = v;
  // }

  constructor(a: Particle, v: number, p: Vector3D) {
    // super(a, 1);
    this.a = a;
    this.target = p;
    this.force = v;
    this.on = true;
  }

  // GravityPoint(ParticleSystem s, float v, Vector3D p){
  //   super(s,1);
  //   target = p;
  //   force = v;
  // }

  apply(): void {
    const dX = this.target.x - this.a.position.x;
    const dY = this.target.y - this.a.position.y;

    const a2t = new Vector3D(dX, dY);

    // const a2t = this.target.copy();
    // a2t.subtractV(this.a.position);

    // if (a2t.lengthSquared() < 10) {
    //   return;
    // }

    if (a2t.isZero()) {
      a2t.setV(new Vector3D(Math.random(), Math.random(), 0));
    }
    a2t.normalize();

    a2t.multiplyBy(this.force);

    // add on the forces
    if (this.a.isFree()) {
      this.a.force.addV(a2t);
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
