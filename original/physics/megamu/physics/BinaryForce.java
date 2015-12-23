package megamu.physics;

import java.util.Iterator;

public abstract class BinaryForce extends Force {
	
	protected Particle a;
	protected Particle b;
	protected ParticleSystem world;
	
	public BinaryForce(Particle a, Particle b, float k){
		super(k);
		this.a = a;
		this.b = b;
	}
	
	public BinaryForce(ParticleSystem world, float k){
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
			apply();
			return;
		}
		
		Iterator particleIter = world.particleIterator();
		int index = 0;
		while( particleIter.hasNext() ){
			a = (Particle) particleIter.next();
			index++;
			Iterator particleIterB = world.particles.listIterator(index);
			while( particleIterB.hasNext() ){
				b = (Particle) particleIterB.next();
				apply();
			}
		}
	}
	
	protected final void addForce(Vector3D f){
		// scale force
		f.multiply(strength);
		// add on the forces
		if (a.isFree() && (!isGlobalForce() || b.isVisible()) )
			a.force().add( f );
		if (b.isFree() && (!isGlobalForce() || a.isVisible()) )
			b.force().subtract( f );
	}
	
	public final Particle getOneEnd() {
		return a;
	}

	public final Particle getTheOtherEnd() {
		return b;
	}
	
	public final void setOneEnd(Particle p) {
		a = p;
	}

	public final void setTheOtherEnd(Particle p) {
		b = p;
	}
	
	public final ParticleSystem getWorld() {
		return world;
	}

	public boolean hasDead() {
		if( super.hasDead() )
			return true;
		if( isGlobalForce() )
			return false;
		if( a.isDead() || b.isDead() )
			return true;
		return false;
	}

}
