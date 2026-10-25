// SPDX-License-Identifier: GPL-3.0-only
// Musical event data in the original VirtuoX studies below is dedicated to CC0-1.0.
import {phrase} from './lesson-engine.js';
export const STYLES=['All','M Dean inspired','Jarre inspired','Moog fundamentals','Mozart','Bach','Classical'];
export const SOUND_RECIPES=[
 {name:'Keep current sound'},
 {name:'Moog-style deep bass',analog:0,params:{mono:true,legato:true,glide:16,cutoff:650,resonance:4,sub:45,attack:2,decay:32,sustain:65,release:9},fx:{reverb:5,delay:0,chorus:0}},
 {name:'Expressive mono lead',analog:1,params:{mono:true,legato:true,glide:22,cutoff:2100,resonance:6,attack:6,release:28},fx:{reverb:22,delay:16,time:375,feedback:24}},
 {name:'Wide cinematic pad',analog:4,params:{mono:false,attack:44,sustain:85,release:62,cutoff:2800},fx:{reverb:40,chorus:35,delay:8}},
 {name:'Sequenced analog pluck',analog:3,params:{mono:false,attack:1,decay:22,sustain:18,release:8,cutoff:1600,envDepth:75},fx:{delay:23,time:375,feedback:28,reverb:15}},
 {name:'Warm classical synth',analog:2,params:{mono:false,attack:8,release:24,cutoff:3800},fx:{reverb:20,chorus:12,delay:0}}
];
export function makeStyleLessons(){const out=[];const add=(id,name,style,level,notes,durations,tip,recipe=1,extra={})=>{const events=phrase(notes,durations);out.push({id:'style-'+id,name,group:'Synth performance',subject:'Technique',style,level,events,tip,explanation:tip,task:'Listen, then play. Sound controls and bends are practice prompts; they are not graded.',formula:'Original VirtuoX study · CC0 · artist-inspired technique, not an artist transcription',bpm:style==='Jarre inspired'?92:70,beatsPerBar:4,bars:Math.ceil(Math.max(...events.map(e=>e.beat+e.duration))/4),soundRecipe:recipe,license:'CC0-1.0',composer:'VirtuoX original',...extra});};
add('dean-roots','M Dean · deep root/octave bass','M Dean inspired',1,[41,41,53,41,44,44,56,44,46,46,58,46,48,48,60,48],Array(16).fill(.5),'Keep the bass round and short. Play roots and octaves, then adjust cutoff with knob 1. This is an original study.',1);
add('dean-sync','M Dean · syncopated minor bass','M Dean inspired',2,[41,null,48,51,53,48,44,null,46,48,51,48],[.75,.25,.5,.5,.5,.5,.75,.25,.5,.5,.5,.5],'Count sixteenth subdivisions through the rests. Make the offbeat notes deliberate.',1);
add('dean-lead','M Dean · singing pentatonic lead','M Dean inspired',2,[65,68,70,72,75,72,70,68,65,63,65],[.5,.5,1,.5,.5,1,.5,.5,1,1,2],'Use overlapping fingers for legato and gentle glide. Add modulation near the end of held notes.',2);
add('dean-pads','M Dean · cinematic minor-nine voicings','M Dean inspired',3,[[53,60,63,67,72],[49,56,60,63,67],[51,58,61,65,70],[48,55,58,62,67]],[4,4,4,4],'Hold the full voicing together, then move to the next chord with the smallest comfortable motion. Use an external MIDI keyboard.',3,{subject:'Chords'});
add('dean-climax','M Dean · octave lead build','M Dean inspired',4,[[65,77],[68,80],[70,82],[72,84],[75,87],[72,84],[70,82],[65,77]],[1,1,.5,.5,2,1,1,2],'Build intensity through register and velocity, without rushing. This original study practices a performance technique.',2);
add('dean-outro','M Dean · slow synth outro','M Dean inspired',4,[65,72,75,77,75,72,70,68,65,63,60,65],[1,.5,.5,2,.5,.5,1,1,1,1,1,2],'Leave space between phrases. Shape the last sustained note with the wheel and filter rather than adding more notes.',2);
add('jarre-pulse','Jarre · octave pulse engine','Jarre inspired',1,[48,60,48,60,51,63,51,63,53,65,53,65,55,67,55,67],Array(16).fill(.5),'Make the octave pulse even. Keep the filter low, then open it slowly over a repeated phrase.',4);
add('jarre-arp','Jarre · minor arpeggio motion','Jarre inspired',3,Array.from({length:4},()=>[60,63,67,72,67,63,60,67]).flat(),Array(32).fill(.25),'Keep the sixteen-note pulse even. The delay adds movement; do not chase its echoes.',4,{subject:'Chords'});
add('jarre-space','Jarre · spacious suspended harmony','Jarre inspired',2,[[60,65,67],[58,63,65],[56,61,63],[55,60,62]],[4,4,4,4],'Play slow suspended chords on a wide pad. Listen to the release before moving to the next harmony.',3,{subject:'Chords'});
add('jarre-sequence','Jarre · sequence and melody control','Jarre inspired',4,[60,67,72,67,63,67,70,67,65,72,77,72,62,69,74,69],Array(16).fill(.25),'Learn one cell at a time, then connect all four. This original pattern is not a Jarre composition.',4);
add('moog-legato','Moog · mono legato and glide','Moog fundamentals',1,[60,62,63,67,65,63,62,60],[1,1,1,1,1,1,1,2],'Use the mono lead. Hold the first key until the next key is down to hear legato glide. Finger overlap is not measured by this lesson.',2);
add('moog-filter','Moog · filter-envelope bass articulation','Moog fundamentals',2,[36,36,43,36,39,39,46,39,41,41,48,41,43,43,50,43],Array(16).fill(.5),'Use ENV decay and sustain to separate plucked bass from held bass. Repeat the phrase at two filter settings.',1);
add('moog-wheel','Moog · vibrato after the attack','Moog fundamentals',1,[60,63,67,70],[2,2,2,4],'Start each note clean, then raise the modulation wheel during the held note. The wheel gesture is not graded.',2);
add('moog-bend','Moog · pitch-bend return to center','Moog fundamentals',2,[60,63,65,67,70,72],[2,2,2,2,2,4],'On the analog lead, bend a sustained note and return the wheel to center. Note targets are graded; bend curves are not.',2);
add('classical-pad','Classical synth · voice-leading study','Classical',2,[[60,64,67],[60,65,69],[59,62,67],[60,64,67]],[4,4,4,4],'Play a classical I–IV–V–I progression on a warm synth. Preserve the common tones and listen to each inner voice.',5,{subject:'Chords'});
add('bach-synth','Bach-inspired · broken-chord synth study','Bach',3,[[60,64,67,72],[60,65,69,72],[59,62,67,71],[60,64,67,72]].flatMap(c=>[...c,...c.slice().reverse()]),Array(32).fill(.25),'This is an original broken-chord exercise, not a Bach transcription. Keep the pulse steady and let the harmony change the color.',4,{subject:'Songs'});
return out;}
export function matchesStyle(lesson,style){return style==='All'||lesson.style===style||style==='Classical'&&['Mozart','Bach','Classical'].includes(lesson.style);}
