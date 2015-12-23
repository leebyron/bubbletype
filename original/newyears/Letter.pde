PApplet self = this;

/*
Reads in letter data from an svg file
*/

class Letter{
  
  float[] x,y,r;
  float w,h;
  
  Letter (String file){
    parse( new XMLElement(self, file) );
  }

  Letter (File file){
    try{
      parse( new XMLElement( new FileReader(file) ) );
    }catch(Exception e){
      e.printStackTrace();
    }
  }
  
  Letter (XMLElement svg){
    parse(svg);
  }
  
  void parse(XMLElement svg){
    x = new float[8];
    y = new float[8];
    r = new float[8];
    
    int j=0;
    
    XMLElement[] kids = svg.getChildren();
    for(int i=0; i<kids.length; i++){
      if( j<8 && ( kids[i].getName().equals("circle") || kids[i].getName().equals("ellipse") ) ){
        
        x[j] = kids[i].getFloatAttribute("cx");
        y[j] = kids[i].getFloatAttribute("cy");
      
        if(kids[i].getName().equals("circle"))
          r[j] = kids[i].getFloatAttribute("r")*2;
        else if(kids[i].getName().equals("ellipse"))
          r[j] = ( kids[i].getFloatAttribute("rx") + kids[i].getFloatAttribute("ry") );
          
        j++;
        
      }
    }
    
    // fill in the blanks
    for( int i=j; j<8; j++ ){
      x[i] = -1;
      y[i] = -1;
      r[i] = 0;
//      println("blank");
    }
    
    // find min and max
    float minX=1000,maxX=-1000,minY=1000,maxY=-1000;
    for(int i=0; i<8; i++){
      if( x[i] != -1 && y[i] != -1 ){
        minX = min(minX, x[i] - r[i]*0.5);
        maxX = max(maxX, x[i] + r[i]*0.5);
        minY = min(minY, y[i] - r[i]*0.5);
        maxY = max(maxY, y[i] + r[i]*0.5);
      }
    }
    
    // set width and height
    w = maxX - minX;
    h = maxY - minY;
    
    if( w==0 || h==0 ){
      w += 1;
      h += 1;
    }
    
    
    // center points
    for(int i=0; i<8; i++){
      if( x[i] != -1 && y[i] != -1 ){
        x[i] = map(x[i], minX, maxX, -w*0.5, w*0.5);
        y[i] = map(y[i], minY, maxY, -h*0.5, h*0.5);
      }
    }
    
  }
  
}
