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
	{onset: 23, pitch: 64, dur: 9},
	{onset: 32, pitch: 69, dur: 3},
	{onset: 35, pitch: 67, dur: 1},
	{onset: 36, pitch: 65, dur: 2},
	{onset: 38, pitch: 64, dur: 1},
	{onset: 39, pitch: 62, dur: 2},
	{onset: 41, pitch: 64, dur: 3},
	{onset: 44, pitch: 65, dur: 2},
	{onset: 46, pitch: 69, dur: 2},
	{onset: 48, pitch: 68, dur: 3},
	{onset: 51, pitch: 65, dur: 1},
	{onset: 52, pitch: 64, dur: 2},
	{onset: 54, pitch: 62, dur: 1},
	{onset: 55, pitch: 60, dur: 7}
];

var improvData = [];

var perfData = [
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


var harmChords = [[9, 0, 4, 7], [9, 0, 4, 7], [9, 0, 4, 7], [9, 0, 4, 7],
		[2, 5, 9, 0], [2, 5, 9, 0], [2, 5, 9, 0], [2, 5, 9, 0],
		[7, 11, 2, 5], [7, 11, 2, 5], [7, 11, 2, 5], [7, 11, 2, 5],
		[0, 4, 7, 11], [0, 4, 7, 11], [0, 4, 7, 10], [0, 4, 7, 10],
		[5, 9, 0, 4], [5, 9, 0, 4], [5, 9, 0, 4], [5, 9, 0, 4],
		[11, 2, 4, 9], [11, 2, 4, 9], [11, 2, 4, 9], [11, 2, 4, 9],
		[4, 8, 11, 2], [4, 8, 11, 2], [4, 8, 11, 2], [4, 8, 11, 2],
	 	[9, 0, 4, 7], [9, 0, 4, 7], [9, 1, 4, 7], [9, 1, 4, 7]]; // changes per beat

var melChords = [[9, 0, 4], [9, 0, 4, 7], [9, 0, 4, 7], [9, 0, 4, 7],
		[2, 5, 9], [2, 5, 9, 0], [2, 5, 9, 0], [2, 5, 9, 0],
		[7, 11, 2], [7, 11, 2, 5], [7, 11, 2, 5], [0, 4],
		[0, 4, 7], [0, 4, 7, 11], [0, 4, 7], [0, 4, 7, 10],
		[5, 9, 0], [5, 9, 0, 4], [5, 9, 0, 4], [5, 9, 0, 4],
		[11, 2, 4], [11, 2, 4, 9], [11, 2, 4, 9], [11, 2, 4, 9],
		[4, 8, 11], [4, 8, 11, 2], [4, 8, 11, 2], [9, 0, 4, 7],
		[9, 0, 4], [9, 0, 4, 7], [9, 1, 4, 7], [9, 1, 4, 7]]; // changes per beat

var melScales = [[0, 4, 7], [0, 2, 4, 7, 9, 11], [0, 2, 4, 7, 9, 11], [0, 2, 4, 7, 9, 11],
	[0, 2, 4, 7, 9], [0, 2, 4, 7, 9], [0, 2, 4, 7, 9], [0, 2, 4, 7, 9],
  [7, 9, 11, 0, 2], [7, 9, 11, 0, 2], [7, 9, 11, 0, 2], [0, 4],
	[0, 2, 4, 7, 9], [0, 2, 4, 7, 9], [0, 2, 4, 7, 9], [0, 2, 4, 7, 9],
	[5, 7, 9, 0, 2], [5, 7, 9, 0, 2], [5, 7, 9, 0, 2], [5, 7, 9, 0, 2],
	[11, 0, 2, 4], [11, 0, 2, 4, 5, 9], [11, 0, 2, 4, 5, 9], [11, 0, 2, 4, 5, 9],
	[4, 5, 8, 11, 2], [4, 5, 8, 11, 2], [4, 5, 8, 11, 2], [0, 9],
	[[0, 4, 7], [0, 2, 4, 7, 9, 11], [1, 2, 4, 7, 9, 11], [1, 2, 4, 7, 9, 11]]];

var totalSteps = 64; // length to loop through in 1/8 notes
var playLength = "8m";
var beatCnt = 0; // updated in the comp loop

function fillPart(data) {
	part.removeAll();
	for (var i=0; i<data.length; i++) {
		var pos = data[i].onset * 2;
		var time = Math.floor(pos/16) + ":" + Math.floor(pos/4)%4 + ":" + pos%4;
		var pitch = Tone.Frequency(data[i].pitch, "midi").eval();
		var vel = Math.random() / 6 * 2 + 0.6;
		var len = data[i].dur;
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
// repetition state
var repeating = false;
var lastBeatIndex = 0;
var onsetOffset = 0;
var repIndexCnt = 0;
var repPitchVarOptions = [2, -2];
var repPitchVar = 0;

//var prevOnset = 0; // bedug only

function genImprov() {
	//prevOnset = 0;// debug only
	//generate an improvisation
	console.log("composing...");
	improvData = []; // start empty
	var improvIndex = 0;
	for (var i=0; i<headData.length; i++) {
		var locIndex = i;
		// reset on first bar
		if (headData[i].onset < 4) {
			onsetOffset = 0;
			lastBeatIndex = 0;
			repIndexCnt = 0;
			repPitchVar = 0;
		}
		// decide to repeat previous beat?
		if (headData[i].onset >= 4 && headData[i].onset%4 === 0) {
			lastBeatIndex = i;
			if (Math.random() < 0.5) { // repeat?
				repeating = true;
				locIndex = lastBeatIndex;
				onsetOffset = headData[i].onset - headData[lastBeatIndex].onset;
				repIndexCnt = 0;
				repPitchVar = repPitchVarOptions[Math.floor(Math.random() * repPitchVarOptions.length)];
				console.log("repeating at", i, "repPitchVar", repPitchVar);
				// for (var j=0; j<improvData.length; j++) {
				// 	if (improvData[j].onset === headData[i].onset) console.log("equal at ", j)
				// }
				// console.log("improv last entry", improvData[improvData.length - 1].onset,
				// 	improvData[improvData.length - 1].pitch, improvData[improvData.length - 1].dur)
			} else {
				repeating = false;
			}
		}
		if (repeating && headData[i].onset%4 != 0) {
				repIndexCnt += 1;
				locIndex = lastBeatIndex + repIndexCnt;
				//console.log("repIndexCnt", repeating, repIndexCnt, locIndex, lastBeatIndex);
		}
		var divide = false;
		var dur1 = headData[locIndex].dur;
		var dur2 = 0;
		var onset2 = 0;
		// decide to insert notes by dividing 1 into 2?
		if (i < (headData.length - 1) && (headData[locIndex].onset < totalSteps) &&
		 	((headData[i + 1].onset - headData[locIndex].onset) >= 2) && (Math.random() < 0.4)) { //higer values -> busier
		 		console.log("dividing at", locIndex);
				divide = true;
				dur1 = dur1 / 2;
				dur2 = dur1;
				onset2 = Math.round(headData[locIndex].onset + (headData[locIndex + 1].onset - headData[locIndex].onset) / 2);
		}
		// calculate the next pitch
		var pitchSet = [];
		if (headData[locIndex].onset%2 === 0) {
			pitchSet = melChords[Math.floor(headData[locIndex].onset/2)];
		} else {
			pitchSet = pitchSet.concat(melScales[Math.floor(headData[locIndex].onset/2)]);
		}
		// round pitch to fit the current chord + scale
		var newPitch = quantize(headData[locIndex].pitch + repPitchVar + Math.round(Math.random() * 4 - 2), pitchSet);
		if (improvData.length > 0 && improvData[improvIndex - 1].pitch === newPitch) { // avoid some duplicates
			console.log("avoiding duplicate pitch", locIndex);
			newPitch = quantize(headData[locIndex].pitch + repPitchVar + Math.round(Math.random() * 4 - 2), pitchSet);
		}
		// add note(s) - perhaps leave one out from time to time
		if (headData[i].onset % 4 === 0 || headData[locIndex].dur > 3 || Math.random() < 0.8) {
			improvData.push({onset: headData[locIndex].onset + onsetOffset, pitch: newPitch, dur: dur1});
			improvIndex += 1;
			// debug only
			// if (headData[locIndex].onset + onsetOffset <= prevOnset) console.log("!!!!", "i", i, "locIndex", locIndex, "onsetOffset", onsetOffset, "calcOnset", headData[locIndex].onset + onsetOffset, "prevOnset", prevOnset);
			// prevOnset = headData[locIndex].onset + onsetOffset;
		} else { // add duration on to prev note
			console.log("dropped a note", locIndex);
			if (improvIndex > 1) {
					improvData[improvIndex - 2].dur =
							improvData[improvIndex - 2].dur + Math.round(headData[locIndex].dur * Math.random());
			}
		}
		// split one note into two if the decision has been made
		if (divide) {
			var avePitch = headData[locIndex].pitch;
		 	if (i < headData.length - 1) {
				avePitch = Math.round((headData[locIndex].pitch + headData[locIndex+1].pitch) / 2.0);
		 	}
			var newPitch2 = quantize(avePitch + repPitchVar + Math.min(6, Math.round(Math.max(-6, gauss()))), pitchSet);
			//console.log(gauss());
			improvData.push({onset: onset2 + onsetOffset, pitch: newPitch2, dur: dur2});
			improvIndex += 1;
			// debug only
			// if (onset2 + onsetOffset <= prevOnset) console.log("!!!!", onset2 + onsetOffset, prevOnset);
			// prevOnset = onset2 + onsetOffset;
		}
	}
	for (var i=0; i<improvData.length; i++) {
			console.log(improvData[i].onset, improvData[i].pitch, improvData[i].dur)
	};
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
	noiseSynth.triggerAttackRelease("8n", time, Math.random() / 4 + 0.2);
	if (percCnt%4 === 0) { osc.start(time).stop(time + 0.02) };
	percCnt += 1;
}, '8n');

// accompaniment
var polySynth = new Tone.PolySynth(5, Tone.AMSynth).toMaster();
polySynth.volume.value = Math.random() * 6 - 10;

var compingLoop = new Tone.Loop(function(time){
	var chord = harmChords[beatCnt % harmChords.length];
	var freqs = [];
	//console.log(chord);
	for (var i=0; i<chord.length; i++) {
		freqs.push(midi2Freq(60 + chord[i]));
	}
	polySynth.triggerAttackRelease(freqs, "8n");
	if (beatCnt%4 === 0) polySynth.triggerAttackRelease(midi2Freq(36 + chord[0]), "2n");
	beatCnt++;
}, '4n');

function midi2Freq(midiPitchNumber) {
	return Math.round(Tone.Frequency(midiPitchNumber, "midi").eval())
}

// shcedule the part repeatedly
Tone.Transport.bpm.value = 124;
Tone.Transport.timeSignature = [4, 4];
Tone.Transport.swingSubdivision = "8n";
Tone.Transport.swing = 0.5;
Tone.Transport.start("+1");
part.loop = true;
part.loopStart = 0;
part.loopEnd = playLength; //"8:0:0";

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
		setTimeout(function(){compingLoop.start()}, 1);
		firstTime = false;
	}
}, playLength);

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
var gauss = gaussian(-3, 3);

// make a bunch of standard variates
// for(i=0; i<2000; i++) {
//    console.log(standard());
// }
