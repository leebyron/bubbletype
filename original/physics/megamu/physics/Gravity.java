package megamu.physics;


public class Gravity extends UnaryForce {
	
	protected Vector3D force;

	public Gravity(Particle a, float f) {
		super(a, 1);
		force = new Vector3D(0,f,0);
	}
	
	public Gravity(ParticleSystem s, float f) {
		super(s, 1);
		force = new Vector3D(0,f,0);
	}
	
	public Gravity(Particle a, Vector3D f) {
		super(a, 1);
		force = f;
	}
	
	public Gravity(ParticleSystem s, Vector3D f) {
		super(s, 1);
		force = f;
	}

	protected void apply(){
		addForce( force );
	}

}
