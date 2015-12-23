package megamu.physics;

public class Vector3D
{
	public float x;
	public float y;
	public float z;

	// constructor
	public Vector3D(float X, float Y, float Z) {
		x = X;
		y = Y;
		z = Z;
	}

	public Vector3D() {
		this(0.0f,0.0f,0.0f);
	}

	public Vector3D(Vector3D p) {
		this(p.x,p.y,p.z);
	}

	//////////////////////////////////
	// getters
	public final float x() {
		return x;
	}

	public final float y() {
		return y;
	}

	public final float z() {
		return z;
	}

	//////////////////////////////////
	// setters
	public final void setX(float X) {
		x = X;
	}

	public final void setY(float Y) {
		y = Y;
	}

	public final void setZ(float Z) {
		z = Z;
	}

	public final void set(float X, float Y, float Z) {
		x = X;
		y = Y;
		z = Z;
	}

	public final void set(Vector3D p) {
		x = p.x;
		y = p.y;
		z = p.z;
	}
	
	public final void clear() {
		x = 0.0F;
		y = 0.0F;
		z = 0.0F;
	}

	//////////////////////////////////
	// adding
	public final Vector3D add(Vector3D p) {
		x += p.x;
		y += p.y;
		z += p.z;
		return this;
	}
	
	public final Vector3D add(float a, float b, float c) {
		x += a;
		y += b;
		z += c;
		return this;
	}
	
	//////////////////////////////////
	// subtracting
	public final Vector3D subtract(Vector3D p) {
		x -= p.x;
		y -= p.y;
		z -= p.z;
		return this;
	}
	
	public final Vector3D subtract(float a, float b, float c) {
		x -= a;
		y -= b;
		z -= c;
		return this;
	}
	
	//////////////////////////////////
	// multiplying
	public final Vector3D multiply(Vector3D v) {
		x *= v.x;
		y *= v.y;
		z *= v.z;
		return this;
	}
	
	public final Vector3D multiply(float f) {
		x *= f;
		y *= f;
		z *= f;
		return this;
	}
	
	public final Vector3D multiply(float a, float b, float c) {
		x *= a;
		y *= b;
		z *= c;
		return this;
	}
	
	//////////////////////////////////
	// dividing
	public final Vector3D divide(Vector3D v) {
		x /= v.x;
		y /= v.y;
		z /= v.z;
		return this;
	}
	
	public final Vector3D divide(float f) {
		x /= f;
		y /= f;
		z /= f;
		return this;
	}
	
	public final Vector3D divide(float a, float b, float c) {
		x /= a;
		y /= b;
		z /= c;
		return this;
	}

	//////////////////////////////////
	// distance & length
	public final float distance(Vector3D p) {
		float dx = x - p.x;
		float dy = y - p.y;
		float dz = z - p.z;
		return (float) Math.sqrt( dx*dx + dy*dy + dz*dz );
	}

	public final float distance(float x, float y, float z) {
		float dx = this.x - x;
		float dy = this.y - y;
		float dz = this.z - z;
		return (float) Math.sqrt( dx*dx + dy*dy + dz*dz );
	}
	
	public final float length() {
		return (float) Math.sqrt( x*x + y*y + z*z );
	}
	
	public final float angle(Vector3D v) {
		return (float) Math.atan2(v.y-y, v.x-x);
	}
	
	public final float angle() {
		return (float) Math.atan2(y, x);
	}

	//////////////////////////////////
	// normalization
	public final Vector3D normalize() {
		float l = length();
		return l == 0.0F ? this : divide(l);
	}
	
	/**
	 * Returns a new Vector3D instance rather than overwriting the current instance
	 */
	public final Vector3D unit() {
		return copy().normalize();
	}
	
	//////////////////////////////////
	// vector math
	public final float dot(Vector3D p) {
		return x * p.x + y * p.y + z * p.z;
	}
	
	/**
	 * Returns a new Vector3D instance rather than overwriting the current instance
	 */
	public final Vector3D cross(Vector3D p) {
		return new Vector3D(y * p.z - z * p.y, x * p.z - z * p.x, x * p.y - y * p.x);
	}
	
	//////////////////////////////////
	// object overrides
	public final Object clone(){
		return new Vector3D(this);
	}
	
	public final Vector3D copy(){
		return new Vector3D(this);
	}
	
	public final String toString() {
		return new String("(" + x + ", " + y + ", " + z + ")");
	}
	
	
	
/*
	public final Vector3D plus(Vector3D p) {
		return new Vector3D(x + p.x, y + p.y, z + p.z);
	}

	public final Vector3D times(float f) {
		return new Vector3D(x * f, y * f, z * f);
	}

	public final Vector3D over(float f) {
		return new Vector3D(x / f, y / f, z / f);
	}

	public final Vector3D minus(Vector3D p) {
		return new Vector3D(x - p.x, y - p.y, z - p.z);
	}

	public final Vector3D multiplyBy(float f) {
		x *= f;
		y *= f;
		z *= f;
		return this;
	}
	
	public final Vector3D multiplyBy(Vector3D v) {
		x *= v.x;
		y *= v.y;
		z *= v.z;
		return this;
	}
*/
	

	

	

	

	

	
}
