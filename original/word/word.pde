import processing.pdf.*;

import processing.xml.*;
import megamu.geometry.*;
import megamu.physics.*;

float letterSpacing = 1.2;

ParticleSystem world;
BubbleLetter[] word;

Letter[] letters;

float blindness;

int lastSec;

boolean renderPDF = false;

void setup(){
  
  size(800,600);
  colorMode(HSB,1);
  smooth();

  loadLetters();

  world = new ParticleSystem();
  world.addForce(new Collision(world,1.5));
  world.addForce(new Drag(world, 0.1));

  //letter = new BubbleLetter(world);
  
  word = new BubbleLetter[8]; // 8 max
  for(int i=0; i<word.length; i++){
    word[i] = new BubbleLetter(world);
  }

  blindness = 0;
  
}

void draw(){
  colorMode(HSB,1);
  
  if(renderPDF){
    beginRecord(PDF,"vector"+frameCount+".pdf");
  }
  
  background(0);
  smooth();
  
  String[] words = {"lee", "byron"};
  
  if( second() != lastSec ){
    lastSec = second();
    drawWord( words[ (int)random(words.length) ] );
  
  if( second()%2==0 )
    for(int i=0; i<word.length; i++)
      word[i].removeSurrounding();  
    
  //  drawWord( ( 60-second() )+"" );
    
  
  }

  
  blindness = norm(mouseX,0,width);

  translate(width/2, height/2);

  // update letter
  //letter.update();
  for(int i=0; i<word.length; i++){
    word[i].update();
  }

  world.tick();

  // draw letter
  //letter.draw();
  for(int i=0; i<word.length; i++){
    word[i].draw();
  }
  
  if(renderPDF){
    renderPDF = false;
    endRecord();
  }
  
  if( second() != lastSec ){
    //saveFrame("frame###.png");
    renderPDF = true;
  }
  
}

void mousePressed(){
  //letter.addSurrounding(mouseX-width/2,mouseY-height/2);//world.makeParticle(random(5,25),1,mouseX-width/2,mouseY-height/2,0);
}

void mouseDragged(){
  mousePressed();
}

void keyPressed(){
  
  if( keyCode == BACKSPACE || keyCode == DELETE ){
    for(int i=0; i<word.length; i++){
      word[i].removeSurrounding();
    }
  }
  
  int k = key - 32;
  if( k >= letters.length || k < 0 )
    return;
  Letter l = letters[k];
  if( l == null )
    return;
    
  if( key != ' ')
    word[0].detachLetter();
  else
    word[0].removeSurrounding();

  word[0].make(l);
  
}

Letter getLetter( char c ){
  int k = c - 32;
  if( k >= letters.length || k < 0 )
    return getLetter(' ');
  Letter l = letters[k];
  if( l == null )
    return getLetter(' ');
  return l;
}

void drawWord(String w){
  
  float wordWidth = 0;
  for(int i=0; i<min(word.length,w.length()); i++){
    wordWidth += getLetter(w.charAt(i)).w *letterSpacing;
  }
  
  for(int i=0; i<word.length; i++){
    word[i].detachLetter();
  }
  
  float offset = -0.5*wordWidth;
  for(int i=0; i<min(word.length,w.length()); i++){
    Letter l = getLetter(w.charAt(i));
    offset += l.w*0.5*letterSpacing;
    word[i].center = new Vector3D(offset,0,0);
    offset += l.w*0.5*letterSpacing;
    word[i].make( l );
  }
  
/*  if( key != ' ')
    word[0].detachLetter();
  else
    word[0].removeSurrounding();

  word[0].make(l);
  */
}

void loadLetters(){
  letters = new Letter[96];

  File letterFolder = new File(dataPath(""));
  File[] letterFiles = letterFolder.listFiles(new SVGOnly());
  for(int i=0; i<letterFiles.length; i++){
    String name = letterFiles[i].getName();
    name = name.substring(0, name.indexOf(".")); // cut extension

    int index = (name.length()==2)?(parseInt(name) - 32):(name.charAt(0) - 32);

    letters[ index ] = new Letter(letterFiles[i]);
    if( index >= ('a'-32) && index <= ('z'-32) )
      letters[ index + ('A'-'a') ] = letters[ index ];
  }
}

class SVGOnly implements FileFilter{
  boolean accept( File f ){
    return f.getName().indexOf(".svg") != -1;
  }
}
