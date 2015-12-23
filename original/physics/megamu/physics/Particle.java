package megamu.physics;

public class Particle
{
	protected Vector3D position;
	protected Vector3D velocity;
	protected Vector3D force;
	protected float mass;
	protected float size;
	protected float age;
	protected boolean dead;
	protected boolean fixed;
	protected boolean invisible;

	public Particle(float s, float m, Vector3D p) {
		position = new Vector3D(p);
		velocity = new Vector3D();
		force = new Vector3D();
		mass = m;
		size = s;
		fixed = false;
		age = 0.0F;
		dead = false;
	}
	
	public Vector3D position() {
		return position;
	}
	
	public void setPosition(float x, float y, float z){
		position.set(x, y, z);
	}
	
	public void setPosition(Vector3D v){
		position.set(v);
	}
	
	public final Vector3D velocity() {
		return velocity;
	}
	
	public final void setVelocity(float x, float y, float z) {
		velocity.set(x, y, z);
	}
	
	public final void setVelocity(Vector3D v) {
		velocity.set(v);
	}
	
	public final Vector3D force() {
		return force;
	}
	
	public final void setForce(float x, float y, float z) {
		force.set(x, y, z);
	}
	
	public final void setForce(Vector3D v) {
		force.set(v);
	}

	public final void makeFixed() {
		fixed = true;
		velocity.clear();
	}

	public final boolean isFixed() {
		return fixed;
	}

	public final boolean isFree() {
		return !fixed;
	}

	public final void makeFree() {
		fixed = false;
	}
	
	public final boolean isInvisible(){
		return invisible;
	}
	
	public final void makeInvisible(){
		invisible = true;
	}
	
	public final boolean isVisible(){
		return !invisible;
	}
	
	public final void makeVisible(){
		invisible = false;
	}

	public final float mass() {
		return mass;
	}

	public final void setMass(float m) {
		mass = m;
	}
	
	public float size() {
		return size;
	}

	public void setSize(float s) {
		size = s;
	}

	public final float age() {
		return age;
	}

	public final void kill() {
		dead = true;
	}

	public final boolean isDead() {
		return dead;
	}
	
	public void tick(float t){
		// defaults to nothing!
	}
}