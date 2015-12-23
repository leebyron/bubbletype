package megamu.physics;

public abstract class Force
{
	protected boolean on;
	protected boolean dead;
	protected float strength;
	
	public Force(float k){
		on = true;
		dead = false;
		strength = k;
	}
	
	public final void turnOff(){
		on = false;
	}

	public final void turnOn(){
		on = true;
	}

	public final boolean isOn(){
		return on;
	}

	public final boolean isOff(){
		return !on;
	}
	

	public final void setStrength(float k) {
		strength = k;
	}
	
	public final float getStrength() {
		return strength;
	}
	
	public void applyForce(){
		if(!on)
			return;
		apply();
	}
    
    protected abstract void apply();
    
    public final void kill(){
    	dead = true;
    }
    
    public boolean hasDead(){
    	return dead;
    }
    
    /**
     * Extend this to make fun things like motors and other forces that update over time
     * @param t
     */
    public void tick(float t){
    	// defaults to doing nothing
    }
}
