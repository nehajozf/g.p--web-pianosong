



//PLEASE INCREASE YOUR VOLUME TO HEAR THE SOUND

var video;

// Step 1 - 
var backImg;

var prevImg;

var diffImg;
var currImg;
var thresholdSlider;
var threshold;

var grid;

var sound;

var gridColour_change;
var colourSlider_change;


function setup() {
    createCanvas(640 * 2, 480);
    
    pixelDensity(1);
    
    video = createCapture(VIDEO);
    
    video.hide();
    

    thresholdSlider = createSlider(0, 255, 45);
    
    thresholdSlider.position(20, 20);
    
    
    colourSlider_change = createSlider(0,255,10);
    
    colourSlider_change.position(20,40);
    
     
    
    // Step 3 - 
    grid = new Grid(640, 480); 
    
    
    sound = new p5.MonoSynth();
    
      
    
}

function draw() {
    
    
    
    background(0);
    
    image(video, 0, 0);

    currImg = createImage(video.width, video.height);
    
    currImg.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);
    
    
    
    // Step 5 - 
    currImg.resize(currImg.width/4, currImg.height/4);
    
    // Step 4 -
    currImg.filter(BLUR, 3);
    
    
    
    diffImg = createImage(video.width, video.height);
    
    // Step 5 - 
    diffImg.resize(diffImg.width/4, diffImg.height/4);
    
    diffImg.loadPixels();

    threshold = thresholdSlider.value();
    
    
    gridColour_change = colourSlider_change.value();
    
    
    

    if (typeof prevImg !== 'undefined') {
        
        prevImg.loadPixels();
        
        currImg.loadPixels();
        
        for (var x = 0; x < currImg.width; x += 1) {
            
            for (var y = 0; y < currImg.height; y += 1) {
                
                // write code here
                
                var index = (x + (y * currImg.width)) * 4;
                
                var redSource = currImg.pixels[index + 0];
                
                var greenSource = currImg.pixels[index + 1];
                
                var blueSource = currImg.pixels[index + 2];

                var redBack = prevImg.pixels[index + 0];
                
                var greenBack = prevImg.pixels[index + 1];
                
                var blueBack = prevImg.pixels[index + 2];

                var d = dist(redSource, greenSource, blueSource, redBack, greenBack, blueBack);

                if (d > threshold) {
                    
                    diffImg.pixels[index + 0] = 0;
                    
                    diffImg.pixels[index + 1] = 0;
                    
                    diffImg.pixels[index + 2] = 0;
                    
                    diffImg.pixels[index + 3] = 255;
                    
                } else {
                    
                    diffImg.pixels[index + 0] = 255;
                    
                    diffImg.pixels[index + 1] = 255;
                    
                    diffImg.pixels[index + 2] = 255;
                    
                    diffImg.pixels[index + 3] = 255;
                }
            }
        }
    }
    
    diffImg.updatePixels();
    image(diffImg, 640, 0);

    noFill();
    stroke(255);
    fill(0);
    text(threshold, 155, 36);
    
    text('Colour Change Slider', 155, 60);
    
    prevImg = createImage(currImg.width, currImg.height);
    
    prevImg.copy(currImg, 0, 0, currImg.width, currImg.height, 0, 0, currImg.width, currImg.height);
    
    // Step 3 - 
    grid.run(diffImg);
    
    
    
    checkForSound();
    
}

// Step 6 - 
function squareDist(x1, y1, z1, x2, y2, z2){
    
  var sq = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) + (z2-z1)*(z2-z1);
    
  return sq;
}



// Step 6 -    
function playSound() {
    
  userStartAudio();


    let note = random(['D2', 'B4', 'A6']);
    
 
    let speed = 0.1;
    
    
    let TimeInSec = 0;
    
    let duration = 1/10000;

    
    
    sound.play(note, speed, TimeInSec, duration);
}
 
// Step 6 - 
function checkForSound(){
    
    for (var i = 0; i < 16; i++){
        
      for (var j = 0; j < 12; j++){
          
          if(grid.noteState[i][j] != 0){
              
              playSound();
          }
      }
    }
}