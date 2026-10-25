// SPDX-License-Identifier: GPL-3.0-only
// Scheduling is independent of the DOM and synthesis engine, so real note events can be tested.
export class StepSequencer {
 constructor({getState,on,off,onStep=()=>{},onStop=()=>{},schedule=setTimeout,cancel=clearTimeout}){Object.assign(this,{getState,on,off,onStep,onStop});this.schedule=(fn,delay)=>schedule(fn,delay);this.cancel=id=>cancel(id);this.running=false;this.timers=new Set();this.held=new Map();this.serial=0;}
 later(fn,delay){let id;id=this.schedule(()=>{this.timers.delete(id);if(this.running)fn();},Math.max(0,delay));this.timers.add(id);return id;}
 start(){this.stop();const s=this.getState();if(!s.steps.slice(0,s.length).some(notes=>notes.length))throw Error('Add notes to the sequence, or load the example groove.');this.running=true;this.cycle();}
 cycle(){if(!this.running)return;const s=this.getState(),beat=60000/s.bpm,step=beat/4,duration=s.length*step;for(let i=0;i<s.length;i++){const at=(i+(i%2?s.swing/100:0))*step,notes=[...new Set(s.steps[i])];this.later(()=>{this.onStep(i);for(const n of notes){if(this.held.has(n)){this.off(n,this.held.get(n));this.held.delete(n);}const token='seq-'+(++this.serial);this.held.set(n,token);this.on(n,s.velocity,token);this.later(()=>{if(this.held.get(n)===token){this.off(n,token);this.held.delete(n);}},step*s.gate/100);}},at);}this.later(()=>{if(this.getState().loop===false)this.stop();else this.cycle();},duration);}
 stop(){this.running=false;for(const id of this.timers)this.cancel(id);this.timers.clear();for(const [n,token]of this.held)this.off(n,token);this.held.clear();this.onStop();}
}
