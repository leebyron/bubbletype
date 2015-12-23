package megamu.physics;


public class Attraction extends BinaryForce
{
	protected float distanceMin;

	public Attraction(Particle a, Particle b, float k, float distanceMin) {
		super(a,b,k);
		this.distanceMin = distanceMin;
	}
	
	public Attraction(ParticleSystem s, float k, float distanceMin) {
		super(s,k);
		this.distanceMin = distanceMin;
	}

	public final float getMinimumDistance() {
		return distanceMin;
	}

	public final void setMinimumDistance(float d) {
		distanceMin = d;
	}

	public final void apply() {
		// get the distance from end to end and a unit vector to represent that
		Vector3D a2b = a.position().copy().subtract(b.position());
		float a2bDistance = a2b.length();
		a2b.divide(a2bDistance);
		
		// get the force to apply
		float force = a.mass * b.mass;
		
		if( a2bDistance < distanceMin ){
			force /= distanceMin*distanceMin;
		}else{
			force /= a2bDistance*a2bDistance;
		}
		
		a2b.multiply(force);
		
		// add on the forces
		addForce( a2b );
	}
	
}
