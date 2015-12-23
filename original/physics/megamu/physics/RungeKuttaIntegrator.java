package megamu.physics;

public class RungeKuttaIntegrator
{
	ParticleSystem s;
	
	Vector3D[] originalPositions;
	Vector3D[] originalVelocities;
	Vector3D[] k1Forces;
	Vector3D[] k1Velocities;
	Vector3D[] k2Forces;
	Vector3D[] k2Velocities;
	Vector3D[] k3Forces;
	Vector3D[] k3Velocities;
	Vector3D[] k4Forces;
	Vector3D[] k4Velocities;

	public RungeKuttaIntegrator(ParticleSystem world) {
		this.s = world;
	}

	public final void allocateParticles() {
		originalPositions = new Vector3D[s.particles.size()];
		originalVelocities = new Vector3D[s.particles.size()];
		k1Forces = new Vector3D[s.particles.size()];
		k1Velocities = new Vector3D[s.particles.size()];
		k2Forces = new Vector3D[s.particles.size()];
		k2Velocities = new Vector3D[s.particles.size()];
		k3Forces = new Vector3D[s.particles.size()];
		k3Velocities = new Vector3D[s.particles.size()];
		k4Forces = new Vector3D[s.particles.size()];
		k4Velocities = new Vector3D[s.particles.size()];
		
		for( int i=0; i<s.particles.size(); i++ ){
			originalPositions[i] = new Vector3D();
			originalVelocities[i] = new Vector3D();
			k1Forces[i] = new Vector3D();
			k1Velocities[i] = new Vector3D();
			k2Forces[i] = new Vector3D();
			k2Velocities[i] = new Vector3D();
			k3Forces[i] = new Vector3D();
			k3Velocities[i] = new Vector3D();
			k4Forces[i] = new Vector3D();
			k4Velocities[i] = new Vector3D();
		}	
	}

	public final void step(float deltaT) {
		
		// save original state of particles
		for (int i = 0; i < s.particles.size(); i++) {
			Particle p = (Particle) s.particles.get(i);
			if (p.isFree()) {
				originalPositions[i].set(p.position);
				originalVelocities[i].set(p.velocity);
			}
			p.force.clear();
		}
		
		// apply forces to all particles once and then save the state
		s.applyForces();
		for (int i = 0; i < s.particles.size(); i++) {
			Particle p = (Particle) s.particles.get(i);
			if (p.isFree()) {
				k1Forces[i].set(p.force);
				k1Velocities[i].set(p.velocity);
			}
			p.force.clear();
		}
		
		// update the positions
		for (int i = 0; i < s.particles.size(); i++) {
			Particle p = (Particle) s.particles.get(i);
			if (p.isFree()) {
				p.position.x = originalPositions[i].x + k1Velocities[i].x * 0.5F * deltaT;
				p.position.y = originalPositions[i].y + k1Velocities[i].y * 0.5F * deltaT;
				p.position.z = originalPositions[i].z + k1Velocities[i].z * 0.5F * deltaT;
				p.velocity.x = originalVelocities[i].x + k1Forces[i].x * 0.5F * deltaT / p.mass;
				p.velocity.y = originalVelocities[i].y + k1Forces[i].y * 0.5F * deltaT / p.mass;
				p.velocity.z = originalVelocities[i].z + k1Forces[i].z * 0.5F * deltaT / p.mass;
			}
		}
		
		// apply forces to all particles once and then save the state
		s.applyForces();
		for (int i = 0; i < s.particles.size(); i++) {
			Particle p = (Particle) s.particles.get(i);
			if (p.isFree()) {
				k2Forces[i].set(p.force);
				k2Velocities[i].set(p.velocity);
			}
			p.force.clear();
		}
		
		// update the positions
		for (int i = 0; i < s.particles.size(); i++) {
			Particle p = (Particle) s.particles.get(i);
			if (p.isFree()) {
				p.position.x = originalPositions[i].x + k2Velocities[i].x * 0.5F * deltaT;
				p.position.y = originalPositions[i].y + k2Velocities[i].y * 0.5F * deltaT;
				p.position.z = originalPositions[i].z + k2Velocities[i].z * 0.5F * deltaT;
				p.velocity.x = originalVelocities[i].x + k2Forces[i].x * 0.5F * deltaT / p.mass;
				p.velocity.y = originalVelocities[i].y + k2Forces[i].y * 0.5F * deltaT / p.mass;
				p.velocity.z = originalVelocities[i].z + k2Forces[i].z * 0.5F * deltaT / p.mass;
			}
		}

		// apply forces to all particles once and then save the state
		s.applyForces();
		for (int i = 0; i < s.particles.size(); i++) {
			Particle p = (Particle) s.particles.get(i);
			if (p.isFree()) {
				k3Forces[i].set(p.force);
				k3Velocities[i].set(p.velocity);
			}
			p.force.clear();
		}

		// update the positions
		for (int i = 0; i < s.particles.size(); i++) {
			Particle p = (Particle) s.particles.get(i);
			if (p.isFree()) {
				p.position.x = originalPositions[i].x + k3Velocities[i].x * deltaT;
				p.position.y = originalPositions[i].y + k3Velocities[i].y * deltaT;
				p.position.z = originalPositions[i].z + k3Velocities[i].z * deltaT;
				p.velocity.x = originalVelocities[i].x + k3Forces[i].x * deltaT / p.mass;
				p.velocity.y = originalVelocities[i].y + k3Forces[i].y * deltaT / p.mass;
				p.velocity.z = originalVelocities[i].z + k3Forces[i].z * deltaT / p.mass;
			}
		}
		
		// apply forces to all particles once and then save the state
		s.applyForces();
		for (int i = 0; i < s.particles.size(); i++) {
			Particle p = (Particle) s.particles.get(i);
			if (p.isFree()) {
				k4Forces[i].set(p.force);
				k4Velocities[i].set(p.velocity);
			}
		}

		// update the positions to final state
		for (int i = 0; i < s.particles.size(); i++) {
			Particle p = (Particle) s.particles.get(i);
			p.age += deltaT;
			if (p.isFree()) {
				p.position.x = (originalPositions[i].x + deltaT / 6.0F * (k1Velocities[i].x + 2.0F * k2Velocities[i].x + 2.0F * k3Velocities[i].x + k4Velocities[i].x) );
				p.position.y = (originalPositions[i].y + deltaT / 6.0F * (k1Velocities[i].y + 2.0F * k2Velocities[i].y + 2.0F * k3Velocities[i].y + k4Velocities[i].y) );
				p.position.z = (originalPositions[i].z + deltaT / 6.0F * (k1Velocities[i].z + 2.0F * k2Velocities[i].z + 2.0F * k3Velocities[i].z + k4Velocities[i].z) );
				p.velocity.x = originalVelocities[i].x + (deltaT / (6.0F * p.mass) * (k1Forces[i].x + 2.0F * k2Forces[i].x + 2.0F * k3Forces[i].x + k4Forces[i].x) );
				p.velocity.y = originalVelocities[i].y + (deltaT / (6.0F * p.mass) * (k1Forces[i].y + 2.0F * k2Forces[i].y + 2.0F * k3Forces[i].y + k4Forces[i].y) );
				p.velocity.z = originalVelocities[i].z + (deltaT / (6.0F * p.mass) * (k1Forces[i].z + 2.0F * k2Forces[i].z + 2.0F * k3Forces[i].z + k4Forces[i].z) );
			}
		}
	}
}
