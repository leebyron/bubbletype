/* @flow */

// import processing.pdf.*;

// import processing.xml.*;
// import megamu.geometry.*;
// import megamu.physics.*;

import { ParticleSystem } from './traer_physics/ParticleSystem';
import { Vector3D } from './traer_physics/Vector3D';

import { BubbleLetter } from './BubbleLetter';
import { Collision } from './Collision';
import { Letter } from './Letter';
import { WorldDrag } from './WorldDrag';

const letterSpacing = 1.8;

export function BubbletypeWord(p5: any) {

  const world = new ParticleSystem();
  world.addCustomForce(new Collision(world, 1.5));
  world.addCustomForce(new WorldDrag(world, 0.01));

  let word: Array<BubbleLetter> = [];

  let letters: Array<?Letter> = Letter.loadLetters();

  let blindness = 0;

  let lastSec = 0;

  // boolean renderPDF = false;

  p5.setup = function setup() {
    const docElem = document.documentElement;
    p5.createCanvas(docElem.clientWidth, docElem.clientHeight);
    p5.colorMode(p5.HSB, 1);
    p5.smooth();



    //letter = new BubbleLetter(world);

    // word = new BubbleLetter[8]; // 8 max
    for (let i = 0; i < 8; i++) {
      word[i] = new BubbleLetter(p5, world);
    }
  }

  p5.draw = function draw() {
    p5.colorMode(p5.HSB, 1);

    // if (renderPDF){
    //   beginRecord(PDF,"vector"+frameCount+".pdf");
    // }

    p5.background(0);
    p5.smooth();

    const words = [ 'bubbles', 'the', 'quick', 'brown', 'fox', 'jumped', 'over', 'the', 'lazy', 'dog' ];

    const thisSec = Math.floor(p5.second() / 2);
    if (thisSec !== lastSec) {
      lastSec = thisSec;
      drawWord( words[ thisSec % words.length ] );

      // if (thisSec % words.length === 0) {
      //   for (let i = 0; i < word.length; i++ ) {
      //     word[i].removeSurrounding();
      //   }

      // //  drawWord( ( 60-second() )+"" );

      // }
    }

    blindness = p5.norm(p5.mouseX, 0, p5.width);

    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);

    // update letter
    //letter.update();
    for (let i = 0; i < word.length; i++) {
      word[i].update();
    }

    world.tick();

    // draw letter
    //letter.draw();

    for (let i = 0; i < word.length; i++) {
      word[i].drawSurround();
    }

    for (let i = 0; i < word.length; i++) {
      word[i].draw();
    }

    // if(renderPDF){
    //   renderPDF = false;
    //   endRecord();
    // }

    // if( second() != lastSec ){
    //   //saveFrame("frame###.png");
    //   renderPDF = true;
    // }

    if (!window.word) {
      window.word = word;
      console.log(word);
    }

    p5.pop();
  }

  p5.mousePressed = function mousePressed() {
    //letter.addSurrounding(mouseX-width/2,mouseY-height/2);//world.makeParticle(random(5,25),1,mouseX-width/2,mouseY-height/2,0);
  }

  p5.mouseDragged = function mouseDragged() {
    p5.mousePressed();
  }

  p5.keyPressed = function keyPressed() {

    if (p5.keyCode === p5.BACKSPACE || p5.keyCode === p5.DELETE) {
      for (let i = 0; i < word.length; i++) {
        word[i].removeSurrounding();
      }
    }

    const k = p5.key - 32;
    if (k >= letters.length || k < 0) {
      return;
    }

    const l = letters[k];
    if (l == null) {
      return;
    }

    if (p5.key !== ' '.charCodeAt(0)) {
      word[0].detachLetter();
    } else {
      word[0].removeSurrounding();
    }

    word[0].make(l);
  }

  function getLetter(c: number /* char */): Letter {
    const k = c - 32;
    if (k >= letters.length || k < 0) {
      return getLetter(' '.charCodeAt(0));
    }

    const l = letters[k];
    if (l == null) {
      return getLetter(' '.charCodeAt(0));
    }

    return l;
  }

  function drawWord(w: string): void {

    for (let i = 0; i < word.length; i++) {
      word[i].detachLetter();
    }

    let wordWidth = 0;
    for (let i = 0; i < Math.min(word.length, w.length); i++) {
      wordWidth += getLetter(w.charCodeAt(i)).w * letterSpacing;
    }

    let offset = -0.5 * wordWidth;
    for (let i = 0; i < Math.min(word.length, w.length); i++) {
      const l = getLetter(w.charCodeAt(i));
      offset += l.w * 0.5 * letterSpacing;
      word[i].center = new Vector3D(offset, 0, 0);
      offset += l.w * 0.5 * letterSpacing;
      word[i].make(l);
    }

  /*  if( key != ' ')
      word[0].detachLetter();
    else
      word[0].removeSurrounding();

    word[0].make(l);
    */
  }

  // function loadLetters(): void {
  //   letters = new Array(96); //new Letter[96];

  //   // File letterFolder = new File(dataPath(""));
  //   // File[] letterFiles = letterFolder.listFiles(new SVGOnly());
  //   for (let i = 0; i < letterFiles.length; i++) {
  //     let name = letterFiles[i].getName();
  //     name = name.substring(0, name.indexOf(".")); // cut extension

  //     let index = name.length() === 2 ? parseInt(name) - 32 : name.charCodeAt(0) - 32;

  //     letters[index] = new Letter(letterFiles[i]);

  //     if (index >= ('a'.charCodeAt(0) - 32) && index <= ('z'.charCodeAt(0) - 32)) {
  //       letters[ index + ('A'.charCodeAt(0)-'a'.charCodeAt(0)) ] = letters[index];
  //     }
  //   }
  // }

  // class SVGOnly implements FileFilter{
  //   boolean accept( File f ){
  //     return f.getName().indexOf(".svg") != -1;
  //   }
  // }

}
