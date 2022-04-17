
let pts;
let caslon;
let colorPicker; 
let input;
let img; 
let nval=0.1; 
let sel; 
let recording = false 
let col;
let rot; 
let alpha;
let ctx;
var inputtype ;
var randomImageLocation;  

let rbackground = [
  '#e5ecff',

 
]; 

let rfill = [
  '#ff4528',
  '#45d1f2',
  '#784dfc',
  '#009f95',
  '#ffd12b',
  '#fcb0f7'
]; 

let rstroke = [
 '#ff4528',
  '#45d1f2',
  '#784dfc',
  '#009f95',
  '#ffd12b',
  '#fcb0f7'
  
];




function preload(){
  caslon = loadFont('36days-Light.ttf');
}

function setup() {
 
   createCanvas(windowWidth, windowHeight); 
  textAlign(CENTER, CENTER);
frameRate(30)
pixelDensity(1) 
  
  button = select("#randomizer");
   button.mousePressed(changeColors); 
   button.mouseOver(changeGray); 
   button.mouseOut(changeAlpha); 
  
 colorPicker = select('#color-picker-background');
  // make front fill the same as stroke 1
  colorPickerfill = select('#color-picker-stroke'); 
  colorPickerfill2 = select('#color-picker-stroke2');
    colorPickerfill3 = select('#color-picker-stroke3');
    colorPickerfill4 = select('#color-picker-stroke4');


  colorPickerol = select('#color-picker-stroke');
  
   nslider = select('#range-points');
  cslider = select('#range-scale');
  wslider = select('#range-stroke');
  rslider = select('#range-rotate');

  sel = select('#select-brush-shape');
  sel.changed(mySelectEvent);
  
  input = select('#upload-image');
  input.changed(handleFile);
  
  selmouse = select("#animate-letter");
  selmouse.changed(mySelectEvent);
 
  button = select("#save-image");
  button.mousePressed(saveJPG); 
  button.mouseOver(changeGray); 
  button.mouseOut(changeAlpha);
  
  // We have two different save buttons now,
  // Make sure both of them do the same thing.
  buttonMobile = select("#save-image-mobile");
  buttonMobile.mousePressed(saveJPG);
  
  // Attach event listeners to the menu buttons so that
  // they animate the mobile menu to slide up or slide down.
  let menuOpen = select("#menu-open");
  menuOpen.mousePressed(() => {
    select("#menu").class("slide-up")
  })
  
  let menuClose = select("#menu-close");
  menuClose.mousePressed(() => {
    select("#menu").class("slide-down")
  })
  
   
  changeColors();
} 

function changeColors() {
// colorPicker.value("random(rbackground)")
  colorPickerol.value(random(rstroke))
  colorPickerfill.value(random(rfill))  
  colorPickerfill2.value(random(rfill)) 
  colorPickerfill3.value(random(rfill)) 
  colorPickerfill4.value(random(rfill)) 
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} 




function draw() { 
  
 
  
  let wval = wslider.value();
  let cval = 190;
  let rval = rslider.value();
  let val = sel.value();
  let valmouse = selmouse.value();
  let scalex = (mouseX/5)+5;   
  let letwidth =30;
  let movex=550; 
  let movey=150;
  
  if(windowWidth < 600 ) {
        cval = 40;
      letwidth =200;
     movex=195; 
      movey=-30;
    } else {
        cval = 190;
       letwidth =800;
      movex=550; 
      movey=150;
    }
  
  
  
  input.style('display', 'none');
   let nval = nslider.value(); 
   let nval2= nval/10; 
  
   if(valmouse != 'points'){  
     nval2= nval/10; 
   } else if(valmouse == 'points'){  
     nval2= (mouseX/(2500)); 
   } 
  
  // arrays to grab width/height of word
    let pointTrackerX = [];
    let pointTrackerY = []; 
  
  
   pts = caslon.textToPoints('c w', (windowWidth/2)-movex, (windowHeight/2)+movey, (letwidth),{
    sampleFactor: nval2,
    simplifyThreshold: 0
  });
  
  
  
  translate (0,0)
  background("#e5ecff");
  textSize(15); 
  fill(128,128,128,alpha);
  noStroke(); 
//  text('Click to start/stop recording ', 10, 620);
  
  fill(colorPickerfill.value());
  stroke(colorPickerol.value()); 
  
  translate(width*0.1, height*0.1)
   scale(0.8);
 
   if(valmouse != 'stroke'){   
  strokeWeight(wval); 
   } else if (valmouse == 'stroke'){ 
     strokeWeight(mouseX/100); 
   }
   
  if(valmouse != 'rotate'){  
     
    rot = rval; 
   } else if (valmouse == 'rotate'){ 
      rot = mouseX/1000; 
   }
  
   if(valmouse != 'scale'){  
     sca = cval; 
   } else if (valmouse == 'scale'){ 
      sca = scalex; 
   }
  
  
  
  for(let i =0; i< pts.length; i++){
 
      
    
  if(val == 'circle'){ 
     push()
    translate((pts[i].x) ,(pts[i].y))
    rotate(frameCount * rot/100);
    // rotate(rot);
    ellipse(0, 0, sca, sca); 
    input.style('display', 'none'); 
    pop()
  } else if(val == 'square'){
     push()
    translate((pts[i].x) ,(pts[i].y))
    rotate(frameCount * rot/100);
    // rotate(rot);
   	rect(-sca/2, -sca/2, sca, sca);   
   
    
     fill(colorPickerfill3.value());
    rect((-sca/2)-5, (-sca/2)+5, sca+9, sca); 
    
     fill(colorPickerfill.value());
    rect((-sca/2)-5, (-sca/2), sca, sca); 
    
    fill(colorPickerfill2.value());
    rect((-sca/2)+5, -sca/2, sca, sca); 
   
    fill(colorPickerfill4.value());
    rect((-sca/2), (-sca/2)-0.5, sca, sca+0.5);
    pop()
  } else if(val == 'image'){
    push()
    translate((pts[i].x) ,(pts[i].y))
    rotate(frameCount * rot/100);
    // rotate(rot);
   	input.style('display', 'block');
    if (img) {
    image(img, -sca/2, -sca/2, (sca*(img.width))/img.height, sca);
    noFill();
    rect(-sca/2, -sca/2, (sca*(img.width))/img.height, sca);
    } 
    pop()
  }  

    
    
    
  
  }
  return false;
} 

function mySelectEvent() {
}



function handleFile(file) {
  let fileData = file.target.files[0]

  if (fileData.type.includes("image")) {
    let urlOfImageFile = URL.createObjectURL(fileData);
    let imageObject = loadImage(urlOfImageFile, (myImg) => {
      img = myImg
    })
  } else {    
    img = null
  }
} 


function changeGray() {
  alpha = 0;
  }
  
function changeAlpha() {
  alpha = 255;
  }


function saveJPG() {
   console.log("saving")
    save();
    console.log("saved...?") 
   
}






function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
} 

