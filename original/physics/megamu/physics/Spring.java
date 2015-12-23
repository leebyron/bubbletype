package megamu.physics;


public class Spring extends BinaryForce
{
	protected float springConstant;
	protected float damping;
	protected float restLength;

	public Spring(Particle a, Particle b, float ks, float d, float r){
		super(a,b,1);
		springConstant = ks;
		damping = d;
		restLength = r;
	}
	
	public Spring(ParticleSystem s, float ks, float d, float r){
		super(s,1);
		springConstant = ks;
		damping = d;
		restLength = r;
	}
	
	public final float currentLength() {
		return a.position().distance(b.position());
	}

	public final float restLength() {
		return restLength;
	}

	public final void setRestLength(float l) {
		restLength = l;
	}

	public final float springConstant() {
		return springConstant;
	}

	public final void setSpringConstant(float ks) {
		springConstant = ks;
	}

	public final float damping() {
		return damping;
	}

	public final void setDamping(float d) {
		damping = d;
	}

	protected final void apply() {
		// get the distance from end to end and a unit vector to represent that
		Vector3D a2b = a.position().copy().subtract(b.position());
		float a2bDistance = a2b.length();
		if( a2bDistance == 0 ){
			a2b.set( (new Vector3D((float)Math.random(), (float)Math.random(), 0)).unit() );
		}else{
			a2b.divide(a2bDistance);
		}
		
		// the force of the spring is a function of how far it's been stretched
		float springForce = -(a2bDistance - restLength) * springConstant;
		
		// spring damping is based on the difference in velocities of the ends
		Vector3D a2bV = a.velocity().copy().subtract(b.velocity());
		float dampingForce = -damping * a2bV.dot(a2b);
		float r = springForce + dampingForce;
		a2b.multiply(r);
		
		// add on the forces
		addForce( a2b );
	}
}
