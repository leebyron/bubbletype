package megamu.physics;

import java.util.Iterator;

public abstract class UnaryForce extends Force {

	protected Particle a;
	protected ParticleSystem world;
	
	public UnaryForce(Particle a, float k){
		super(k);
		this.a = a;
	}
	
	public UnaryForce(ParticleSystem world, float k){
		super(k);
		this.world = world;
	}
	
	public final boolean isGlobalForce() {
		return world != null;
	}
	
	public final void applyForce(){
		if(!on)
			return;
		
		if( !isGlobalForce() ){
			if( a.isFixed() )
				return;
			apply();
			return;
		}

		Iterator particleIter = world.particleIterator();
		while( particleIter.hasNext() ){
			a = (Particle) particleIter.next();
			if( a.isFixed() )
				continue;
			apply();
		}
	}
	
	protected final void addForce(Vector3D f){
		// scale force
		f.multiply(strength);
		// add on the forces
		if (a.isFree() )
			a.force().add( f );
	}
	
	public final Particle getParticle() {
		return a;
	}
	
	public final ParticleSystem getWorld() {
		return world;
	}

	public final boolean hasDead() {
		if( super.hasDead() )
			return true;
		if( isGlobalForce() )
			return false;
		if( a==null || a.isDead() )
			return true;
		return false;
	}
}
