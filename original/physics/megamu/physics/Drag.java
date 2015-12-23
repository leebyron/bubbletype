package megamu.physics;

public class Drag extends UnaryForce {
	
	public Drag(Particle a, float damping) {
		super(a,damping);
	}
	
	public Drag(ParticleSystem s, float damping) {
		super(s,damping);
	}

	protected void apply() {
		addForce( a.velocity.copy().multiply(-1) );
	}

}
