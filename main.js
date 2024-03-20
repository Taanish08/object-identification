function setup() {
  canvas = createCanvas(500, 375);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelloaded)
}

function draw() {
  image(video, 0,0,500,375);

  classifier.classify(video, gotresult);

}

function modelloaded() {
  console.log("model has loaded")
}
var previous_results = '';

function gotresult(error, results) {
  if(error) {
    console.error(error);
  }
  else {
if((results[0].confidence > 0.5) && (previous_results !=results[0].label)) {

  console.log(results);
previous_results = results[0].label;

synth = window.speechSynthesis;
speak_data = 'Object detected is - ' +results[0].label;
utterThis = new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);

document.getElementById("object").innerHTML =  results[0].label ;
document.getElementById("confidence").innerHTML =  results[0].confidence.toFixed(2)*100 +"%";
}
    
  }
}


