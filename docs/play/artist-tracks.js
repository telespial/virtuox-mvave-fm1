import {arrangeStyle} from './style-arrangers.js?v=0.11.0';
import {EXTRA_PLANS} from './expanded-track-plans.js?v=0.9.0';
// SPDX-License-Identifier: GPL-3.0-only
// Original musical plans/event data: CC0-1.0. No artist melodies or song transcriptions.
// Each plan specifies its own harmony, two motifs, rhythm, timbre and performance objective.
export const ARTIST_STYLES=['M Dean inspired','Jarre inspired','Drayk','Dr Dray'];
export const TRACK_STYLES=[...ARTIST_STYLES,'Moog fundamentals','Bach','Mozart','Classical'];
const PLANS={
'M Dean inspired':[
['dean-roots','Night Engine',41,'1 6 3 7','1 1 8 5 3 1 5 8/1 5 8 10 8 5 3 1','sync','bass',1,72,'root and octave movement'],
['dean-sync','Voltage After Dark',42,'1 4 6 5','1 0 5 3 8 5 0 7/8 5 3 1 0 3 5 7','lift','bass',1,78,'sixteenth-note bass pickups'],
['dean-lead','Skyline Wire',41,'1 6 4 5','8 10 11 12 10 8 7 5/12 11 10 8 10 7 5 8','space','lead',2,70,'pentatonic lead phrasing'],
['dean-pads','Glass Cathedral',45,'1 6 3 4','1 3 5 7/3 5 7 9','slow','pad',3,62,'wide minor-nine voicings'],
['dean-climax','Neon Ascent',43,'1 3 6 7','8 10 12 15 12 11 10 8/15 12 11 10 12 10 8 7','sync','lead',2,86,'register and dynamic builds'],
['dean-outro','Last Light on the Console',41,'1 7 6 4','8 12 15 12 11 10 8 0/10 8 7 5 8 0 3 1','space','lead',2,68,'spacious synth endings'],
['dean-low-current','Low Current',36,'1 5 6 3','1 1 5 0 8 5 3 0/1 3 5 8 5 0 7 1','steady','bass',1,76,'bass note length and restraint'],
['dean-amber','Amber Circuit',44,'1 4 7 3','8 9 10 12 11 10 8 7/12 10 11 8 9 7 5 8','lift','lead',2,82,'minor-scale turns'],
['dean-fifth-window','Fifth Window',40,'1 3 5 6','1 5 8 5 3 5 7 8/8 5 3 1 5 7 8 10','sync','arp',4,88,'broken harmony and articulation'],
['dean-cloud-bank','Cloud Bank',46,'1 6 2 5','1 3 7 9/3 5 8 10','slow','chords',6,64,'close inner-voice movement'],
['dean-black-horizon','Black Horizon',38,'1 2 6 5','1 0 8 5 1 3 0 5/8 0 5 3 1 5 7 0','space','bass',1,74,'rests as arrangement space'],
['dean-pressure-rise','Pressure Rise',43,'1 4 6 7','8 10 12 11 10 12 15 12/11 10 8 7 8 10 11 15','sixteenth','lead',2,92,'fast lead cells without rushing'],
['dean-still-towers','Still Towers',41,'1 3 6 2','1 3 5 9/2 4 7 10','slow','pad',3,58,'sustained extended harmony'],
['dean-sidechain-moon','Sidechain Moon',45,'1 7 4 6','1 5 0 8 1 3 5 0/8 7 5 0 3 1 0 5','lift','bass',1,84,'offbeat bass placement'],
['dean-inner-lights','Inner Lights',40,'1 6 4 2','8 10 12 0 11 8 7 0/10 12 15 12 10 8 5 0','space','call',6,72,'chord and melody conversations'],
['dean-satellite-bloom','Satellite Bloom',47,'1 4 3 6','8 11 12 15 12 10 11 8/15 14 12 11 10 12 8 7','steady','lead',2,90,'melodic sequence development'],
['dean-metal-rain','Metal Rain',39,'1 2 4 7','1 3 5 8 5 3 7 10/3 5 8 12 8 7 5 1','sixteenth','arp',4,96,'bright repeating synth figures'],
['dean-fade-memory','Fade Memory',44,'1 6 5 4','1 3 5 7/1 4 6 9','slow','pad',3,60,'controlled releases across changes'],
['dean-night-crossing','Night Crossing',42,'1 5 4 7','8 7 5 8 10 11 12 10/12 11 8 10 7 5 3 8','sync','call',6,80,'two-hand arrangement balance'],
['dean-terminal-sun','Terminal Sun',41,'1 3 4 5','8 10 12 15 14 12 11 10/15 12 10 8 7 5 3 1','lift','lead',2,94,'a complete lead build and resolution']
],
'Jarre inspired':[
['jarre-pulse','Ion Harbor',36,'1 6 3 7','1 8 1 5 1 8 3 5/1 8 5 8 3 8 5 1','steady','pulse',4,92,'even octave pulses'],
['jarre-arp','Crystal Transit',45,'1 4 6 5','1 3 5 8 5 3 1 5/3 5 8 10 8 5 3 1','sixteenth','arp',4,100,'sequenced arpeggio precision'],
['jarre-space','Blue Atmosphere',40,'1 7 6 4','1 4 5 8/3 5 7 10','slow','pad',3,64,'suspended ambient voicings'],
['jarre-sequence','Orbital Clock',42,'1 3 6 7','1 5 8 5 3 5 7 5/5 8 10 8 4 7 9 7','sixteenth','arp',4,106,'four-cell sequence memory'],
['jarre-red-axis','Red Axis',38,'1 5 4 6','1 8 5 8 1 3 5 8/3 10 5 12 1 8 5 1','sync','pulse',4,96,'pulses across harmonic changes'],
['jarre-magnetic-garden','Magnetic Garden',43,'1 6 2 5','1 3 8 5 3 7 10 5/5 8 12 10 7 5 3 1','steady','arp',4,88,'interlocking broken chords'],
['jarre-polar-light','Polar Light',41,'1 4 7 3','8 10 11 8 7 5 8 0/12 11 10 8 10 7 5 8','space','lead',2,78,'a melody above an implied pulse'],
['jarre-glass-steps','Glass Steps',46,'1 2 6 7','1 5 3 8 5 10 7 12/3 8 5 10 7 12 8 5','sixteenth','arp',4,110,'ascending sequence cells'],
['jarre-zero-meridian','Zero Meridian',37,'1 3 4 7','1 0 8 1 5 0 8 5/8 5 0 3 1 5 8 0','lift','bass',1,98,'bass rests against a steady clock'],
['jarre-velvet-orbit','Velvet Orbit',44,'1 6 4 2','1 3 7 9/2 5 7 10','slow','pad',3,68,'slow evolving harmony'],
['jarre-clockwork-sea','Clockwork Sea',40,'1 7 3 5','1 5 8 3 5 10 8 5/3 7 10 5 8 12 10 7','sixteenth','arp',4,114,'repeated notes with clean release'],
['jarre-distant-beacon','Distant Beacon',45,'1 4 2 5','8 0 12 11 10 8 7 0/10 0 15 12 11 10 8 0','space','lead',2,82,'space and delay-aware phrasing'],
['jarre-binary-tide','Binary Tide',39,'1 6 7 4','1 8 5 8 3 10 5 8/1 12 5 10 3 8 7 5','sync','pulse',4,104,'octave displacement'],
['jarre-neon-grid','Neon Grid',42,'1 2 4 5','1 3 5 7 8 10 8 5/3 5 7 9 10 12 10 7','sixteenth','arp',4,118,'long ascending broken figures'],
['jarre-silver-arc','Silver Arc',47,'1 3 6 2','1 4 7 9/3 6 8 11','slow','chords',5,72,'bright upper extensions'],
['jarre-aerostat','Aerostat',41,'1 7 4 5','8 11 10 8 12 11 7 5/12 15 14 12 11 10 8 7','steady','lead',2,90,'melodic contour over four chords'],
['jarre-lunar-stairs','Lunar Stairs',36,'1 4 6 3','1 8 3 10 5 12 7 14/8 5 10 7 12 8 5 3','sixteenth','arp',4,122,'register shifts within sequences'],
['jarre-vapor-city','Vapor City',43,'1 5 6 4','1 3 5 9/1 4 6 10','slow','pad',3,66,'pad transitions without smearing'],
['jarre-solar-relay','Solar Relay',38,'1 6 5 7','1 5 8 10 8 5 3 7/3 7 10 12 10 8 5 1','lift','arp',4,112,'changing subdivisions'],
['jarre-event-horizon','Event Horizon',45,'1 3 4 7','1 3 5 8 10 12 8 5/5 8 10 12 15 12 10 8','sixteenth','arp',4,124,'a developed sequence finale']
],
'Drayk':[
['draik-keys','Velvet Avenue',45,'1 6 3 7','1 3 5 7/2 4 6 9','slow','chords',6,66,'soft minor-seven voicings'],
['draik-space','Rain on the Window',45,'1 4 6 5','8 10 0 12 10 8 0 7/10 12 0 15 12 10 8 0','space','lead',6,68,'phrases separated by silence'],
['draik-sub','Low Signal',33,'1 3 4 2','1 0 1 5 3 0 3 8/1 5 0 8 5 3 0 1','sync','bass',1,72,'understated sub-bass movement'],
['draik-color','Ninth Floor',45,'1 6 4 7','1 3 7 9/2 5 7 10','slow','chords',6,64,'soft ninth-chord top notes'],
['draik-pad','Room in the Clouds',40,'1 7 6 3','1 3 5 8/2 4 7 9','slow','pad',3,70,'ambient chord answers'],
['draik-progression','Midnight Sketch',45,'1 6 7 5','8 12 10 8/10 14 12 9','space','call',6,74,'keys and top-line interplay'],
['draik-blue-hour','Blue Hour Letters',43,'1 4 7 6','8 0 10 11 10 0 8 7/12 0 11 10 8 0 7 5','space','lead',6,65,'restrained melodic answers'],
['draik-soft-focus','Soft Focus',46,'1 3 6 4','1 3 5 7/3 5 7 9','slow','pad',3,62,'gentle harmony without hard attacks'],
['draik-cold-coffee','Cold Coffee',38,'1 6 2 5','1 5 0 8 1 0 3 5/8 5 3 0 1 7 0 5','lift','bass',1,76,'pickup notes before chord changes'],
['draik-side-street','Side Street Glow',44,'1 2 6 7','8 10 0 12 11 8/10 12 0 14 12 10','sync','call',6,78,'chord stabs with a sparse answer'],
['draik-mist-glass','Mist on Glass',41,'1 7 3 4','1 3 7 10/2 4 8 11','slow','chords',6,60,'upper-voice suspension'],
['draik-distance','Distance in Stereo',47,'1 5 6 4','8 0 12 10 8 7 0 5/12 0 15 14 12 10 0 8','space','lead',6,72,'long releases and deliberate rests'],
['draik-empty-platform','Empty Platform',36,'1 4 6 3','1 1 0 5 8 0 5 3/1 0 3 5 0 8 7 5','sync','bass',1,80,'bass consistency under syncopation'],
['draik-city-drift','City Drift',45,'1 6 5 2','1 3 5 9/2 5 8 10','slow','pad',3,67,'common tones through four changes'],
['draik-second-message','Second Message',42,'1 3 4 5','8 11 10 0 12 10 8 0/10 12 14 0 12 9 7 0','lift','call',6,82,'two-hand phrase placement'],
['draik-slow-elevator','Slow Elevator',40,'1 2 4 7','1 3 6 9/3 5 7 10','slow','chords',6,63,'extended harmony and soft dynamics'],
['draik-streetlamp','Streetlamp Echo',44,'1 7 4 5','8 10 12 0 11 10 8 7/12 14 15 0 12 10 9 8','space','lead',6,75,'top-line development'],
['draik-last-train','Last Train Bass',35,'1 6 7 3','1 0 5 8 5 1 0 3/3 5 0 8 7 5 1 0','lift','bass',1,84,'a bass line with a clear turnaround'],
['draik-dawn-room','Dawn Room',43,'1 5 4 6','1 4 7 9/3 6 8 10','slow','pad',3,69,'a gradual harmonic opening'],
['draik-afterimage','Afterimage Suite',45,'1 6 3 5','8 12 15 12 10 8/10 14 12 11 9 8','space','call',6,86,'a complete keys-and-melody arrangement']
],
'Dr Dray':[
['dok-bass','Boulevard Bounce',40,'1 3 4 5','1 1 5 8 3 3 5 8/1 5 8 10 8 5 3 1','sync','bass',1,88,'rounded funk bass articulation'],
['dok-lead','Chrome Glide',40,'1 6 4 7','8 10 11 12 15 12 11 10/12 15 14 12 10 8 7 8','space','lead',7,90,'connected high-register slides'],
['dok-stabs','Palm Shadow',40,'1 4 7 3','1 3 5 7/2 4 6 8','sync','stabs',8,92,'short complete chord stabs'],
['dok-pickups','Corner Pickup',40,'1 2 6 5','8 0 10 11 12 0 14 15/12 11 10 8 7 0 5 8','lift','lead',7,88,'sixteenth-note lead pickups'],
['dok-changes','Minor Chrome',40,'1 3 4 2','1 3 5 8/3 5 7 10','slow','chords',5,94,'bass roots beneath upper voicings'],
['dok-outro','Sunset Turnaround',40,'1 6 7 5','12 15 16 15 12 11 10 8/10 8 7 8 10 11 10 8','sync','lead',7,96,'a lead phrase with a strong ending'],
['dok-lowrider-clock','Lowrider Clock',36,'1 5 4 6','1 0 5 8 1 3 0 5/8 5 0 3 1 7 5 0','swing','bass',1,90,'triplet swing in a bass groove'],
['dok-high-wire','High Wire Signal',43,'1 4 6 7','8 11 12 10 8 7 5 8/15 14 12 11 10 12 8 7','steady','lead',7,98,'high lead articulation'],
['dok-block-party','Block Party Keys',45,'1 6 3 7','1 3 5 8/2 4 7 9','lift','stabs',8,100,'offbeat voicing changes'],
['dok-rubber-road','Rubber Road',38,'1 7 6 4','1 5 8 0 3 5 0 8/1 3 0 5 8 7 5 1','sync','bass',1,94,'elastic root-and-fifth movement'],
['dok-west-window','West Window',42,'1 3 5 6','8 10 12 11 10 8/12 14 15 12 10 9','space','call',5,92,'a keyboard answer over low roots'],
['dok-tinted-glass','Tinted Glass Lead',44,'1 6 2 5','8 0 11 12 15 12 0 10/12 0 15 14 12 11 8 0','lift','lead',7,102,'rest placement before slides'],
['dok-double-lane','Double Lane',35,'1 4 2 7','1 1 0 5 8 5 3 0/1 0 8 10 8 5 0 3','swing','bass',1,96,'bass pickups through a turnaround'],
['dok-satin-stabs','Satin Stabs',41,'1 7 3 6','1 3 6 8/2 5 7 9','sync','stabs',8,104,'dry, precise chord release'],
['dok-radio-halo','Radio Halo',40,'1 5 6 3','8 10 11 15 12 10 8 7/12 14 15 17 15 12 11 8','space','lead',7,98,'long-note wheel vibrato prompts'],
['dok-curbside','Curbside Conversation',43,'1 2 4 5','8 12 10 8/10 14 12 9','lift','call',5,106,'two-hand call and response'],
['dok-night-cruise','Night Cruise Bass',37,'1 6 5 4','1 0 5 3 8 0 7 5/1 3 5 0 8 5 0 1','swing','bass',1,100,'swing with consistent note lengths'],
['dok-golden-intersection','Golden Intersection',46,'1 4 3 7','1 3 5 9/3 5 8 10','sync','chords',8,108,'upper chord color with tight timing'],
['dok-antenna','Antenna Solo',42,'1 7 4 6','8 10 12 15 12 11 10 8/15 17 15 14 12 10 9 8','sixteenth','lead',7,110,'a developed fast lead solo'],
['dok-freeway-dawn','Freeway at Dawn',40,'1 3 6 5','8 12 15 12 10 8/12 15 14 11 9 8','space','call',5,104,'a full funk keyboard finale']
]};
for(const [style,plans] of Object.entries(EXTRA_PLANS))PLANS[style]=[...(PLANS[style]||[]),...plans];
const RHYTHMS={steady:Array(8).fill(.5),sync:[.75,.25,.5,.5,.75,.25,.5,.5],space:[1,.5,.5,1,.5,.5],lift:[.25,.25,.5,.5,.5,.25,.25,.5,1],slow:[1,1,2],sixteenth:Array(16).fill(.25),swing:Array.from({length:8},(_,i)=>i%2?1/3:2/3)};
const SCALES={minor:[0,2,3,5,7,8,10],dorian:[0,2,3,5,7,9,10],major:[0,2,4,5,7,9,11],harmonic:[0,2,3,5,7,8,11]};
function pitch(degree,tonic,scale){const d=degree-1,oct=Math.floor(d/7);return tonic+12*oct+scale[((d%7)+7)%7];}
export function makeArtistTracks(){
 const result=[];
 for(const style of TRACK_STYLES)PLANS[style].forEach(([id,title,tonic,harmony,motifs,rhythm,texture,soundRecipe,bpm,focus,options={}],index)=>{
  const roots=harmony.split(' ').map(Number),themes=motifs.split('/').map(m=>m.split(' ').map(Number)),bars=index<8?8:index<16?12:16,meter=options.meter||4,events=[];
  const mode=options.mode||(style==='Dr Dray'?'dorian':['Bach','Mozart','Classical'].includes(style)?'major':'minor'),scale=SCALES[mode];
  const add=(beat,notes,duration,hand='R',velocity=86)=>{if(notes.length&&duration>0&&beat<bars*meter)events.push({beat,notes,duration:Math.min(duration,bars*meter-beat),hand,velocity});};
  for(let bar=0;bar<bars;bar++){
   const section=Math.floor(bar/4),root=roots[(bar+(section===1?1:section===2?3:0))%4],theme=themes[section%2],base=bar*meter,accent=section===1?7:section===3?-5:0;
   const chord=([0,2,4,6,...(index%3===0?[8]:[])]).map(d=>pitch(root+d,tonic+12,scale));
   if(texture==='pad'||texture==='chords'){add(base,chord,texture==='pad'?meter-.05:meter-.6,'R',76+accent);continue;}
   if(texture==='stabs'){const positions=bar%2?[.5,2.5,3.5]:[0,1.5,3];positions.filter(b=>b<meter).forEach((b,i)=>add(base+b,chord.slice(0,4),Math.min(.35+(i%2)*.15,meter-b),'R',84+accent-i*3));continue;}
   if(texture==='call'){add(base,[pitch(root,tonic,scale),pitch(root+4,tonic,scale)],1.8,'L',72+accent);for(let j=0;j<4;j++){const d=theme[(j+bar)%theme.length];if(d)add(base+2+j*.5,[pitch(d,tonic+24,scale)],.46,'R',86+accent-j*2);}continue;}
   if(texture==='alberti')for(let j=0;j<8;j++)add(base+j*.5,[pitch(root+[0,4,2,4][j%4],tonic,scale)],.43,'L',64+accent);
   if(texture==='counterpoint')for(let j=0;j<meter;j++)add(base+j,[pitch(root+[0,4,2,5][(j+bar)%4],tonic,scale)],.86,'L',68+accent);
   if(texture==='pedal')add(base,[tonic],meter-.08,'L',64+accent);
   if(texture==='waltz'){add(base,[pitch(root,tonic,scale)],.85,'L',72+accent);for(let j=1;j<meter;j++)add(base+j,[pitch(root+2,tonic,scale),pitch(root+4,tonic,scale)],.7,'L',62+accent);}
   let at=0;const durations=RHYTHMS[rhythm];
   for(let j=0;j<durations.length&&at<meter;j++){
    const length=Math.min(durations[j],meter-at),d=theme[(j+(bar%4===3?2:0))%theme.length];
    if(d){const register=texture==='bass'?0:['pulse','arp','melody','alberti','counterpoint','pedal','waltz'].includes(texture)?12:24;
     const degree=['bass','pulse','arp','pedal'].includes(texture)?root+d-1:d;
     add(base+at,[pitch(degree,tonic+register,scale)],length*(texture==='bass'?.72:texture==='lead'?.98:.84),texture==='bass'?'L':'R',Math.max(55,Math.min(110,86+accent+(j===0?7:0)-(j%3)*3)));
    }at+=length;
   }
  }
  const arranged=arrangeStyle({style,index,tonic,roots,themes,texture,soundRecipe,bars,meter,scale});
  events.sort((a,b)=>a.beat-b.beat);
  const label=style==='M Dean inspired'?'M Dean':style==='Jarre inspired'?'Jarre':style==='Moog fundamentals'?'Moog':style==='Bach'?'Baroque study':style==='Mozart'?'Chamber study':style;
  result.push({id:'style-'+id,name:label+' · '+title,style,group:'Style tracks',subject:'Songs',level:Math.floor(index/5)+1,events,bars,bpm,beatsPerBar:meter,soundRecipe,...(arranged||{}),trackNumber:index+1,trackCount:PLANS[style].length,texture:arranged?.texture||texture,mode,
   sections:Array.from({length:bars/4},(_,i)=>({name:['Theme A','Theme B','Bridge','Coda'][i],firstBar:i*4+1,lastBar:i*4+4})),
   tip:(arranged?arranged.arrangementIdentity+' · '+arranged.groove+'. ':'')+'Original '+bars+'-bar track: '+(style==='Moog fundamentals'?'single-note '+(arranged?.texture||texture)+' articulation and phrase development':focus)+'. Learn one four-bar section at a time, then connect the arrangement.',
   explanation:(arranged?arranged.identityDetail+' ':'')+'Practice '+(style==='Moog fundamentals'?'monophonic phrasing':focus)+' through changing harmony and an answering phrase. This is an original VirtuoX composition inspired by broad musical techniques, not a transcription of an artist or composer work.',
   task:'Use the bar-loop controls for each section. Sound-control gestures are practice prompts, not graded.',
   formula:'Original VirtuoX track · CC0 · '+meter+'/4 · '+(bars===8?'A / B':bars===12?'A / B / bridge':'A / B / bridge / coda'),license:'CC0-1.0',composer:'VirtuoX original'});
 });return result;
}
