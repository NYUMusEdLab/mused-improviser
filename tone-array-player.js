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

//test data
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
// 	{onset: 15, pitch: 62, dur: 1},
// 	{onset: 16, pitch: 60, dur: 1},
// 	{onset: 17, pitch: 62, dur: 1},
// 	{onset: 18, pitch: 60, dur: 1},
// 	{onset: 19, pitch: 62, dur: 1},
// 	{onset: 20, pitch: 60, dur: 1},
// 	{onset: 21, pitch: 62, dur: 1},
// 	{onset: 22, pitch: 60, dur: 1},
// 	{onset: 23, pitch: 62, dur: 1},
// 	{onset: 24, pitch: 60, dur: 1},
// 	{onset: 25, pitch: 62, dur: 1},
// 	{onset: 26, pitch: 60, dur: 1},
// 	{onset: 27, pitch: 62, dur: 1},
// 	{onset: 28, pitch: 60, dur: 1},
// 	{onset: 29, pitch: 62, dur: 1},
// 	{onset: 30, pitch: 60, dur: 1},
// 	{onset: 31, pitch: 62, dur: 1},
// ];

var improvData = [];
var perfData = [];

var chords = [[9, 0, 4, 7], [9, 0, 4, 7], [9, 0, 4, 7], [9, 0, 4, 7],
		[2, 5, 9, 0], [2, 5, 9, 0], [2, 5, 9, 0], [2, 5, 9, 0],
		[7, 10, 2, 4], [7, 10, 2, 4], [7, 10, 2, 4], [0, 4, 7, 10],
		[0, 4, 7, 10], [0, 4, 7, 10], [0, 4, 7, 11], [0, 4, 7, 11]]; // changes per beat

function fillPart(data) {
	part.removeAll();
	for (var i=0; i<data.length; i++) {
		var pos = data[i].onset * 2;
		var time = Math.floor(pos/16) + ":" + Math.floor(pos/4)%4 + ":" + pos%4;
		var pitch = Tone.Frequency(data[i].pitch, "midi").eval();
		var vel = Math.random() / 6 * 2 + 0.6;
		var len = data[i].dur;
		//console.log(i);
		// //console.log([time, pitch, dur, vel, pos]);
	  part.add(time, [pitch, convertDur(len), vel]);
	}
}

function convertDur(len) {
	var dur = "16n";
	//if (len === 1) dur = "16n";
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
	var improvIndex = 0;
	for (var i=0; i<headData.length; i++) {
		var divide = false;
		var dur1 = headData[i].dur;
		var dur2 = 0;
		var onset2 = 0;
		// decide to insert notes by dividing 1 into 2?
		if (i < (headData.length - 1) && (headData[i].onset < 32) &&
		 	((headData[i + 1].onset - headData[i].onset) >= 2) && (Math.random() < 0.3)) { //%2 === 0
		 		console.log("dividing", i);
				divide = true;
				dur1 = dur1 / 2;
				dur2 = dur1;
				onset2 = Math.round(headData[i].onset + (headData[i + 1].onset - headData[i].onset) / 2);
		}
		// calculate the next pitch
		var pitchSet = [];
		if (i%2 === 0) {
			pitchSet = chords[Math.floor(i / 2)];
		} else {
			pitchSet = pitchSet.concat([0, 2, 4, 7, 9]);
		}
		var newPitch = quantize(headData[i].pitch + Math.round(Math.random() * 4 - 2), pitchSet);
		if (improvData.length > 0 && improvData[improvIndex - 1].pitch === newPitch) { // avoid some duplicates
			console.log("avoiding duplicate pitch", i);
			newPitch = quantize(headData[i].pitch + Math.round(Math.random() * 4 - 2), pitchSet);
		}
		// add note(s) - perhaps leave one out from time to time
		if (headData[i].onset % 4 === 0 || headData[i].dur > 3 || Math.random() < 0.8) {
			improvData.push({onset: headData[i].onset, pitch: newPitch, dur: dur1});
			improvIndex += 1;
		} else { // add duration on to prev note
			console.log("dropped a note", i);
			if (improvIndex > 1) {
					improvData[improvIndex - 2].dur =
							improvData[improvIndex - 2].dur + Math.round(headData[i].dur * Math.random());
			}
		}
		if (divide) {
			var avePitch = headData[i].pitch;
			 if (i < headData.length - 1) {
				avePitch = Math.round((headData[i].pitch + headData[i+1].pitch) / 2.0);
			 }
			var newPitch2 = quantize(avePitch + Math.min(6, Math.round(Math.max(-6, gauss()))), pitchSet);
			//console.log(gauss());
			improvData.push({onset: onset2, pitch: newPitch2, dur: dur2});
			improvIndex += 1;
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

// perscussion
var osc = new Tone.Oscillator('C2').toMaster();
var noiseSynth = new Tone.NoiseSynth().toMaster();
var percCnt = 0;

var percLoop = new Tone.Loop(function(time){
	noiseSynth.triggerAttackRelease("8n", time, 0.4);
	if (percCnt%4 === 0) { osc.start(time).stop(time + 0.01) };
	percCnt += 1;
}, '8n');

// shcedule the part repeatedly
Tone.Transport.bpm.value = 124;
Tone.Transport.timeSignature = [4, 4];
Tone.Transport.swingSubdivision = "8n";
Tone.Transport.swing = 0.5;
Tone.Transport.start("+1");
part.loop = true;
part.loopStart = 0;
part.loopEnd = "4:0:0";

var firstTime = true;
var isImprov = true;

Tone.Transport.scheduleRepeat(function () {
	if (isImprov) { // alternate between original and improvised versions
		fillPart(headData);
		console.log("*** playing head...");
		isImprov = false;
	} else {
		genImprov();
		fillPart(improvData);
		console.log("*** playing improv...");
		isImprov = true;
	}
	//console.log(Tone.Transport.position);
	if (firstTime) {
		setTimeout(function(){part.start()}, 1);
		setTimeout(function(){percLoop.start()}, 1);
		firstTime = false;
	}
}, "4m");

// helper functions
// returns a gaussian random function with the given mean and stdev.
function gaussian(mean, stdev) {
    var y2;
    var use_last = false;
    return function() {
        var y1;
        if(use_last) {
           y1 = y2;
           use_last = false;
        }
        else {
            var x1, x2, w;
            do {
                 x1 = 2.0 * Math.random() - 1.0;
                 x2 = 2.0 * Math.random() - 1.0;
                 w  = x1 * x1 + x2 * x2;
            } while( w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w))/w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
       }

       var retval = mean + stdev * y1;
       if(retval > 0)
           return retval;
       return -retval;
   }
}

// make a standard gaussian variable.
var gauss = gaussian(-2, 2);

// make a bunch of standard variates
// for(i=0; i<2000; i++) {
//    console.log(standard());
// }
