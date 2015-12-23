class Paint extends Particle{
  
  float hue;
  int creation;
  
  float size = 10;
  int age = 1000;
  
  Paint(float x, float y, float hue){
    super(1,1, new Vector3D(x,y,0) );    
    world.addParticle(this);
    this.hue = hue;
    creation = millis();
    
    size = random(7,14);
    age = (int) random(500,1000);
    
    setVelocity( random(-8,8), random(-8,8), 0);
  }
  
  void tick(float t){
    float fresh = 1 - (float)(millis() - creation)/age;
    if( fresh < 0 ){
      kill();
    }
  }
  
  void draw(){
    
    float fresh = 1 - (float)(millis() - creation)/age;
    fresh *= fresh;
    
    fill(hue,1,1,fresh);
    ellipse( position.x(), position.y(), size, size );
    
  }
  
}
