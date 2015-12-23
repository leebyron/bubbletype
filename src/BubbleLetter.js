/* @flow */

import { ColoredParticle } from './ColoredParticle';
import { Drag } from './Drag';
import { GravityPoint } from './GravityPoint';
import { Letter } from './Letter';

import { ParticleSystem } from './traer_physics/ParticleSystem';
import { Vector3D } from './traer_physics/Vector3D';
import type { Particle } from './traer_physics/Particle';
import type { Spring } from './traer_physics/Spring';

export class BubbleLetter {

  p5: any;
  world: ParticleSystem;
  connections: Array<Spring>;
  drags: Array<Drag>;
  bubbles: Array<ColoredParticle>;
  anchors: Array<Particle>;
  surrounding: Array<ColoredParticle>;
  surroundingForce: Array<GravityPoint>;
  center: Vector3D;
  gravity: GravityPoint;

  constructor(p5: any, w: ParticleSystem, center?: Vector3D, l?: Letter) {
    this.p5 = p5;
    this.world = w;

    this.bubbles = [];//new ColoredParticle[8];
    this.anchors = [];//new Particle[8];
    this.connections = [];//new Spring[8];
    this.drags = [];//new Force[8];

    this.surrounding = []; //new LinkedList();
    this.surroundingForce = [];

    this.center = center || new Vector3D();

    for (let i = 0; i < 8; i++) {
      this.bubbles[i] = new ColoredParticle(this.p5, this.letterColor(), 0, 10, new Vector3D(this.center.x + p5.random(-20, 20), this.center.y + p5.random(-20, 20), 0));
      this.world.particles.push(this.bubbles[i]);
      this.anchors[i] = this.world.makeParticle(0, 1, this.center.x, this.center.y, 0);
      // this.anchors[i].makeInvisible();
      this.anchors[i].makeFixed();

      this.connections[i] = this.world.makeSpring(this.bubbles[i], this.anchors[i], 3, 3, 0);
      this.drags[i] = new Drag(this.bubbles[i], 0.96);
      this.world.addCustomForce(this.drags[i]);
      // this.connections[i].turnOff();
    }

    if (l) {
      this.make(l);
    }
  }

  detachLetter(): void {
    this.removeSurrounding();

    this.p5.colorMode(this.p5.HSB, 1);
    for (let i = 0; i < this.bubbles.length; i++) {
      // Move bubble to surrounding
      this.bubbles[i].setMass(this.bubbles[i].mass * 0.01);
      this.bubbles[i].setSize(this.bubbles[i].s.target * 0.75);
      this.bubbles[i].target = this.surroundingColor();// this.p5.color((0.8 + this.p5.random(0.3)) % 1, this.p5.random(0.5, 0.85), this.p5.random(0.65, 0.8));
      this.surrounding.push(this.bubbles[i]);

      // Apply initial surrounding force
      const sf = new GravityPoint(this.bubbles[i], -0.05, this.connections[i].b.position);// new Vector3D(this.p5.random(-800, 800), this.p5.random(-800, 800), 0));// this.center);
      this.world.addCustomForce(sf);
      this.surroundingForce.push(sf);

      // Create a new empty bubble
      this.bubbles[i] = new ColoredParticle(this.p5, this.letterColor(), 0, 10, new Vector3D(this.p5.random(-20, 20), this.p5.random(-20, 20), 0));
      this.world.particles.push(this.bubbles[i]);

      // Refocus active forces
      this.connections[i].a = this.bubbles[i];
      this.drags[i].a = this.bubbles[i];
    }
  }

  addSurrounding(x: number, y: number): void {
    this.p5.colorMode(this.p5.HSB, 1);
    const p = new ColoredParticle(this.p5, this.surroundingColor(), this.p5.random(5, 25), 0.5, new Vector3D(x, y, 0));
    this.world.particles.push(p);
    this.surrounding.push(p);

    const sf = new GravityPoint(p, 1, this.center);
    this.world.addCustomForce(sf);
    this.surroundingForce.push(sf);
  }

  removeSurrounding(): void {
    for (let i = 0; i < this.surroundingForce.length; i++) {
      this.surroundingForce[i].force -= 0.05;
      this.surroundingForce[i].target.x += this.p5.random(-50, 50);
      this.surroundingForce[i].target.y += this.p5.random(-50, 50);
    }
  }

  surroundingColor(): any/*color*/ {
    return this.p5.color((0.85 + this.p5.random(0.25)) % 1 , this.p5.random(0.5, 0.95), this.p5.random(0.35, 0.75));
  }

  letterColor(): any/*color*/ {
    return this.p5.color(0.35 + this.p5.random(0.25), this.p5.random(0.55, 0.8), this.p5.random(0.65, 0.8));
  }

  update(): void {
    for (let i = 0; i < this.bubbles.length; i++) {
      this.bubbles[i].update();
    }

    for (let bubble of this.surrounding) {
      bubble.update();
    }
  }

  drawSurround() {

    this.p5.noStroke();
    this.p5.colorMode(this.p5.RGB, 255);

    for (let i = 0; i < this.surrounding.length; i++) {
      const bubble = this.surrounding[i];

    // ListIterator surroundingIter = surrounding.listIterator();
    // while( surroundingIter.hasNext() ){
    //   ColoredParticle bubble = (ColoredParticle) surroundingIter.next();
      //color f = lerpColor(bubble.c,deuteranopia(bubble.c),blindness);
      //fill( f );
      this.p5.fill(bubble.c);
      this.p5.ellipse(bubble.position.x, bubble.position.y, bubble.size, bubble.size);

      //offscreen?
      if (bubble.position.x > this.p5.width * 2 || bubble.position.x < -this.p5.width || bubble.position.y > this.p5.height * 2 || bubble.position.y < -this.p5.height) {
        this.world.removeParticle(bubble);
        this.world.removeCustomForce(this.surroundingForce[i]);

        // remove index.
        this.surrounding[i] = this.surrounding[this.surrounding.length - 1];
        this.surroundingForce[i] = this.surroundingForce[this.surroundingForce.length - 1];
        this.surrounding.length -= 1;
        this.surroundingForce.length -= 1;
        i--;
      }
    }
  }

  draw(): void {

    this.p5.noStroke();
    this.p5.colorMode(this.p5.RGB, 255);

    for (let i = 0; i < this.bubbles.length; i++) {
      //color f = lerpColor(bubbles[i].c,deuteranopia(bubbles[i].c),blindness);
      //fill( f );
      this.p5.fill(this.bubbles[i].c);
      this.p5.ellipse(this.bubbles[i].position.x, this.bubbles[i].position.y, this.bubbles[i].size, this.bubbles[i].size);
    }
  }

  make(letter: Letter): void {
    for (let i = 0; i < 8; i++) {
      const letterPos = new Vector3D(letter.x[i], letter.y[i], 0);
      letterPos.addV(this.center);
      this.anchors[i].position.setV(letterPos);

      // if (this.connections[i].isOff()) {

      letterPos.multiplyBy(0.85);

      this.bubbles[i].position.setV(letterPos);
      // }

      this.bubbles[i].setSize(letter.r[i] * 2);
      this.bubbles[i].setMass(letter.r[i]);

//       if (letter.r[i] <= 0.1) {
// //        connections[i].turnOff();
//       } else {
//         this.connections[i].turnOn();
//       }
    }
  }

}
