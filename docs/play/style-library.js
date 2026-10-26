import {makeArtistTracks} from './artist-tracks.js?v=0.11.0';
// SPDX-License-Identifier: GPL-3.0-only
// Musical event data in the original VirtuoX studies below is dedicated to CC0-1.0.
export const STYLES=['All','M Dean inspired','Jarre inspired','Moog fundamentals','Drayk','Dr Dray','Mozart','Bach','Classical'];
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
export const STYLE_RECIPES={'M Dean inspired':1,'Jarre inspired':4,'Moog fundamentals':2,'Drayk':6,'Dr Dray':7,'Mozart':8,'Bach':5,'Classical':5};
export function makeStyleLessons(){return makeArtistTracks();}
export function matchesStyle(lesson,style){return style==='All'||lesson.style===style||style==='Classical'&&['Mozart','Bach','Classical'].includes(lesson.style);}

export function normalizeStyle(style){return ({'Draik':'Drayk','Dok Dree':'Dr Dray'})[style]||style;}
