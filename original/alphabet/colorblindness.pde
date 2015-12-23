// transform matrices
float[][] lms2lmsp = { {0, 2.02344, -2.52581}, {0, 1, 0},              {0, 0, 1}                };
float[][] lms2lmsd = { {1, 0, 0},              {0.494207, 0, 1.24827}, {0, 0, 1}                };
float[][] lms2lmst = { {1, 0, 0},              {0, 1, 0},              {-0.395913, 0.801109, 0} };

float[][] rgb2lms = { {17.8824, 43.5161, 4.11935}, {3.45565, 27.1554, 3.86714}, {0.0299566, 0.184309, 1.46709} };
float[][] lms2rgb = { {0.08094445, -0.13050441, 0.11672109}, {-0.010248534, 0.05401933, -0.113614716}, {-0.0003653, -0.004121615, 0.6935114} };

// transforms a 3x1 matrix by a 3x3 matrix
float[] transform( float[] data, float[][] matrix ){
  
  float[] transformed = new float[matrix.length];
  
  for (int i = 0; i < transformed.length; i++)
    for (int j = 0; j < matrix[0].length; j++)
      transformed[i] += (matrix[i][j] * data[j]);
  
  return transformed;
}

color protanopia(color c){  
  float[] rgb = { (c >> 16) & 0xff, (c >> 8) & 0xff, (c) & 0xff };
  float[] lms = transform(rgb, rgb2lms);
  float[] lmsp = transform(lms, lms2lmst);
  float[] rgbp = transform(lmsp, lms2rgb);
  return (0xFF<<24) + ((int)constrain(rgbp[0],0,255) << 16) + ((int)constrain(rgbp[1],0,255) << 8) + ((int)constrain(rgbp[2],0,255)) ;
}

color deuteranopia(color c){  
  float[] rgb = { (c >> 16) & 0xff, (c >> 8) & 0xff, (c) & 0xff };
  float[] lms = transform(rgb, rgb2lms);
  float[] lmsd = transform(lms, lms2lmst);
  float[] rgbd = transform(lmsd, lms2rgb);
  return (0xFF<<24) + ((int)constrain(rgbd[0],0,255) << 16) + ((int)constrain(rgbd[1],0,255) << 8) + ((int)constrain(rgbd[2],0,255)) ;
}

color tritanopia(color c){  
  float[] rgb = { (c >> 16) & 0xff, (c >> 8) & 0xff, (c) & 0xff };
  float[] lms = transform(rgb, rgb2lms);
  float[] lmst = transform(lms, lms2lmst);
  float[] rgbt = transform(lmst, lms2rgb);
  return (0xFF<<24) + ((int)constrain(rgbt[0],0,255) << 16) + ((int)constrain(rgbt[1],0,255) << 8) + ((int)constrain(rgbt[2],0,255)) ;
}
