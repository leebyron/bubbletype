BubbleLetter[] word;
Letter[] letters;
float letterSpacing = 1.2;


void loadLetters(){
  letters = new Letter[96];

  File letterFolder = new File(dataPath(""));
  File[] letterFiles = letterFolder.listFiles(new SVGOnly());
  for(int i=0; i<letterFiles.length; i++){
    String name = letterFiles[i].getName();
    name = name.substring(0, name.indexOf(".")); // cut extension

    int index = (name.length()==2)?(parseInt(name) - 32):(name.charAt(0) - 32);

    letters[ index ] = new Letter(letterFiles[i]);
    if( index >= ('a'-32) && index <= ('z'-32) )
      letters[ index + ('A'-'a') ] = letters[ index ];
  }
}

class SVGOnly implements FileFilter{
  boolean accept( File f ){
    return f.getName().indexOf(".svg") != -1;
  }
}

Letter getLetter( char c ){
  int k = c - 32;
  if( k >= letters.length || k < 0 )
    return getLetter(' ');
  Letter l = letters[k];
  if( l == null )
    return getLetter(' ');
  return l;
}

void drawWord(String w){
  
  float wordWidth = 0;
  for(int i=0; i<min(word.length,w.length()); i++){
    wordWidth += getLetter(w.charAt(i)).w *letterSpacing;
  }
  
  for(int i=0; i<word.length; i++){
    word[i].detachLetter();
  }
  
  float offset = -0.5*wordWidth;
  for(int i=0; i<min(word.length,w.length()); i++){
    Letter l = getLetter(w.charAt(i));
    offset += l.w*0.5*letterSpacing;
    word[i].center = new Vector3D(offset,0,0);
    offset += l.w*0.5*letterSpacing;
    word[i].make( l );
  }
  
}
