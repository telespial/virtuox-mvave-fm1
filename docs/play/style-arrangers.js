// SPDX-License-Identifier: GPL-3.0-only
// Original arrangement rules and musical data: CC0-1.0.
// Broad musical techniques, not edits or transcriptions of existing songs.
export const STYLE_IDENTITIES={
 'M Dean inspired':{name:'Cinematic voltage',detail:'Pedal bass, spacious lead answers, wide suspended harmony and a rising final section.',groove:'Half-time space / straight pickups'},
 'Jarre inspired':{name:'Clockwork panorama',detail:'Interlocking sequence cells, octave pulses, suspended harmony and measured filter-like accents.',groove:'Straight clock / rotating accents'},
 'Drayk':{name:'After-hours keys',detail:'Rootless seventh/ninth voicings, delayed entries, quiet bass and short answers separated by silence.',groove:'Laid-back half-time / sparse answers'},
 'Dr Dray':{name:'Boulevard pocket',detail:'Swung bass pickups, short offbeat keys, blues turns and high sustained lead answers.',groove:'Sixteenth swing / clipped funk'},
 'Moog fundamentals':{name:'One-voice laboratory',detail:'A single bass, lead or arpeggio line; no chord targets or accompanying second voice.',groove:'Mono articulation / rests / measured runs'}
};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const sequences={
 'M Dean inspired':[[0,.75,1.5,3.25],[0,1.75,2.5,3.75],[0,.5,2.75],[.25,1,2.5,3.5],[0,1.25,2,3.75]],
 'Jarre inspired':[[0,.25,.5,.75,1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,3.25,3.5,3.75],[0,.5,.75,1,1.5,1.75,2,2.5,2.75,3,3.5,3.75],[0,.25,.75,1,1.25,1.75,2,2.25,2.75,3,3.25,3.75],[0,.5,1,1.5,2,2.5,3,3.5],[0,.25,.5,1,1.25,1.5,2,2.25,2.5,3,3.25,3.5]],
 'Drayk':[[.125,1.875,3.25],[.375,2.125,3.625],[0,1.625,3.375],[.25,2.375],[.125,1.375,2.875,3.625]],
 'Dr Dray':[[0,.625,1.5,2,2.625,3.5,3.875],[.125,.875,1.625,2.125,2.875,3.625],[0,.375,1.5,2.375,3,3.625],[0,.625,1,1.875,2.5,3.375],[.125,.625,1.625,2.25,2.875,3.625]],
 'Moog fundamentals':[[0,.5,1.25,2,3],[0,.75,1.5,2.25,3.5],[0,.25,.75,1.5,2,2.5,3.25,3.75],[0,1,1.5,2.5,3.25],[.25,.75,1.75,2.5,3.5]]
};
function soundDesign(style,texture,index){
 const bass=texture==='bass',pad=texture==='pad',lead=texture==='lead';
 const variants=index%5;
 if(style==='M Dean inspired')return {params:{glide:lead?30:8,attack:pad?48:4,release:pad?65:lead?35:12,cutoff:pad?2300:lead?3300:850},fx:{cutoff:pad?6500:lead?9000:4200,drive:16+variants*2,reverb:pad?42:lead?29:9,chorus:pad?28:0,delay:lead?24:pad?12:0,time:465+variants*15,feedback:30}};
 if(style==='Jarre inspired')return {params:{attack:pad?35:1,decay:26,sustain:pad?80:25,release:pad?55:9,cutoff:1400+variants*450,envDepth:76},fx:{cutoff:7500+variants*650,drive:2,reverb:pad?35:17,chorus:pad?24:0,delay:pad?13:27,time:265+variants*20,feedback:31}};
 if(style==='Drayk')return {params:{attack:9,decay:60,sustain:52,release:47,cutoff:bass?560:1900,glide:bass?11:0},fx:{cutoff:bass?2200:4000+variants*260,drive:1,reverb:32,chorus:bass?0:28,delay:bass?0:12,time:430+variants*35,feedback:18}};
 if(style==='Dr Dray')return {params:{attack:2,decay:29,sustain:lead?90:40,release:lead?18:7,cutoff:bass?1100:lead?4300:5400,glide:lead?32:9},fx:{cutoff:bass?5200:11500,drive:7,reverb:lead?14:6,chorus:0,delay:lead?13:0,time:310,feedback:16}};
 return {params:{attack:1,decay:20+variants*5,sustain:lead?85:35,release:lead?15:5,cutoff:bass?550+variants*180:1800+variants*500,glide:lead?18+variants*4:3,envDepth:68},fx:{cutoff:bass?3600:10000,drive:5+variants*2,reverb:lead?10:3,chorus:0,delay:0}};
}
export function arrangeStyle({style,index,tonic,roots,themes,texture,soundRecipe,bars,meter,scale}){
 const identity=STYLE_IDENTITIES[style];if(!identity)return null;
 if(style==='Moog fundamentals'){
  // Former pad/chord studies become held-note timbre and articulation studies.
  texture=['pad','chords','stabs','call'].includes(texture)?'lead':texture;
  soundRecipe=texture==='bass'||texture==='arp'||texture==='pulse'?1:2;
 }
 const mono=style==='Moog fundamentals'||[1,2,7].includes(soundRecipe),events=[],variant=index%5;
 const pitch=(degree,register=0)=>{const d=degree-1;return tonic+register+Math.floor(d/7)*12+scale[((d%7)+7)%7];};
 const add=(beat,notes,duration,hand='R',velocity=85)=>{if(beat>=bars*meter||duration<=0)return;events.push({beat,notes:[...new Set(notes.map(n=>clamp(n,0,127)))],duration:Math.min(duration,bars*meter-beat),hand,velocity:clamp(Math.round(velocity),38,116)});};
 const pad=texture==='pad',keys=['chords','stabs','call'].includes(texture),bass=texture==='bass',seq=['arp','pulse'].includes(texture);
 for(let bar=0;bar<bars;bar++){
  const section=Math.floor(bar/4),local=bar%4,base=bar*meter,theme=themes[section%2],response=local>=2;
  // Each identity has its own harmonic rhythm, rather than one four-chord loop.
  let rootIndex=style==='Drayk'?Math.floor(bar/2):style==='M Dean inspired'?Math.floor(bar/2)+(local===3?1:0):bar;
  rootIndex+=section===1?1:section===2?2:section===3?3:0;
  const root=roots[rootIndex%roots.length],sectionLift=section===1?5:section===2?-7:section===3?10:0;
  const pick=(i,relative=false)=>{let degree=theme[(i+variant+(response?2:0))%theme.length];if(!degree)degree=theme.find(n=>n)||1;return relative?root+((degree-1)%7):degree;};
  const chord=offsets=>offsets.map(d=>pitch(root+d,12));
  if(style==='Drayk'&&(pad||keys)){
   // Alternating quiet extended voicings and a small answer, with genuine rests.
   const voicing=chord(index%2?[2,4,6,8]:[0,4,6,9]);
   if(local!==3||section===3){add(base+.125+(variant%3)*.125,voicing,pad?3.2:1.45,'R',58+sectionLift);if(local%2===1)add(base+2.625,[pitch(pick(bar+1),24)],.65,'R',67+sectionLift);}
   else add(base+2.375,[pitch(pick(bar),24)],1.1,'R',62);
   continue;
  }
  if(style==='M Dean inspired'&&(pad||keys)){
   const voicing=chord(local%2?[0,4,8,10]:[0,4,7,9]);
   add(base+(local%2?.5:0),voicing,local%2?2.8:3.65,'R',70+sectionLift);
   if(texture==='call'&&local%2)add(base+3.5,[pitch(pick(bar),24)],.45,'R',92+sectionLift);
   continue;
  }
  if(style==='Jarre inspired'&&(pad||keys)){
   add(base,chord(local%2?[0,3,4,8]:[0,4,7,8]),pad?3.8:1.65,'R',74+sectionLift);
   if(!pad)add(base+2.5,chord([2,4,7]),1.2,'R',69+sectionLift);
   continue;
  }
  if(style==='Dr Dray'&&(pad||keys)){
   const positions=local%2?[.625,2.125,3.625]:[.125,1.625,2.875];
   const voicing=chord(index%2?[0,2,4,6]:[2,4,6,7]);
   positions.forEach((at,i)=>add(base+at,voicing,.21+(i%2)*.08,'R',82+sectionLift-i*6));
   if(texture==='call')add(base+3.875,[pitch(pick(bar),24)],.1,'R',97);
   continue;
  }
  let positions=sequences[style][variant];
  if(style==='M Dean inspired'&&texture==='lead')positions=local%2?[.5,1,2.75,3.5,3.75]:[0,1.5,3.25];
  if(style==='Jarre inspired'&&!seq&&!bass)positions=[0,.75,1.5,2.75,3.5];
  if(style==='Drayk'&&texture==='lead'&&local===3)positions=[2.375,3.125];
  if(style==='Moog fundamentals'&&seq)positions=Array.from({length:8+(index%2)*8},(_,j)=>j*(index%2?.25:.5));
  // Bridge strips density; the final phrase adds a small run before resolving.
  if(section===2)positions=positions.filter((_,j)=>j%2===0);
  if(local===3&&section!==2&&index>=10)positions=[...new Set([...positions,3.5,3.75])].sort((a,b)=>a-b);
  for(let j=0;j<positions.length;j++){
   const at=positions[j],next=positions[j+1]??4,gap=next-at;
   let degree=pick(j+(response?bar:0),bass||seq),register=bass?0:seq?12:24;
   if(style==='Jarre inspired'&&seq){const cell=[root,root+4,root+7,root+2,root+4,root+9,root+7,root+4];degree=cell[(j+variant+(response?section+1:0))%cell.length]+(local===3&&j%4===3?1:0);if(texture==='pulse')degree=root+(j%2?7:0);}
   if(style==='Dr Dray'){
    // Blues approaches belong to this vocabulary, not the cinematic/R&B modes.
    if(bass)degree=root+[0,0,4,7,2,4,6,7][(j+bar+variant)%8];
    if(!bass&&j===positions.length-2){add(base+at,[pitch(degree,register)-1],Math.min(.17,gap*.8),'R',76+sectionLift);continue;}
   }
   if(style==='M Dean inspired'&&bass&&j===0)degree=root;
   if(style==='Moog fundamentals'&&seq)degree=root+[0,4,7,2,4,9,7,4][(j+variant+local)%8];
   const final=bar===bars-1&&j===positions.length-1;
   if(final)degree=style==='Dr Dray'&&!bass?8:root;
   const gate=style==='Jarre inspired'?.52:style==='Dr Dray'?(bass?.53:.83):style==='Drayk'?.55:style==='Moog fundamentals'?(seq?.58:bass?.68:.97):bass?.82:.97;
   const velocity=style==='Drayk'?58+(j%3)*6+sectionLift:style==='Jarre inspired'?72+((j+variant)%4===0?22:0)+sectionLift:style==='Dr Dray'?85+(j%3===0?12:-7)+sectionLift:82+(j===0?10:-(j%3)*5)+sectionLift;
   add(base+at,[pitch(degree,register)],Math.max(.07,gap*(final?.96:gate)),bass?'L':'R',velocity);
  }
 }
 events.sort((a,b)=>a.beat-b.beat);
 return {events,texture,soundRecipe,monophonic:mono,arrangementIdentity:identity.name,groove:identity.groove,identityDetail:identity.detail,soundDesign:soundDesign(style,texture,index),arrangementRevision:2};
}
