public class Integrator
{
  public float target,value,k;

  public Integrator( float v ){
    this(v, 0.2f);
  }

  public Integrator( float v, float k ){
    target = v;
    value = v;
    this.k = k;
  }

  public void update(){
    value += (target-value)*k;
  }
}
