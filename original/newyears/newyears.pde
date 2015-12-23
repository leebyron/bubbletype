import processing.xml.*;
import processing.opengl.*;
import megamu.physics.*;
import processing.video.*;

int w = 160;
int h = 120;
int rez = 6;

ParticleSystem world;

ParticleSystem clock;

Field field, field2;

BeatMatcher beat;

PFont time;

Ebb hues;
Capture cam;
int[] previousFrame;
float scalar;
int resetField;

boolean[] time44 = new boolean[4];
int beatNum = 0;
int lastSpace = 0;
int lastSec = 0;
boolean newYear;

long targetTime;

String[] months = {"","January","February","March","April","May","June","July","August","September","October","November","December"};

void setup(){
  size(800,600);
//  hint(ENABLE_OPENGL_4X_SMOOTH);
  colorMode(HSB,1);
  smooth();
  noStroke();
  noCursor();
  
  println(Capture.list());
  
  hues = new Ebb(w,h,1);
  
  //cam = new Capture(this, w, h, "ProView USB", 10);
  cam = new Capture(this, w, h, "USB Video Class Video", 10);
  
  previousFrame = new int[w*h];
  scalar = width/w;
  
  world = new ParticleSystem();
  field = new Field(world, 0.3, 20);
  world.addForce( field );
  world.addForce( new Drag(world, 0.2) );
  
  clock = new ParticleSystem();
  field2 = new Field(clock, 0.3, 20);
  clock.addForce( field2 );
  clock.addForce( new Drag(clock, 0.1) );
  clock.addForce(new Collision(clock,1.5));
  
  loadLetters();
  word = new BubbleLetter[8]; // 8 max
  for(int i=0; i<word.length; i++){
    word[i] = new BubbleLetter(clock);
  }
  
  
  beat = new BeatMatcher(this);
  
  hint(ENABLE_NATIVE_FONTS);
  time = loadFont("RotisSansSerif-48.vlw");
  
  Date d = new Date(2008-1900,0,1);
  
//  Date d = new Date(2007-1900,11,31,3,6);
  
  targetTime = d.getTime();
  
  background(0);
}

void draw(){
  
  //background(0);
  fill(0,0.3);
  rect(0,0,width,height);

  hues.update();
  beat.update();
  
  Date d = new Date();
  long nowTime = d.getTime();
  int tillMidnight = (int) (targetTime-nowTime);
//  println( tillMidnight );
  
  if( tillMidnight < 55000 && tillMidnight > -15000 ){
    fill(0,0.3);
    rect(0,0,width,height);
  }

  
  if( tillMidnight < 60000 && tillMidnight > -1500 && !newYear && lastSec != second() ){
    lastSec = second();    

    for(int i=0; i<word.length; i++)
      word[i].removeSurrounding();  
    
    if( second() == 0 ){
      drawWord( ( year() )+"" );
      for(int i=0; i<word.length; i++)
        word[i].removeSurrounding();
      newYear = true;
    }else{
      drawWord( ( 60-second() )+"" );
    }
  }
  
  if( tillMidnight < -30000 && newYear ){
    drawWord("");
    for(int i=0; i<word.length; i++)
      word[i].removeSurrounding();
    newYear = false;
  }

  if( millis()>3000 && cam.available() && !( tillMidnight < 55000 && tillMidnight > -1000 ) ){
    cam.read();  
    for (int x = 0; x < w; x+=rez) {
      for (int y = 0; y < h; y+=rez) {
        int i = y*w+x;
    
        color currColor = cam.pixels[i];
        int currB = currColor & 0xFF;
        int prevB = previousFrame[i];
        int diffB = abs(currB - prevB);
        previousFrame[i] = currB;
    
        if(diffB > 60){
          float px = (x+random(rez))*scalar;
          float py = (y+random(rez))*scalar;
          
          new Paint(px,py,hues.get(x,y));
        }
      }
    }
  }
  
  if( resetField>0 && millis()-resetField>80 ){
    field.setStrength( 0.3 );
    field2.setStrength( 0.3 );
    resetField=0;
  }
  
  world.tick();
  
  Iterator particles = world.particleIterator();
  
  noStroke();
  while( particles.hasNext() ){
    Paint p = (Paint) particles.next();
    p.draw();
  }
    
   // update letter
  //letter.update();
  for(int i=0; i<word.length; i++){
    word[i].update();
  }

  clock.tick();
  
  // draw letter
  //letter.draw();
  pushMatrix();
  translate(width/2, height/2);
  for(int i=0; i<word.length; i++){
    word[i].draw();
  }
  popMatrix();
  
//  colorMode(HSB,1);  // ???
  
  // draw beat circle
  fill(1,0.4,1,0.7);
  for(int i=0; i<4; i++){
    if( time44[i] ){
      arc(780,20,20,20, HALF_PI*(i+3), HALF_PI*(i+3)+HALF_PI );
    }
  }
  
  textFont(time);
  textSize(24);
  textAlign(RIGHT);
  
  String date = months[month()] + " " + day() +dateSuffix(day())+", "+year()+" - "+ hour() + ":" +n2(minute()) + ":" + n2(second());
  text(" "+beat.bpm(), 760, 28);
  
  fill(1,0.8);
  text( date, 760 - textWidth(" "+beat.bpm()), 28 );
  
}

String dateSuffix(int d){
  
  if(d>10&&d<20)
    return "th";
  if(d%10==1)
    return "st";
  if(d%10==2)
    return "nd";
  if(d%10==3)
    return "rd";
  return "th";
}

String n2(int n){
  if(n<10)
    return "0"+n;
  return ""+n;
}

void keyPressed(){
  if(key==' '){
    
    if(millis() - lastSpace > 1500){
      beatNum=0;
      for(int i=0; i<4; i++){
        time44[i] = false;
      }
    }
    
    beat.tap();
    
    lastSpace = millis();
  }
  
  if(key=='z'){
    beat.clear();
  }
}

void beat(){
  field.setStrength( 30 );
  field2.setStrength( 30 );
  resetField = millis();
  
  time44[beatNum] = !time44[beatNum];
  beatNum = (beatNum+1)%4;
}
