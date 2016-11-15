var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();

var part = new Tone.Part(function (time, noteData){
	synth.triggerAttackRelease(noteData[0], noteData[1], time, noteData[2]);
}, []);

var headPitches = [72, 0, 0, 71, 69, 0, 67, 65, 0, 67, 0, 0, 69, 0, 72, 0, 71, 0, 0, 69, 67, 0, 65, 64, 0, 0, 0, 0, 0, 0, 0, 0];
var improvPitches = [72, 0, 0, 71, 69, 0, 67, 65, 0, 67, 0, 0, 69, 0, 72, 0, 71, 0, 0, 69, 67, 0, 65, 64, 0, 0, 0, 0, 0, 0, 0, 0];

var chords = [[9, 0, 4, 7], [2, 5, 9, 0], [7, 10, 2, 4], [0, 4, 7]]; // per measure

// generator
//var rhythms = [2, 4]; // in 16th note resolution, i.e., 4 = quater note, 16 = whole note
//var durations = [32]; // as beat subdivisions, i.e, 4 = quater note, 16 = 16th note

function fillPart(data) {
	var pos = 0;
	var posB = 0;
	var posQ = 0;
	var posS = 0;

	part.removeAll();

	for (var i=0; i<data.length; i++) {
		var time = posB + ":" + posQ + ":" + posS;
		var pitch = Tone.Frequency(data[i], "midi").eval();
		var vel = Math.random() / 3 * 2 + 0.3;
		var len = 2;
		var dur = "16n";
		if (i+1 < data.length && data[i + 1] === 0) {
		 	len += 2;
		}
		if (len === 2) dur = "16n";
		if (len === 4) dur = "8n";
		if (len === 6) dur = "6n";
		if (len === 8) dur = "4n";
		if (len === 16) dur = "2n";
		if (len > 16) dur = "1n";
		//console.log([time, pitch, dur, vel, pos]);
	  if (data[i] > 0) part.add(time, [pitch, dur, vel]);
	  pos += 2;
	  posB = Math.floor(pos/16);
	  posQ = Math.floor(pos/4)%4;
	  posS = pos%4;
	}
}

function genImprov() {
	// generate an imporvisation
	console.log("composing...");
	for (var i=0; i<headPitches.length; i++) {
		var pitchSet = [0, 2, 4, 5, 7, 9, 11];
		if (i%4 === 0) {
			chords[Math.floor(i / 8)];
		}
		if (headPitches[i] > 0) {
			improvPitches[i] = quantize(headPitches[i] + Math.round(Math.random() * 4 - 2), pitchSet);
		}
		//console.log(chords[Math.floor(i / 8)]);
	}
}
// use JS timer to replay the part after a specified interval (not an immediate loop!)
function looper(i) {
	console.log(i);
	if (i%2 === 0) {
		fillPart(headPitches);
	} else fillPart(improvPitches);
  //console.log(headPitches);
	//console.log(improvPitches);
	part.start();
	setTimeout(function(){part.stop()}, 7990);
	if (i < 3) {
		setTimeout(function(){genImprov()}, 7900);
		setTimeout(function(){looper(i + 1)}, 8000);
	}
}

function quantize (val, scale) {
	while (scale.indexOf(val%12) === -1) {
		val -= 1;
	}
	return val;
}

//console.log(quantize(10, [0, 2, 4, 5, 7, 11]));

Tone.Transport.bpm.value = 120;
Tone.Transport.timeSignature = [4, 4];
Tone.Transport.swing = 0.5;
Tone.Transport.start();

looper(0);
