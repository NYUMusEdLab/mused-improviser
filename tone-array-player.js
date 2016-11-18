var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();

var part = new Tone.Part(function (time, noteData){
	synth.triggerAttackRelease(noteData[0], noteData[1], time, noteData[2]);
}, []);
 // onset and durations in 8th notes
var headData = [
	{onset: 0, pitch: 72, dur: 3},
	{onset: 3, pitch: 71, dur: 1},
	{onset: 4, pitch: 69, dur: 2},
	{onset: 6, pitch: 67, dur: 1},
	{onset: 7, pitch: 65, dur: 2},
	{onset: 9, pitch: 67, dur: 3},
	{onset: 12, pitch: 69, dur: 2},
	{onset: 14, pitch: 72, dur: 2},
	{onset: 16, pitch: 71, dur: 3},
	{onset: 19, pitch: 69, dur: 1},
	{onset: 20, pitch: 67, dur: 2},
	{onset: 22, pitch: 65, dur: 1},
	{onset: 23, pitch: 64, dur: 9}
];

// test data
// var headData = [
// 	{onset: 0, pitch: 60, dur: 1},
// 	{onset: 1, pitch: 62, dur: 1},
// 	{onset: 2, pitch: 60, dur: 1},
// 	{onset: 3, pitch: 62, dur: 1},
// 	{onset: 4, pitch: 60, dur: 1},
// 	{onset: 5, pitch: 62, dur: 1},
// 	{onset: 6, pitch: 60, dur: 1},
// 	{onset: 7, pitch: 62, dur: 1},
// 	{onset: 8, pitch: 60, dur: 1},
// 	{onset: 9, pitch: 62, dur: 1},
// 	{onset: 10, pitch: 60, dur: 1},
// 	{onset: 11, pitch: 62, dur: 1},
// 	{onset: 12, pitch: 60, dur: 1},
// 	{onset: 13, pitch: 62, dur: 1},
// 	{onset: 14, pitch: 60, dur: 1},
// 	{onset: 15, pitch: 62, dur: 1}
// ];

var improvData = [];
var perfData = [];

var chords = [[9, 0, 4, 7], [9, 0, 4, 7], [9, 0, 4, 7], [9, 0, 4, 7],
		[2, 5, 9, 0], [2, 5, 9, 0], [2, 5, 9, 0], [2, 5, 9, 0],
		[7, 10, 2, 4], [7, 10, 2, 4], [7, 10, 2, 4], [0, 4, 7, 10],
		[0, 4, 7, 10], [0, 4, 7, 10], [0, 4, 7, 11], [0, 4, 7, 11]]; // per beat

function fillPart(data) {
	part.removeAll();
	for (var i=0; i<data.length; i++) {
		var pos = data[i].onset * 2;
		var time = Math.floor(pos/16) + ":" + Math.floor(pos/4)%4 + ":" + pos%4;
		var pitch = Tone.Frequency(data[i].pitch, "midi").eval();
		var vel = Math.random() / 3 * 2 + 0.3;
		var len = data[i].dur;
		//console.log(i);
		// //console.log([time, pitch, dur, vel, pos]);
	  part.add(time, [pitch, convertDur(len), vel]);
	}
}

function convertDur(len) {
	var dur = "16n";
	if (len === 1) dur = "16n";
	if (len === 2) dur = "8n";
	if (len === 3) dur = "6n";
	if (len >= 4 && len <= 7) dur = "4n";
	if (len >= 8 ) dur = "2n";
	return dur;
}

function genImprov() {
	//generate an improvisation
	console.log("composing...");
	improvData = []; // start empty
	for (var i=0; i<headData.length; i++) {
		// decide to insert notes by dividing 1 into 2?
		var divide = false;
		var dur1 = headData[i].dur;
		var dur2 = 0;
		var onset2 = 0;
		if (i < (headData.length - 1) && (headData[i].onset < 32) &&
		 	((headData[i + 1].onset - headData[i].onset)%2 === 0) && (Math.random() < 0.5)) {
		 		console.log("half", i);
				divide = true;
				dur1 = dur1 / 2;
				dur2 = dur1;
				onset2 = headData[i].onset + (headData[i + 1].onset - headData[i].onset) / 2;
		}
		// calculate the next pitch
		var pitchSet = [];
		if (i%2 === 0) {
			pitchSet = chords[Math.floor(i / 2)];
		} else {
			pitchSet = pitchSet.concat([0, 2, 4, 7, 9]);
		}
		var newPitch = quantize(headData[i].pitch + Math.round(Math.random() * 4 - 2), pitchSet);
		// add note(s) - perhaps leave one out from time to time
		if (headData[i].onset % 4 === 0 || headData[i].dur > 3 || Math.random() < 0.2) {
			improvData.push({onset: headData[i].onset, pitch: newPitch, dur: dur1});
		}
		if (divide) {
			var newPitch2 = quantize(headData[i].pitch + Math.round(Math.random() * 4 - 2), pitchSet);
			improvData.push({onset: onset2, pitch: newPitch2, dur: dur2});
		}
	}
}
// adjust pitch to match one of the supplied pitch classes
function quantize (val, scale) {
	while (scale.indexOf(val%12) === -1) {
		val -= 1;
	}
	return val;
}

Tone.Transport.bpm.value = 124;
Tone.Transport.timeSignature = [4, 4];
Tone.Transport.swing = 0.6;
Tone.Transport.start();
part.loop = true;
part.loopStart = 0;
part.loopEnd = "4:0:0";

var firstTime = true;
var isImprov = true;

Tone.Transport.scheduleRepeat(function () {
	if (isImprov) { // alternate between original and improvised versions
		fillPart(headData);
		isImprov = false;
	} else {
		genImprov();
		fillPart(improvData);
		isImprov = true;
	}
	//console.log(Tone.Transport.position);
	if (firstTime) {
		setTimeout(function(){part.start()}, 1);
		firstTime = false;
	}
}, "4m");
