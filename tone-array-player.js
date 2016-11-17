var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();

var part = new Tone.Part(function (time, noteData){
	synth.triggerAttackRelease(noteData[0], noteData[1], time, noteData[2]);
}, []);

var head = [
	{onset: 0, pitch: 72, dur: 3},
	{onset: 4, pitch: 71, dur: 3},
// etc.
];

head[0].pitch;

var headPitches = [72, 0, 0, 71, 69, 0, 67, 65, 0, 67, 0, 0, 69, 0, 72, 0, 71, 0, 0, 69, 67, 0, 65, 64, 0, 0, 0, 0, 0, 0, 0, 0];
var headDurations = [];
var improvPitches = [72, 0, 0, 71, 69, 0, 67, 65, 0, 67, 0, 0, 69, 0, 72, 0, 71, 0, 0, 69, 67, 0, 65, 64, 0, 0, 0, 0, 0, 0, 0, 0];

var chords = [[9, 0, 4, 7], [9, 0, 4, 7], [9, 0, 4, 7], [9, 0, 4, 7],
		[2, 5, 9, 0], [2, 5, 9, 0], [2, 5, 9, 0], [2, 5, 9, 0],
		[7, 10, 2, 4], [7, 10, 2, 4], [7, 10, 2, 4], [0, 4, 7, 10],
		[0, 4, 7, 10], [0, 4, 7, 10], [0, 4, 7, 11], [0, 4, 7, 11]]; // per beat

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
		var pitchSet = [0, 2, 4, 7, 9];
		if (i%2 === 0) {
			pitchSet = chords[Math.floor(i / 2)];
		}
		if (headPitches[i] > 0) {
			improvPitches[i] = quantize(headPitches[i] + Math.round(Math.random() * 4 - 2), pitchSet);
		}
	}
}
// use JS timer to replay the part after a specified interval (may not be an immediate loop!)

function quantize (val, scale) {
	while (scale.indexOf(val%12) === -1) {
		val -= 1;
	}
	return val;
}

Tone.Transport.bpm.value = 120;
Tone.Transport.timeSignature = [4, 4];
Tone.Transport.swing = 0.5;
// Tone.Transport.loop = true;
// Tone.Transport.loopStart = 0;
// Tone.Transport.loopEnd = "4:0:0";
Tone.Transport.start();
part.loop = true;
part.loopStart = 0;
part.loopEnd = "4:0:0";

var firstTime = true;
var isImprov = true;

Tone.Transport.scheduleRepeat(function () {
	if (isImprov) { // alternate between original and improvised versions
		fillPart(headPitches);
		isImprov = false;
	} else {
		genImprov();
		fillPart(improvPitches);
		isImprov = true;
	}
	console.log(Tone.Transport.position);
	if (firstTime) {
		setTimeout(function(){part.start()}, 1);
		firstTime = false;
	}
}, "4m");


//setTimeout(function(){part.start()}, 100);

//looper(0);
