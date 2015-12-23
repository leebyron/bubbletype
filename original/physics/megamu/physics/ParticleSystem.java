package megamu.physics;

import java.util.Iterator;
import java.util.LinkedList;

public class ParticleSystem
{
	protected LinkedList particles;
	protected LinkedList forces;
	protected RungeKuttaIntegrator integrator;

	public ParticleSystem(){
		integrator = new RungeKuttaIntegrator(this);
		particles = new LinkedList();
		forces = new LinkedList();
	}

	public final void tick() {
		tick(1.0f);
	}

	public final void tick(float t) {
		cleanUp();
		Iterator particleIter = particles.iterator();
		while (particleIter.hasNext()) {
			Particle p = (Particle) particleIter.next();
			p.tick(t);
		}
		Iterator forceIter = forces.iterator();
		while (forceIter.hasNext()) {
			Force f = (Force) forceIter.next();
			f.tick(t);
		}
		integrator.step(t);
	}

	public final Particle makeParticle(float size, float mass, float x, float y, float z) {
		Particle p = new Particle(size, mass, new Vector3D(x, y, z));
		particles.add(p);
		integrator.allocateParticles();
		return p;
	}

	public final Particle makeParticle() {
		return makeParticle(10.0F, 1.0F, 0.0F, 0.0F, 0.0F);
	}
	
	public final Particle addParticle(Particle p){
		particles.add(p);
		integrator.allocateParticles();
		return p;
	}
	
	public final Force addForce(Force f){
		forces.add(f);
		return f;
	}

	public final void clear() {
		particles.clear();
		forces.clear();
	}

	protected final void applyForces() {
		Iterator i = forces.iterator();
		while (i.hasNext()) {
			Force f = (Force) i.next();
			f.applyForce();
		}
	}

	protected final void clearForces() {
		Iterator i = particles.iterator();
		while (i.hasNext()) {
			Particle p = (Particle) i.next();
			p.force.clear();
		}
	}

	private final void cleanUp() {
		Iterator particleIter = particles.iterator();
		while (particleIter.hasNext()) {
			Particle p = (Particle) particleIter.next();
			if( p.isDead() )
				particleIter.remove();
		}
		
		Iterator forceIter = forces.iterator();
		while (forceIter.hasNext()) {
			Force f = (Force) forceIter.next();
			if( f.hasDead() )
				forceIter.remove();
		}
	}

	public final int numberOfParticles() {
		return particles.size();
	}
	
	public final int numberOfForces() {
		return forces.size();
	}
	
	public final Iterator particleIterator(){
		return particles.listIterator();
	}
	
	public final Iterator forceIterator(){
		return forces.listIterator();
	}
	
	/**
	 * @deprecated use particleIterator
	 */
	public final Particle getParticle(int i) {
		return (Particle) particles.get(i);
	}

	/**
	 * @deprecated use forceIterator
	 */
	public final Force getForce(int i) {
		return (Force) forces.get(i);
	}
}
