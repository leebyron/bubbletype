import processing.xml.*;

import megamu.geometry.*;
import megamu.physics.*;

ParticleSystem world;

BubbleLetter[] alphabet;
int[] alphaIndex = {'a'-32, 'b'-32, 'c'-32, 'd'-32, 'e'-32, 'f'-32, 'g'-32, 'h'-32, 'i'-32, 'j'-32, 'k'-32, 'l'-32, 'm'-32, 'n'-32, 'o'-32, 'p'-32, 'q'-32, 'r'-32, 
                    's'-32, 't'-32, 'u'-32, 'v'-32, 'w'-32, 'x'-32, 'y'-32, 'z'-32, 0, '1'-32, '2'-32, '3'-32, '4'-32, '5'-32, '6'-32, '7'-32, '8'-32, '9'-32, '0'-32,
                    '!'-32, '?'-32 };

Letter[] letters;

float blindness;

float x,y;
int alphaFull;

float margin = 50;
float lineSpacing = 30;
float lineHeight = 120;
float leading = 17;
float scale = 0.52;

int action=0;
int target=0;

void setup(){
  size(800,280);
  colorMode(HSB,1);
  smooth();

  loadLetters();

  world = new ParticleSystem();
  world.addForce(new Collision(world));
  world.addForce(new Drag(world, 0.1));

  alphabet = new BubbleLetter[alphaIndex.length];
  x = margin;
  y = margin;
  y += letters[ alphaIndex[0] ].h / 2;
  alphaFull = 0;
}

void draw(){
  colorMode(HSB,1);
  background(0);
  smooth();
  scale( scale );
  
  world.tick();
  
  for( int i=0; i<alphaIndex.length; i++ ){
    if( readyFor(i) ){
      addLetter( i, letters[alphaIndex[i]] );
      action = millis()+3000;
      break;
    }else if( alphaFull==alphaIndex.length && millis()-action>150 ){
      alphabet[target].detachLetter();
      alphabet[target].make( letters[alphaIndex[target]] );
      target = (target+1)%alphaIndex.length;
      action = millis() + (target==0?3000:0);
    }
  }
  
  for( int i=0; i<alphabet.length&&alphabet[i]!=null; i++ ){
    alphabet[i].update();
    alphabet[i].draw();
  }
}


void addLetter( int i, Letter l ){
  
  if( x + l.w > width*(1/scale) - margin || l.w<0.1){
    y += lineHeight;
    y += lineSpacing;
    x = margin;
  }
  
  x += l.w / 2;
  alphabet[i] = new BubbleLetter(world, new Vector3D(x,y,0), l );
  x += l.w / 2;
  x += leading;
  
  alphaFull++;
}

boolean readyFor( int i ){
  return millis() > 1000 + 150*i && alphaFull <= i;
}

/*
void mousePressed(){
  letter.addSurrounding(mouseX-width/2,mouseY-height/2);//world.makeParticle(random(5,25),1,mouseX-width/2,mouseY-height/2,0);
}
void mouseDragged(){
  mousePressed();
}

void keyPressed(){
  
  if( keyCode == BACKSPACE || keyCode == DELETE ){
    letter.removeSurrounding();
  }
  
  int k = key - 32;

  if( k >= letters.length || k < 0 )
    return;

  Letter l = letters[k];

  if( l == null )
    return;
    
  if( key != ' ')
    letter.detachLetter();
  else
    letter.removeSurrounding();

  letter.make(l);
}
*/
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
