// SPDX-License-Identifier: GPL-3.0-only
// Pure lesson scheduling and assessment. Times in beats in the catalog, ms in sessions.
export const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
export const noteName=n=>['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'][((n%12)+12)%12]+(Math.floor(n/12)-1);
export const DIFFICULTIES=[
 {name:'Explore',wait:true,tolerance:350,lengthTolerance:.75,velocityTolerance:45,hints:true},
 {name:'Beginner',wait:true,tolerance:250,lengthTolerance:.5,velocityTolerance:35,hints:true},
 {name:'Developing',wait:false,tolerance:180,lengthTolerance:.4,velocityTolerance:28,hints:true},
 {name:'Intermediate',wait:false,tolerance:100,lengthTolerance:.3,velocityTolerance:22,hints:true},
 {name:'Advanced',wait:false,tolerance:65,lengthTolerance:.2,velocityTolerance:16,hints:false},
 {name:'Performance',wait:false,tolerance:40,lengthTolerance:.15,velocityTolerance:12,hints:false}
];
export function phrase(notes,durations=[],options={}){let beat=0;return notes.map((n,i)=>{const duration=durations[i]??1;const notes=Array.isArray(n)?n:[n];const e={beat,notes:notes.filter(n=>n!==null),duration,velocity:options.velocity??90,hand:options.hand??'R',finger:options.fingers?.[i]};beat+=duration;return e}).filter(e=>e.notes.length)}
function accompaniment(events,roots,bar=4){const out=events.map(e=>({...e}));const end=Math.max(...events.map(e=>e.beat+e.duration));for(let b=0;b<end;b+=bar){const r=roots[Math.floor(b/bar)%roots.length];out.push({beat:b,notes:[r,r+7],duration:bar*.9,velocity:65,hand:'L'})}return out.sort((a,b)=>a.beat-b.beat)}
export function makeCatalog(){const list=[];const add=(id,name,group,level,events,tip,bpm=76)=>list.push({id,name,group,level,events,tip,bpm});
add('five','Five-finger foundation','Foundations',1,phrase([60,62,64,65,67,65,64,62,60],[],{fingers:[1,2,3,4,5,4,3,2,1]}),'Keep your wrist relaxed. Use fingers 1–5.');
add('left-five','Left-hand foundation','Foundations',1,phrase([48,50,52,53,55,53,52,50,48],[],{hand:'L',fingers:[5,4,3,2,1,2,3,4,5]}),'Use an external MIDI keyboard for the lower octave.');
add('finger-cross','Thumb-under drill','Foundations',2,phrase([60,62,64,65,67,69,71,72],[],{fingers:[1,2,3,1,2,3,4,5]}),'Pass the thumb under after finger 3.');
add('dynamics','Soft → loud control','Expression',2,Array.from({length:16},(_,i)=>({beat:i,notes:[60+(i%4)*2],duration:.8,velocity:45+Math.floor(i/4)*20,hand:'R'})),'Aim for the displayed velocity target.');
add('legato','Legato and staccato','Expression',2,Array.from({length:16},(_,i)=>({beat:i,notes:[[60,62,64,65,67,65,64,62][i%8]],duration:i<8?.95:.35,velocity:85,hand:'R'})),'First connect notes, then play short and detached.');
const roots=['C','Db','D','Eb','E','F','F#','G','Ab','A','Bb','B'];for(let r=0;r<12;r++){const root=60+r;for(const [name,steps] of [['major',[0,2,4,5,7,9,11,12]],['natural minor',[0,2,3,5,7,8,10,12]]]){const seq=[...steps,...steps.slice(0,-1).reverse()].map(n=>root+n);add(`scale-${r}-${name}`,`${roots[r]} ${name}`,'Scales',name==='major'?2:3,phrase(seq,[],{fingers:[1,2,3,1,2,3,4,5,4,3,2,1,3,2,1]}),'Listen for even volume and spacing.',84)}}
add('chromatic','Chromatic coordination','Scales',3,phrase(Array.from({length:25},(_,i)=>60+(i<=12?i:24-i)),Array(25).fill(.5)),'Alternate thumb and middle finger on black keys.',70);
for(const [name,notes]of [['C major',[60,64,67]],['A minor',[57,60,64]],['G major',[55,59,62]],['F major',[53,57,60]]]){add('triad-'+name,name+' triads','Chords',2,phrase([notes,notes,[notes[1],notes[2],notes[0]+12],[notes[2],notes[0]+12,notes[1]+12]],[2,2,2,2]),'Play every chord tone together; release together.',60);add('arp-'+name,name+' arpeggios','Arpeggios',3,phrase([...notes,notes[0]+12,...notes.slice().reverse()],Array(7).fill(.5)),'Keep each arpeggio note even.',74)}
const melody=phrase([64,64,65,67,67,65,64,62,60,60,62,64,64,62,62],[1,1,1,1,1,1,1,1,1,1,1,1,1.5,.5,2]);
add('twinkle','Twinkle, Twinkle','Songs',1,phrase([60,60,67,67,69,69,67,65,65,64,64,62,62,60],[1,1,1,1,1,1,2,1,1,1,1,1,1,2]),'Repeat the first phrase before increasing speed.');
add('ode','Ode to Joy · melody','Songs',2,melody,'Keep the repeated notes even.');
add('ode-hands','Ode to Joy · two hands','Two hands',4,accompaniment(melody,[48,55,48,55]),'Practice R and L separately, then combine.',72);
add('fur','Für Elise · opening','Songs',4,phrase([76,75,76,75,76,71,74,72,69,60,64,69,71,64,68,71,72],[.5,.5,.5,.5,.5,.5,.5,.5,1,.5,.5,.5,1,.5,.5,.5,1]),'Slow the opening semitones before joining the phrase.',64);
const minuet=phrase([74,67,69,71,72,74,67,67,76,72,74,76,77,79,67,67,72,74,72,71,69,71,72,71,69,67],[1,.5,.5,.5,.5,1,1,1,1,.5,.5,.5,.5,1,1,1,1,.5,.5,.5,.5,1,.5,.5,1,2]);add('minuet','Minuet in G · melody','Songs',4,minuet,'Feel three beats in each bar.',72);
add('minuet-hands','Minuet in G · two hands','Two hands',5,accompaniment(minuet,[43,48,50,43],3),'Follow blue left-hand notes and green right-hand notes.',66);
add('bach','Prelude in C · study','Two hands',5,[...[ [48,52,55,60,64],[48,50,57,62,65],[47,50,55,62,65],[48,52,55,60,64],[48,52,57,64,69],[48,50,54,57,62],[47,50,55,62,67],[47,48,52,55,60] ].flatMap((ch,b)=>[...ch,...ch.slice(2),...ch,...ch.slice(2)].map((n,i)=>({beat:b*4+i*.25,notes:[n],duration:.23,velocity:i%8===0?95:78,hand:n<60?'L':'R'})))],'A simplified eight-bar prelude study. Keep sixteenths even.',54);
for(let level=1;level<=5;level++){const pattern=level===1?[1,1,1,1]:level===2?[1,.5,.5,1,1]:level===3?[.5,.5,.5,.5,1,1]:level===4?[.75,.25,.5,.5,1,1]:[.25,.25,.5,.5,.5,.75,.25,1];const beats=Array.from({length:8},()=>pattern).flat();add('rhythm-'+level,'Rhythm lab '+level,'Rhythm',level,phrase(beats.map((_,i)=>[60,62,64,67][i%4]),beats),'Count the subdivisions out loud.',72)}
const progression=[[60,64,67],[57,60,64],[53,57,60],[55,59,62]];add('pop-chords','I–vi–IV–V progression','Chords',3,phrase([...progression,...progression],Array(8).fill(4)),'Change chords without stopping the beat.',76);
add('pop-hands','Pop progression · two hands','Two hands',4,accompaniment(phrase(Array.from({length:32},(_,i)=>progression[Math.floor(i/8)][i%3]),Array(32).fill(.5)),[48,45,41,43]),'Balance the bass below the right-hand part.',82);
add('blues','12-bar blues bass','Production',4,phrase(Array.from({length:12},(_,bar)=>{const root=[48,48,48,48,53,53,48,48,55,53,48,55][bar];return [root,root+4,root+7,root+9,root+10,root+9,root+7,root+4]}).flat(),Array(96).fill(.5),{hand:'L'}),'A full 12-bar bass study. Use the loop controls.',84);
add('synth-groove','Synth bass · 16-bar groove','Production',4,phrase(Array.from({length:16},(_,b)=>{const r=[36,36,41,43][Math.floor(b/4)];return [r,r+12,r+7,r,r+10,r+7,r+12,r+7]}).flat(),Array(128).fill(.5),{hand:'L'}),'Try an analog-inspired bass patch; shape the filter.',104);
return list.map(l=>{const beatsPerBar=l.id.startsWith('minuet')?3:4;return {...l,beatsPerBar,bars:Math.ceil(Math.max(...l.events.map(e=>e.beat+e.duration))/beatsPerBar)}})}
export function prepareEvents(lesson,settings){
 const beatMs=60000/settings.bpm,startBeat=(settings.loopStart-1)*(lesson.beatsPerBar||4),endBeat=settings.loopEnd*(lesson.beatsPerBar||4);
 const source=lesson.events.filter(e=>e.beat>=startBeat&&e.beat<endBeat&&(settings.hand==='Both'||settings.hand===e.hand));
 const groups=new Map();for(const e of source){const key=Math.round(e.beat*100000);if(!groups.has(key))groups.set(key,{beat:e.beat,notes:[],lengths:[],velocities:[],hands:[],fingers:[],onset:(e.beat-startBeat)*beatMs,length:e.duration*beatMs});const g=groups.get(key);for(const n of e.notes){const nn=clamp(n+settings.transpose,0,127);if(g.notes.includes(nn))continue;g.notes.push(nn);g.lengths.push(e.duration*beatMs);g.velocities.push(e.velocity??90);g.hands.push(e.hand||'R');g.fingers.push(e.finger||null)}g.length=Math.max(g.length,e.duration*beatMs)}
 return [...groups.values()].sort((a,b)=>a.onset-b.onset).map((e,i)=>({...e,id:i,status:e.notes.map(()=>0)}));
}
export class LessonSession{
 constructor(lesson,settings,now=0){
  this.settings={...settings};this.events=prepareEvents(lesson,settings);this.started=now+settings.countIn*60000/settings.bpm;this.index=0;this.correct=0;this.wrong=0;this.missed=0;this.streak=0;this.maxStreak=0;this.timing=[];this.lengths=[];this.velocities=[];this.activeNotes=new Map();this.heldNotes=new Set();this.waitAnchor=this.started;this.last='Ready';this.done=!this.events.length;this.total=this.events.reduce((n,e)=>n+e.notes.length,0);
  for(const e of this.events)e.candidates=new Map();
 }
 get target(){return this.events[this.index]}
 get beatMs(){return 60000/this.settings.bpm}
 get isWait(){return this.settings.wait}
 currentOnset(){return this.isWait?this.waitAnchor:this.started+(this.target?.onset??0)}
 advance(now){while(this.target&&this.target.status.every(v=>v===1||v===2)){this.index++;if(this.isWait)this.waitAnchor=now;}if(!this.target&&!this.activeNotes.size)this.done=true;}
 reject(note,now,reason,error=null){this.wrong++;this.streak=0;this.last=reason==='early'?'Early — wait for the line':reason==='late'?'Late — meet the line sooner':reason==='chord-spread'?'Play the chord together':reason==='extra-key'?'Release the extra key':'Try '+(this.target?.notes.map(noteName).join('+')||'next note');return {kind:'wrong',reason,error};}
 noteOn(note,velocity,now){
  if(this.done||now<this.started)return {kind:'countin'};
  if(this.heldNotes.has(note))return {kind:'held'};
  const prior=this.target;this.tick(now);this.heldNotes.add(note);
  if(this.done){if(prior?.notes.includes(note)&&!this.isWait)return this.reject(note,now,'late',now-this.started-prior.onset);return {kind:'done'};}
  const choices=this.isWait?[this.target]:this.events.filter(e=>e.status.some(v=>v===0||v===3)&&Math.abs(now-this.started-e.onset)<=this.settings.tolerance);
  let event=null,index=-1;
  for(const e of choices){const i=e?.notes.findIndex((n,k)=>n===note&&e.status[k]===0);if(i>=0){event=e;index=i;break;}}
  if(!event){const timingTarget=prior?.notes.includes(note)?prior:this.target?.notes.includes(note)?this.target:null;const error=timingTarget&&!this.isWait?now-this.started-timingTarget.onset:null;const reason=error!==null&&Math.abs(error)>this.settings.tolerance?(error<0?'early':'late'):'wrong-note';return this.reject(note,now,reason,error);}
  event.candidates.set(note,{on:now,velocity});event.status[index]=3;
  const pending=event.notes.filter(n=>!event.candidates.has(n)||!this.heldNotes.has(n));
  if(pending.length){this.last='Hold chord '+event.candidates.size+'/'+event.notes.length;return {kind:'partial',event,held:event.candidates.size,required:event.notes.length,error:null};}
  const extra=[...this.heldNotes].some(n=>!event.notes.includes(n)&&!this.activeNotes.has(n));
  const strikes=event.notes.map(n=>event.candidates.get(n));const times=strikes.map(x=>x.on);const spread=Math.max(...times)-Math.min(...times);const spreadLimit=this.settings.chordSpread??Math.min(100,this.settings.tolerance);
  if(extra||(!this.isWait&&spread>spreadLimit)){
   event.status.fill(0);event.candidates.clear();return this.reject(note,now,extra?'extra-key':'chord-spread');
  }
  const errors=this.isWait?[]:times.map(t=>t-this.started-event.onset);const error=errors.length?errors.reduce((worst,x)=>Math.abs(x)>Math.abs(worst)?x:worst,0):null;
  for(let i=0;i<event.notes.length;i++){const n=event.notes[i],strike=strikes[i];event.status[i]=1;this.activeNotes.set(n,{on:strike.on,length:event.lengths[i]});this.velocities.push(strike.velocity-event.velocities[i]);if(!this.isWait)this.timing.push(errors[i]);}
  this.correct+=event.notes.length;this.streak++;this.maxStreak=Math.max(this.maxStreak,this.streak);this.last=this.isWait?(event.notes.length>1?'Complete chord!':'Correct'):(error>=0?'+':'')+Math.round(error)+' ms';this.advance(now);
  return {kind:'correct',complete:true,units:event.notes.length,eventId:event.id,error,event,spread};
 }
 noteOff(note,now){
  this.heldNotes.delete(note);
  for(const e of this.events){if(e.candidates.has(note)){const i=e.notes.indexOf(note);if(e.status[i]===3){e.status[i]=0;e.candidates.delete(note);}}}
  const held=this.activeNotes.get(note);if(held){this.lengths.push({error:now-held.on-held.length,target:held.length});this.activeNotes.delete(note);}this.advance(now);
 }
 releaseAll(now){for(const note of [...this.heldNotes])this.noteOff(note,now);}
 tick(now){
  if(this.done||this.isWait||now<this.started)return;
  for(const e of this.events)if(now>this.started+e.onset+this.settings.tolerance){let incomplete=false;for(let i=0;i<e.status.length;i++)if(e.status[i]===0||e.status[i]===3){e.status[i]=2;this.missed++;incomplete=true;}if(incomplete){e.candidates.clear();this.streak=0;}}
  this.advance(now);if(!this.target&&now>this.started+Math.max(0,...this.events.map(e=>e.onset+e.length))+1000){this.activeNotes.clear();this.done=true;}
 }
 report(){
  const mean=a=>a.length?a.reduce((s,x)=>s+Math.abs(x),0)/a.length:null;const denominator=Math.max(1,this.total+this.wrong);const pitch=Math.round(this.correct/denominator*100);const timing=mean(this.timing),length=mean(this.lengths.map(x=>x.error)),velocity=mean(this.velocities);
  const rhythm=this.isWait?null:Math.round(this.timing.reduce((sum,error)=>sum+Math.max(0,1-Math.abs(error)/(2*this.settings.tolerance)),0)/denominator*100);
  const articulation=this.settings.assessLength&&this.lengths.length?Math.round(this.lengths.filter(x=>Math.abs(x.error)<=x.target*this.settings.lengthTolerance).length/this.lengths.length*100):null;
  const dynamics=this.settings.assessVelocity&&velocity!==null?clamp(Math.round(100*(1-velocity/(this.settings.velocityTolerance*2))),0,100):null;
  const parts=[pitch,rhythm,articulation,dynamics].filter(x=>x!==null);return {pitch,rhythm,articulation,dynamics,overall:Math.round(parts.reduce((a,b)=>a+b,0)/parts.length),timing,length,velocity,correct:this.correct,total:this.total,wrong:this.wrong,missed:this.missed,maxStreak:this.maxStreak,completeChords:this.events.filter(e=>e.notes.length>1&&e.status.every(x=>x===1)).length,totalChords:this.events.filter(e=>e.notes.length>1).length};
 }
}
// Standard MIDI files: formats 0 and 1; PPQ timing. Channel 10 percussion is excluded.
export function parseMidi(buffer,name='Imported MIDI'){const a=new Uint8Array(buffer);let p=0;const u8=()=>{if(p>=a.length)throw Error('Truncated MIDI file');return a[p++]},u16=()=>u8()*256+u8(),u32=()=>u16()*65536+u16(),str=n=>Array.from({length:n},()=>String.fromCharCode(u8())).join(''),vlen=()=>{let n=0;for(let j=0;j<4;j++){const x=u8();n=n*128+(x&127);if(!(x&128))return n}throw Error('Invalid MIDI variable length')};if(str(4)!=='MThd')throw Error('Not a Standard MIDI file');const len=u32(),format=u16(),tracks=u16(),ppq=u16();if(format>1||ppq&32768||!ppq)throw Error('Use a format 0/1 MIDI file with PPQ timing');p+=len-6;let notes=[],tempos=[],beatsPerBar=4;for(let tr=0;tr<tracks;tr++){if(str(4)!=='MTrk')throw Error('Missing MIDI track');const trackLength=u32(),trackEnd=p+trackLength;if(trackEnd>a.length)throw Error('Truncated MIDI track');let tick=0,running=0,open=new Map();while(p<trackEnd){tick+=vlen();let status=u8();if(status<128){p--;if(!running)throw Error('Invalid running status');status=running}else if(status<240)running=status;
 if(status===255){const type=u8(),n=vlen();if(type===81&&n===3){const us=a[p]*65536+a[p+1]*256+a[p+2];tempos.push({tick,bpm:60000000/us})}if(type===88&&n>=2)beatsPerBar=a[p]*4/2**a[p+1];p+=n;running=0;continue}if(status===240||status===247){const size=vlen();p+=size;running=0;continue}const cmd=status&240,ch=status&15,n=u8(),v=(cmd===192||cmd===208)?0:u8();if(ch===9)continue;const key=ch+':'+n;if(cmd===144&&v>0){if(!open.has(key))open.set(key,[]);open.get(key).push({tick,n,v})}else if(cmd===128||cmd===144&&v===0){const start=open.get(key)?.shift();if(start&&tick>start.tick)notes.push({beat:start.tick/ppq,notes:[n],duration:(tick-start.tick)/ppq,velocity:start.v,hand:n<60?'L':'R'})}}p=trackEnd;}
 if(!notes.length)throw Error('No pitched MIDI notes found');if(notes.length>15000)throw Error('Use a MIDI excerpt with fewer than 15,000 notes');notes.sort((a,b)=>a.beat-b.beat);const offset=Math.floor(notes[0].beat/beatsPerBar)*beatsPerBar;notes.forEach(n=>n.beat-=offset);return {id:'midi-'+Date.now(),name:name.replace(/\.(mid|midi)$/i,''),group:'My songs',level:4,events:notes,bpm:Math.round(tempos[0]?.bpm||100),beatsPerBar,bars:Math.ceil(Math.max(...notes.map(e=>e.beat+e.duration))/beatsPerBar),tip:tempos.length>1?'MIDI tempo changes are flattened to the chosen practice BPM.':'Imported MIDI. Choose hands, loop, and practice tempo.'};}
