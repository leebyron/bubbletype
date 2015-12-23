/* @flow */

// PApplet self = this;

/*
Reads in letter data from an svg file
*/

import data from './data';

type LetterData = {
  width: number;
  height: number;
  circles: Array<{
    x: number;
    y: number;
    r: number;
  }>
};

export class Letter {
  x: Array<number>;
  y: Array<number>;
  r: Array<number>;

  w: number;
  h: number;

  static loadLetters(): Array<?Letter> {
    const letters = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        letters[i] = new Letter(data[i]);
        if (i >= 33 && i <= 58) {
          letters[i + 32] = letters[i]; // upper to lower
        }
      }
    }

    return letters;
  }

  constructor(data: LetterData) {
    this.parse(data);
  }

  parse(data: LetterData): void {
    this.x = [];
    this.y = [];
    this.r = [];

    let j = 0;

    const kids = data.circles;
    for (let i = 0; i < kids.length; i++) {
      this.x[j] = kids[i].x;
      this.y[j] = kids[i].y;
      this.r[j] = kids[i].r;
      j++;
    }

    // fill in the blanks
    for (; j < 8; j++) {
      this.x[j] = -1;
      this.y[j] = -1;
      this.r[j] = 0;
      // println("blank");
    }

    // find min and max
    let minX = 1000;
    let maxX = -1000;
    let minY = 1000;
    let maxY = -1000;
    for (let i = 0; i < 8; i++) {
      if (this.x[i] !== -1 && this.y[i] !== -1) {
        minX = Math.min(minX, this.x[i] - this.r[i] * 0.5);
        maxX = Math.max(maxX, this.x[i] + this.r[i] * 0.5);
        minY = Math.min(minY, this.y[i] - this.r[i] * 0.5);
        maxY = Math.max(maxY, this.y[i] + this.r[i] * 0.5);
      }
    }

    // set width and height
    this.w = maxX - minX;
    this.h = maxY - minY;

    if (this.w === 0 || this.h === 0) {
      this.w += 1;
      this.h += 1;
    }

    // center points
    for (let i = 0; i < 8; i++) {
      if (this.x[i] !== -1 && this.y[i] !== -1) {
        this.x[i] = map(this.x[i], minX, maxX, -this.w * 0.5, this.w * 0.5);
        this.y[i] = map(this.y[i], minY, maxY, -this.h * 0.5, this.h * 0.5);
      }
    }
  }
}

function map(n: number, start1: number, stop1: number, start2: number, stop2: number): number {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}
