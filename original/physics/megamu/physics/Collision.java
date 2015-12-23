package megamu.physics;


public class Collision extends BinaryForce {
	
	public Collision(Particle a, Particle b, float k){
		super(a,b,k);
	}
	
	public Collision(ParticleSystem s, float k){
		super(s,k);
	}

	protected void apply() {
		float maxDist = (a.size() + b.size())*0.5f;
		
		if( Math.abs( a.position().x() - b.position().x()) > maxDist )
			return;
		
		if( Math.abs( a.position().y() - b.position().y()) > maxDist )
			return;
		
		Vector3D a2b = a.position().copy().subtract(b.position());
		float a2bDistance = a2b.length();
		
		if( a2bDistance > maxDist )
			return;
		
		if( a2bDistance == 0 ){
			a2b.set( (new Vector3D((float)Math.random(), (float)Math.random(), 0)).unit() );
		}else{
			a2b.divide(a2bDistance);
		}
		
		float force = (maxDist - a2bDistance);
		if( a.isFree() && b.isFree() )
			force *= 0.5f;
		a2b.multiply(force);
		
		// add on the forces
		addForce( a2b );
	}

}
