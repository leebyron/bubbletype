class GravityPoint extends UnaryForce{

  Vector3D target;
  float force;

  GravityPoint(Particle a, float v, float x, float y, float z){
    super(a,1);
    target = new Vector3D(x,y,z);
    force = v;
  }

  GravityPoint(ParticleSystem s, float v, float x, float y, float z){
    super(s,1);
    target = new Vector3D(x,y,z);
    force = v;
  }
  
  GravityPoint(Particle a, float v, Vector3D p){
    super(a,1);
    target = p;
    force = v;
  }

  GravityPoint(ParticleSystem s, float v, Vector3D p){
    super(s,1);
    target = p;
    force = v;
  }

  void apply(){
    Vector3D a2t = target.copy().subtract(a.position());
    float a2tDistance = a2t.length();
    if( a2tDistance == 0 ){
      a2t.set( (new Vector3D((float)Math.random(), (float)Math.random(), 0)).unit() );
    }
    else{
      a2t.divide(a2tDistance);
    }

    a2t.multiply(force);

    // add on the forces
    if (a.isFree())
      a.force().add( a2t );
  }

}
