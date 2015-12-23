/* @flow */

import { Integrator } from './Integrator';

import { Particle } from './traer_physics/Particle';
import { Vector3D } from './traer_physics/Vector3D';

export class ColoredParticle extends Particle {
  p5: any;
  size: number;
  target: any/*color*/;
  c: any/*color*/;
  s: Integrator;

  constructor(p5: any, c: any/*color*/, siz: number, m: number, p: Vector3D) {
    super(m);
    this.position.setV(p);
    this.size = siz;
    this.p5 = p5;
    this.c = c;
    this.target = c;
    this.s = new Integrator(0, this.p5.random(0.05, 0.1));
    this.s.target = siz;
  }

  setSize(siz: number): void {
    this.s.target = siz;
  }

  update(): void {
    this.s.update();
    this.size = this.s.value;
    this.c = this.p5.lerpColor(this.c, this.target, 0.1);
  }
}
