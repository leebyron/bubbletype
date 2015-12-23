class Ebb{
  
  float speed;
  float t;
  
  int w,h;
  float data[][];
  
  Ebb( int w, int h, float speed ){
    data = new float[w][h];
    this.w = w;
    this.h = h;
    this.speed = speed;
  }
  
  void update(){
    for(int x=0; x<w; x++){
      for(int y=0; y<h; y++){
        float n = noise( 2*(float)x/w, 2*(float)y/h, t );
        data[x][y] = ( data[x][y] + (n-0.5)*0.01 ) * 0.995 + (t*0.1)*0.005;
      }
    }
    t += 0.01*speed;
  }
  
  void advance(float n){
    for(int x=0; x<w; x++){
      for(int y=0; y<h; y++){
        data[x][y] += n;
      }
    }
    t += n*10;
  }

  
  float get(int x, int y){
    return ( data[x][y] + ceil(abs(data[x][y])) ) % 1;
  }
  
}
