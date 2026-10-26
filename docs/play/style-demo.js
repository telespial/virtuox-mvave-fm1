// SPDX-License-Identifier: GPL-3.0-only
// Beat-based audition clock: tempo changes preserve position and held notes.
export class StyleDemo{
 constructor({schedule,cancel,on,off,onState=()=>{},onComplete=()=>{},now=()=>performance.now()}){Object.assign(this,{schedule,cancel,on,off,onState,onComplete,now});this.running=false;this.generation=0;this.scheduleRevision=0;this.timers=[];this.held=new Map();this.duration=0;this.bpm=80;this.queue=[];}
 clearTimers(){this.scheduleRevision++;for(const timer of this.timers)this.cancel(timer);this.timers=[];}
 stop(){const was=this.running;this.generation++;this.clearTimers();for(const [token,note]of this.held)this.off(note,token);this.held.clear();this.queue=[];this.running=false;if(was)this.onState(false);}
 position(){return this.running?Math.min(this.totalBeats,this.anchorBeat+(this.now()-this.anchorTime)*this.bpm/60000):0;}
 get progress(){return this.totalBeats?this.position()/this.totalBeats:0;}
 setTempo(value){const bpm=Math.max(30,Math.min(200,Number(value)||80));if(bpm===this.bpm)return;const beat=this.position();this.bpm=bpm;if(!this.running)return;this.anchorBeat=beat;this.anchorTime=this.now();this.duration=this.totalBeats*60000/bpm;this.schedulePending();}
 schedulePending(){this.clearTimers();const revision=this.scheduleRevision,generation=this.generation,beat=this.position(),beatMs=60000/this.bpm;for(const event of this.queue){if(event.done)continue;this.timers.push(this.schedule(()=>{if(!this.running||generation!==this.generation||revision!==this.scheduleRevision||event.done)return;event.done=true;event.fn();},Math.max(0,(event.beat-beat)*beatMs)));}}
 start(lesson,{bpm=lesson.bpm||80,repeat=2,maxBars=4}={}){
  this.stop();this.setTempo(bpm);const limit=(lesson.beatsPerBar||4)*maxBars,events=lesson.events.filter(e=>e.beat>=0&&e.beat<limit&&e.notes.length),end=Math.min(limit,Math.max(0,...events.map(e=>e.beat+e.duration)));if(!end)throw Error('This style has no playable demo notes.');
  this.totalBeats=end*repeat;this.duration=this.totalBeats*60000/this.bpm;this.anchorBeat=0;this.anchorTime=this.now();this.running=true;const generation=this.generation;
  for(let pass=0;pass<repeat;pass++)for(const [i,e]of events.entries())for(const [j,n]of e.notes.entries()){
   const token='style-demo-'+generation+'-'+pass+'-'+i+'-'+j,at=pass*end+e.beat;
   this.queue.push({beat:at,fn:()=>{this.held.set(token,n);this.on(n,e.velocity||90,token)}});
   this.queue.push({beat:at+Math.min(e.duration,end-e.beat),fn:()=>{this.off(n,token);this.held.delete(token)}});
  }
  this.queue.push({beat:this.totalBeats,fn:()=>{this.stop();this.onComplete();}});this.schedulePending();this.onState(true);return this.duration;
 }
}
export const STYLE_DEMOS={'M Dean inspired':'style-dean-outro','Jarre inspired':'style-jarre-arp','Moog fundamentals':'style-moog-legato','Drayk':'style-draik-progression','Dr Dray':'style-dok-outro','Bach':'library-mutopia-5','Classical':'style-classical-pad'};
