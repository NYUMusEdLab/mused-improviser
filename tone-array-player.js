var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();

var part = new Tone.Part(function (time, noteData){
	synth.triggerAttackRelease(noteData[0], noteData[1], time, noteData[2]);
}, []);

var headPitches = [60, 61, 62, 63, 61, 62, 63, 64, 62, 63, 64, 65, 63, 64, 65, 66];
var improvPitches = [60, 61, 62, 63, 61, 62, 63, 64, 62, 63, 64, 65, 63, 64, 65, 66];

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
		var dur = "16n";
		//console.log([time, pitch, dur, vel, pos]);
	  if (pitch <> 0) part.add(time, [pitch, dur, vel]);
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
		if (pitch <> 0) improvPitches[i] = headPitches[i] + Math.round(Math.random() * 4 - 2);
	}
}
// use JS timer to replay the part after a specified interval (not an immediate loop!)
function looper(i) {
	console.log(i);
	fillPart(improvPitches);
	part.start();
	setTimeout(function(){part.stop()}, 3990);
	setTimeout(function(){genImprov()}, 3900);
	if (i < 3) setTimeout(function(){looper(i + 1)}, 4000);
}

Tone.Transport.bpm.value = 120;
Tone.Transport.timeSignature = [4, 4];
Tone.Transport.swing = 0.5;
Tone.Transport.start();

looper(0);
