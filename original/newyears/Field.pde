class Field extends UnaryForce{
  
  int created;
  
  float scale = 16;
  
  Field(ParticleSystem world, float k, float scale){
    super(world, k);
    created = millis();
    this.scale = scale;
  }
  
  void apply(){
    
    float now = (millis() - created)/1000;
    float fx = noise( a.position().x() * scale/width, a.position().y() * scale/height, now )-0.5;
    float fy = noise( a.position().x() * scale/width + scale, a.position().y() * scale/height, now )-0.5;
    
    Vector3D force = new Vector3D(fx,fy,0);
    
    addForce( force );
  }
  
}
