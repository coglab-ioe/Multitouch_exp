context = null;
compressor = null;
reverb = null;
soundEnabled = true;

var buffers = {};
var soundmap = {
    'ir1' : './js/sound/ir1.wav'
};

function noteNum2Freq(num){
    return Math.pow(2,(num-57)/12) * 440
}

function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function(error) {
    console.log('BufferLoader: XHR error', error);
    debugger;
  }

  request.send();
};

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
};



function loadSounds(obj, soundMap, callback) {
  // Array-ify
  var names = [];
  var paths = [];
  for (var name in soundMap) {
    var path = soundMap[name];
    names.push(name);
    paths.push(path);
  }
  var bufferLoader = new BufferLoader(context, paths, function(bufferList) {
    for (var i = 0; i < bufferList.length; i++) {
      var buffer = bufferList[i];
      var name = names[i];
      obj[name] = buffer;
    }
    if (callback) {
      callback();
    }
  });
  bufferLoader.load();
}




function ADSR(){
    this.node = context.createGain();
    this.node.gain.value = 0.0;
}

ADSR.prototype.noteOn= function(delay, A,D, peakLevel, sustainlevel){
    peakLevel = peakLevel || 1;
    sustainlevel = sustainlevel || 0.3;

    this.node.gain.linearRampToValueAtTime(0.0,delay + context.currentTime);
    this.node.gain.linearRampToValueAtTime(peakLevel,delay + context.currentTime + A); // Attack
    this.node.gain.linearRampToValueAtTime(sustainlevel,delay + context.currentTime + A + D);// Decay
}

ADSR.prototype.noteOff= function(delay, R, sustainlevel){
    sustainlevel = sustainlevel || 0.1;

    this.node.gain.linearRampToValueAtTime(sustainlevel,delay + context.currentTime );// Release
    this.node.gain.linearRampToValueAtTime(0.0,delay + context.currentTime + R);// Release

}

ADSR.prototype.play= function(delay, A,D,S,R, peakLevel, sustainlevel){
  this.node.gain.linearRampToValueAtTime(0.0,delay + context.currentTime);
  this.node.gain.linearRampToValueAtTime(peakLevel,delay + context.currentTime + A); // Attack
  this.node.gain.linearRampToValueAtTime(sustainlevel,delay + context.currentTime + A + D);// Decay
  this.node.gain.linearRampToValueAtTime(sustainlevel,delay + context.currentTime + A + D + S);// sustain.
  this.node.gain.linearRampToValueAtTime(0.0,delay + context.currentTime + A + D + S + R);// Release
}
var index = 0;

function ScissorVoice(noteNum, numOsc, oscType, detune){
  this.output  = new ADSR();
  this.maxGain = 1 / numOsc;
  this.noteNum = noteNum;
  this.frequency = noteNum2Freq(noteNum);
  this.oscs = [];
  this.index = index++;
  this.time = context.currentTime;
  for (var i=0; i< numOsc; i++){
    var osc = context.createOscillator();
    if ( oscType.length === "undefined")
      osc.type = oscType;
    else
      osc.type = oscType[i%oscType.length];
    osc.frequency.value = this.frequency;
    osc.detune.value = -detune + i * 2 * detune / numOsc ;
    osc.start(context.currentTime);
    osc.connect(this.output.node);
    this.oscs.push(osc);
  }
  //console.log("played(" + index +") " + noteNum + " at " + context.currentTime);
   //   console.log("started : " +this.noteNum);

}

ScissorVoice.prototype.stop = function(time){
  //time =  time | context.currentTime;
  var it = this;
  setTimeout(function(){
 //   console.log("stopped(" + index +") " +it.noteNum + " at " +context.currentTime);
    for (var i=0; i<it.oscs.length; i++){
        it.oscs[i].disconnect();
    }
  }, Math.floor((time-context.currentTime)*1000));
}

ScissorVoice.prototype.detune = function(detune){
    for (var i=0; i<this.oscs.length; i++){
        //this.oscs[i].frequency.value = noteNum2Freq(noteNum);
        this.oscs[i].detune.value -= detune;
    }
}

ScissorVoice.prototype.connect = function(target){
  this.output.node.connect(target);
}

$(function(){


  if(soundEnabled){
    try {
      // still needed for Safari
      window.AudioContext = window.webkitAudioContext || window.AudioContext ;

    } catch(e) {
      // API not supported
      alert('Web Audio API not supported, please use most recent Chrome (41+), FireFox(31+) or Safari (iOS 7.1+).');
    }
    context = new window.AudioContext();
    compressor = context.createDynamicsCompressor()
    reverb = context.createConvolver();

    loadSounds(buffers, soundmap, function(){
      reverb.buffer = buffers['ir1'];
    });
    masterGain = context.createGain();
    masterGain.gain.value = 0.7;
    masterGain.connect(context.destination);
    compressor.connect(masterGain);
    reverb.connect(compressor);
  }

  var testOsc = context.createOscillator();
  testOsc.connect(compressor);
  testOsc.start(0);
  testOsc.stop(context.currentTime + 3);


  var oscType = ["sine","sine","triangle","triangle","sawtooth","square","triangle","sawtooth","square" ];

  var voice  =  new ScissorVoice(60,3,oscType, 20);
     //drone = new ScissorVoice(pitchListforDrone[pitchIndex],getRandomInt(3,10),"triangle", [3,5,7,12][getRandomInt(0,3)]);
  voice.stop(context.currentTime + 2);
  voice.connect(reverb);
  //function(delay, A,D, peakLevel, sustainlevel)
  //function(time, A,D,S,R, peakLevel, sustainlevel){
  voice.output.play(0,0.2,0.2,0.2,0.4,voice.maxGain*2.0,voice.maxGain );

});
