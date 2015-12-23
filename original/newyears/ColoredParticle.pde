class ColoredParticle extends Particle{
  
  color target;
  color c;
  Integrator s;
  
  ColoredParticle(color c, float siz, float m, Vector3D p) {
    super(siz,m,p);
    this.c = c;
    this.target = c;
    this.s = new Integrator(0,random(0.05,0.1));
    s.target = siz;
  }
  
  void setSize(float siz){
    s.target = siz;
  }
  
  void update(){
    s.update();
    size = s.value;
    c = lerpColor(c,target,0.1);
  }
  
}
