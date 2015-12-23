class BeatMatcher{
  
  PApplet parent;
  
  int[] taps;
  int oldest = 0;
  int newest = 0;
  int tapCount = 0;
  int lastFrame;
  float rate;
  int beatNum = 0;
  int measure = 4;
  
  int lastTap = 0;
  int lastTrigger = 0;
  
  int future = 15;
  
  BeatMatcher(PApplet mom){
    parent = mom;
    taps = new int[8];
    clear();
  }
  
  void tap(){
    
    if( tapCount > 1 && millis() - lastTap > rate*2 )
      resetArray();
    
    if(tapCount == taps.length){
      newest = oldest;
      oldest = (oldest+1)%taps.length;
    }else if(tapCount > 0){
      tapCount++;
      newest++;
    }else{
      tapCount++;
    }
    
    lastTap = millis();
    taps[newest] = millis();
    
    float diff = 0;
    if( tapCount > 1 )
      diff = (taps[newest] - taps[oldest]) / (tapCount-1);
    
    println( diff );
    
    if( diff < 2000 ){
      rate = diff;
    }
    
    trigger();
    
  }
  
  int bpm(){
    if( rate == 0 )
      return 0;
    return (int) round((float)60000/rate);
  }
  
  void clear(){
    lastTrigger = 0;
    rate = 0;
    tapCount = 0;
    for(int i=0; i<taps.length; i++)
      taps[i]=0;
  }
  
  void resetArray(){
    tapCount = 0;
    newest = 0;
    oldest = 0;
  }
  
  void update(){
    
    int now = millis()+future;
    
    if( now >= lastTrigger + rate && lastFrame < lastTrigger + rate ){
      
      while( lastTrigger + rate <= now ){
        trigger();
      }
      
    }
    
    lastFrame = now;
  }
  
  void trigger(){
    if( millis() - lastTrigger > 0.5*rate ){
      lastTrigger = millis();
      beatNum = (beatNum+1)%measure;
      beat();
    }
  }
  
  void setMeasure(int m){
    measure = m;
    beatNum %= measure;
  }
  
  int currentBeat(){
    return beatNum;
  }
  
  float measurePosition(){
    int now = millis()+future;
    return (beatNum + ((float)now-lastTrigger)/rate)/measure;
  }
  
}
