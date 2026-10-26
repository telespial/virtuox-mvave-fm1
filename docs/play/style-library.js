import {makeArtistTracks} from './artist-tracks.js?v=0.6.0';
// SPDX-License-Identifier: GPL-3.0-only
// Musical event data in the original VirtuoX studies below is dedicated to CC0-1.0.
import {phrase} from './lesson-engine.js';
export const STYLES=['All','M Dean inspired','Jarre inspired','Moog fundamentals','Draik','Dok Dree','Mozart','Bach','Classical'];
export const SOUND_RECIPES=[
 {name:'Keep current sound'},
 {name:'Moog-style deep bass',analog:0,params:{mono:true,legato:true,glide:16,cutoff:650,resonance:4,sub:45,attack:2,decay:32,sustain:65,release:9},fx:{reverb:5,delay:0,chorus:0}},
 {name:'Expressive mono lead',analog:1,params:{mono:true,legato:true,glide:22,cutoff:2100,resonance:6,attack:6,release:28},fx:{reverb:22,delay:16,time:375,feedback:24}},
 {name:'Wide cinematic pad',analog:4,params:{mono:false,attack:44,sustain:85,release:62,cutoff:2800},fx:{reverb:40,chorus:35,delay:8}},
 {name:'Sequenced analog pluck',analog:3,params:{mono:false,attack:1,decay:22,sustain:18,release:8,cutoff:1600,envDepth:75},fx:{delay:23,time:375,feedback:28,reverb:15}},
 {name:'Warm classical synth',analog:2,params:{mono:false,attack:8,release:24,cutoff:3800},fx:{reverb:20,chorus:12,delay:0}},
 {name:'Nocturne velvet keys',analog:2,params:{mono:false,attack:5,decay:55,sustain:62,release:38,cutoff:1900,resonance:1,detune:9,sub:12,drive:3,envDepth:22},fx:{reverb:28,room:60,chorus:22,delay:9,time:420,feedback:22},lfo:{speed:13,depth:2,wave:4,sensitivity:2,target:0}},
 {name:'West Coast glide lead',analog:1,params:{mono:true,legato:true,glide:28,attack:2,decay:35,sustain:90,release:13,cutoff:4400,resonance:2,detune:5,sub:4,drive:9,envDepth:18},fx:{reverb:12,delay:14,time:310,feedback:18,chorus:0},lfo:{speed:28,depth:8,wave:4,sensitivity:3,target:0}},
 {name:'Bright chamber keys',analog:2,params:{mono:false,attack:2,decay:44,sustain:45,release:13,cutoff:6500,resonance:1,detune:2,sub:8,envDepth:30},fx:{reverb:12,chorus:0,delay:0}}

];
export const STYLE_RECIPES={'M Dean inspired':1,'Jarre inspired':4,'Moog fundamentals':2,'Draik':6,'Dok Dree':7,'Mozart':8,'Bach':5,'Classical':5};
export function makeStyleLessons(){const out=[];const add=(id,name,style,level,notes,durations,tip,recipe=1,extra={})=>{const events=phrase(notes,durations);out.push({id:'style-'+id,name,group:'Synth performance',subject:'Technique',style,level,events,tip,explanation:tip,task:'Listen, then play. Sound controls and bends are practice prompts; they are not graded.',formula:'Original VirtuoX study · CC0 · artist-inspired technique, not an artist transcription',bpm:style==='Jarre inspired'?92:70,beatsPerBar:4,bars:Math.ceil(Math.max(...events.map(e=>e.beat+e.duration))/4),soundRecipe:recipe,license:'CC0-1.0',composer:'VirtuoX original',...extra});};
add('moog-legato','Moog · mono legato and glide','Moog fundamentals',1,[60,62,63,67,65,63,62,60],[1,1,1,1,1,1,1,2],'Use the mono lead. Hold the first key until the next key is down to hear legato glide. Finger overlap is not measured by this lesson.',2);
add('moog-filter','Moog · filter-envelope bass articulation','Moog fundamentals',2,[36,36,43,36,39,39,46,39,41,41,48,41,43,43,50,43],Array(16).fill(.5),'Use ENV decay and sustain to separate plucked bass from held bass. Repeat the phrase at two filter settings.',1);
add('moog-wheel','Moog · vibrato after the attack','Moog fundamentals',1,[60,63,67,70],[2,2,2,4],'Start each note clean, then raise the modulation wheel during the held note. The wheel gesture is not graded.',2);
add('moog-bend','Moog · pitch-bend return to center','Moog fundamentals',2,[60,63,65,67,70,72],[2,2,2,2,2,4],'On the analog lead, bend a sustained note and return the wheel to center. Note targets are graded; bend curves are not.',2);
add('classical-pad','Classical synth · voice-leading study','Classical',2,[[60,64,67],[60,65,69],[59,62,67],[60,64,67]],[4,4,4,4],'Play a classical I–IV–V–I progression on a warm synth. Preserve the common tones and listen to each inner voice.',5,{subject:'Chords'});
add('bach-synth','Baroque-inspired · broken-chord synth study','Classical',3,[[60,64,67,72],[60,65,69,72],[59,62,67,71],[60,64,67,72]].flatMap(c=>[...c,...c.slice().reverse()]),Array(32).fill(.25),'This is an original broken-chord exercise, not a Bach transcription. Keep the pulse steady and let the harmony change the color.',4,{subject:'Songs'});
return [...makeArtistTracks(),...out];}
export function matchesStyle(lesson,style){return style==='All'||lesson.style===style||style==='Classical'&&['Mozart','Bach','Classical'].includes(lesson.style);}
