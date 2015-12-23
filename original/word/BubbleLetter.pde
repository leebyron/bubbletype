class BubbleLetter{
  
  ParticleSystem world;
  Spring[] connections;
  Force[] drags;
  ColoredParticle[] bubbles;
  Particle[] anchors;
  LinkedList surrounding;
  Vector3D center;
  GravityPoint gravity;
  
  BubbleLetter( ParticleSystem w, Vector3D center, Letter l ){
    this(w, center);
    make(l);
  }
  
  BubbleLetter(ParticleSystem w){
    this( w, new Vector3D(0,0,0) );
  }
  
  BubbleLetter(ParticleSystem w, Vector3D center){
    this.world = w;
    
    bubbles = new ColoredParticle[8];
    anchors = new Particle[8];
    connections = new Spring[8];
    drags = new Force[8];
    
    surrounding = new LinkedList();
    
    this.center = center;
    
    for( int i=0; i<bubbles.length; i++ ){
      bubbles[i] = new ColoredParticle( letterColor(), 0, 10, new Vector3D(center.x()+random(-20,20), center.y()+random(-20,20), 0) );
      world.addParticle( bubbles[i] );
      anchors[i] = world.makeParticle(0, 1, center.x(), center.y(), 0);
      anchors[i].makeInvisible();
      anchors[i].makeFixed();
      connections[i] = new Spring(bubbles[i], anchors[i], 3, 1, 0);
      world.addForce(connections[i]);
      drags[i] = new Drag(bubbles[i], 0.96);
      world.addForce(drags[i]);
      connections[i].turnOff();
    }
  }
  
  void detachLetter(){
    
    colorMode(HSB,1);
    for( int i=0; i<bubbles.length; i++ ){
      
      connections[i].kill();
      drags[i].kill();
      surrounding.add( bubbles[i] );
      bubbles[i].setMass(0.5);
      bubbles[i].setSize( bubbles[i].s.target * 0.7 );
      world.addForce(new GravityPoint(bubbles[i], -0.1, center ));
      bubbles[i].target = color( (0.8+random(0.3))%1 ,random(0.5,0.85),random(0.65,0.8));
      
      
      bubbles[i] = new ColoredParticle( letterColor(), 0, 10, new Vector3D(random(-20,20), random(-20,20), 0) );
      world.addParticle( bubbles[i] );
      connections[i] = new Spring(bubbles[i], anchors[i], 3, 1, 0);
      world.addForce(connections[i]);
      drags[i] = new Drag(bubbles[i], 0.96);
      world.addForce(drags[i]);
      
    }
  }
    
  void addSurrounding( float x, float y ){
    colorMode(HSB,1);
    Particle p = world.addParticle( new ColoredParticle( surroundingColor() , random(5,25), 0.5, new Vector3D(x, y, 0) ) );
    surrounding.add( p );
    world.addForce(new GravityPoint(p, 0.25, center ));
  }
  
  color surroundingColor(){
    return color( (0.85+random(0.3))%1 , random(0.6,0.95) , random(0.65,0.8) );
  }
  
  color letterColor(){
    return color( 0.35+random(0.25) , random(0.55,0.8) , random(0.65,0.8) );
  }
  
  void update(){
    for( int i=0; i<bubbles.length; i++ ){
      bubbles[i].update();
    }
    
    ListIterator surroundingIter = surrounding.listIterator();
    while( surroundingIter.hasNext() ){
      ColoredParticle bubble = (ColoredParticle) surroundingIter.next();
      bubble.update();
    }
  }

  void draw(){
    
    noStroke();
    colorMode(RGB,255);
    
    ListIterator surroundingIter = surrounding.listIterator();
    while( surroundingIter.hasNext() ){
      ColoredParticle bubble = (ColoredParticle) surroundingIter.next();
      //color f = lerpColor(bubble.c,deuteranopia(bubble.c),blindness);
      //fill( f );
      fill(bubble.c);
      ellipse(bubble.position().x(), bubble.position().y(), bubble.size(), bubble.size());
      
      //offscreen?
      if( bubble.position().x() > width*2 || bubble.position().x() < -width || bubble.position().y() > height*2 || bubble.position().y() < -height ){
        bubble.kill();
      } 
    }
    
    for( int i=0; i<bubbles.length; i++ ){
      //color f = lerpColor(bubbles[i].c,deuteranopia(bubbles[i].c),blindness);
      //fill( f );
      fill(bubbles[i].c);
      ellipse(bubbles[i].position().x(), bubbles[i].position().y(), bubbles[i].size(), bubbles[i].size());
    }

  }
  
  void removeSurrounding(){
    ListIterator surroundingIter = surrounding.listIterator();
    while( surroundingIter.hasNext() ){
      ColoredParticle bubble = (ColoredParticle) surroundingIter.next();
      world.addForce( new GravityPoint( bubble, -2, center ) );
    }

  }
  
  void make( Letter letter ){
    for( int i=0; i<8; i++ ){
      
      anchors[i].position().set( (new Vector3D(letter.x[i], letter.y[i], 0)).add(center) );
      
      if( connections[i].isOff() ){
        bubbles[i].position().set( anchors[i].position() );
      }
      
      bubbles[i].setSize( letter.r[i] * 1.15 );
      
      if( letter.r[i] <= 0.1 ){
//        connections[i].turnOff();
      }else{
        connections[i].turnOn();
      }

      
    }
  }
  
}
